import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { and, eq, asc } from "drizzle-orm";
import { getDb } from "@/db";
import {
  attempts,
  evaluations,
  contentVersions,
  drafts,
  exposures,
  reviews,
  lessonProgress,
  placement,
  errorPatterns,
  learningSessions,
  examAttempts,
  media,
  importRecords,
  jobs,
} from "@/db/schema";
import { AppError, profileFor, refreshPlacement } from "@/learning/service";
import { lessonSchema } from "@/content/types";
import { vocabulary } from "@/content/catalog";
import { grade } from "@/assessment/grade";
import { latestEvaluations } from "@/learning/evidence";
import { localDate, scheduleReview } from "@/learning/policies";
import {
  bundleSchema,
  draftArchiveSchema,
  exposureArchiveSchema,
  examArchiveSchema,
  type ExportBundle,
} from "./contracts";
import { mockSchema } from "@/exams/types";
import { objectiveResult } from "@/exams/service";
import { adaptLegacy } from "./legacy";
function signature(bundle: Omit<ExportBundle, "signature">) {
  const key = process.env.BETTER_AUTH_SECRET;
  if (!key) throw new AppError(503, "Export signing is not configured.");
  return createHmac("sha256", key).update(JSON.stringify(bundle)).digest("hex");
}
function trusted(bundle: ExportBundle) {
  if (!bundle.signature) return false;
  const { signature: given, ...data } = bundle;
  return timingSafeEqual(
    Buffer.from(given, "hex"),
    Buffer.from(signature(data), "hex"),
  );
}
export async function exportData(userId: string) {
  const db = getDb();
  const [
    profile,
    a,
    e,
    content,
    draft,
    exposure,
    review,
    progress,
    routes,
    errors,
    sessions,
    exams,
    assets,
    imports,
    feedback,
  ] = await Promise.all([
    profileFor(userId),
    db
      .select()
      .from(attempts)
      .where(eq(attempts.userId, userId))
      .orderBy(asc(attempts.createdAt)),
    db
      .select()
      .from(evaluations)
      .where(eq(evaluations.userId, userId))
      .orderBy(asc(evaluations.createdAt)),
    db
      .select({
        id: contentVersions.id,
        version: contentVersions.version,
        hash: contentVersions.hash,
      })
      .from(contentVersions),
    db.select().from(drafts).where(eq(drafts.userId, userId)),
    db.select().from(exposures).where(eq(exposures.userId, userId)),
    db.select().from(reviews).where(eq(reviews.userId, userId)),
    db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)),
    db.select().from(placement).where(eq(placement.userId, userId)),
    db.select().from(errorPatterns).where(eq(errorPatterns.userId, userId)),
    db
      .select()
      .from(learningSessions)
      .where(eq(learningSessions.userId, userId)),
    db.select().from(examAttempts).where(eq(examAttempts.userId, userId)),
    db.select().from(media).where(eq(media.userId, userId)),
    db.select().from(importRecords).where(eq(importRecords.userId, userId)),
    db.select().from(jobs).where(eq(jobs.userId, userId)),
  ]);
  const bundle = bundleSchema.parse(
    JSON.parse(
      JSON.stringify({
        schemaVersion: "german-learning-export-v1",
        exportedAt: new Date().toISOString(),
        ownerId: userId,
        profile: profile.data,
        policies: {
          mastery: "mastery-v1",
          review: "review-v1",
          planner: "planner-v2",
        },
        content,
        attempts: a,
        evaluations: e,
        archives: {
          drafts: draft,
          exposures: exposure,
          reviews: review,
          progress,
          placement: routes,
          errors,
          sessions,
          exams,
          media: assets,
          imports,
          feedback,
          mediaNotice:
            "This JSON contains recording metadata, not audio bytes. Back up the private object store alongside the database; expired or deleted recordings cannot be recreated.",
        },
      }),
    ),
  );
  return { ...bundle, signature: signature(bundle) };
}
export async function previewImport(userId: string, input: unknown) {
  const native =
    !!input && typeof input === "object" && "schemaVersion" in input;
  const hash = createHash("sha256").update(JSON.stringify(input)).digest("hex");
  if (!native) {
    const adapted = adaptLegacy(input);
    return {
      hash,
      kind: "legacy" as const,
      valid: adapted.issues.length === 0,
      attempts: 0,
      newAttempts: 0,
      duplicates: 0,
      conflicts: adapted.issues,
      warnings: adapted.warnings,
      adapted,
    };
  }
  const bundle = bundleSchema.parse(input),
    isTrusted = trusted(bundle);
  const existing = await getDb()
    .select()
    .from(attempts)
    .where(eq(attempts.userId, userId));
  const contents = await getDb().select().from(contentVersions);
  const conflicts: string[] = [],
    ids = new Set<string>();
  let duplicates = 0;
  for (const attempt of bundle.attempts) {
    if (ids.has(attempt.id)) {
      conflicts.push("Duplicate attempt ID " + attempt.id);
      continue;
    }
    ids.add(attempt.id);
    const published = contents.find(
      (c) =>
        c.id === attempt.lessonId &&
        c.version === attempt.contentVersion &&
        c.type === "lesson",
    );
    const ref = bundle.content.find(
      (c) => c.id === attempt.lessonId && c.version === attempt.contentVersion,
    );
    if (!published || !ref || published.hash !== ref.hash) {
      conflicts.push(
        "Missing or changed content: " +
          attempt.lessonId +
          " v" +
          attempt.contentVersion,
      );
      continue;
    }
    const task = lessonSchema
      .parse(published.payload)
      .exercises.find((t) => t.id === attempt.exerciseId);
    if (!task) {
      conflicts.push("Unknown exercise " + attempt.exerciseId);
      continue;
    }
    const duplicate = existing.find(
      (a) =>
        a.id === attempt.id ||
        a.id === mappedId(userId, bundle.ownerId, attempt.id) ||
        a.idempotencyKey === attempt.idempotencyKey,
    );
    if (duplicate) {
      duplicates++;
      if (
        duplicate.response !== attempt.response ||
        duplicate.exerciseId !== attempt.exerciseId
      )
        conflicts.push("Conflicting saved response " + attempt.id);
    }
  }
  for (const evaluation of bundle.evaluations)
    if (!ids.has(evaluation.attemptId))
      conflicts.push("Evaluation has no matching attempt: " + evaluation.id);
  return {
    hash,
    kind: "native" as const,
    valid: conflicts.length === 0,
    attempts: bundle.attempts.length,
    newAttempts: bundle.attempts.length - duplicates,
    duplicates,
    conflicts,
    warnings: [
      ...(isTrusted
        ? []
        : [
            "The signing key could not verify this package. Objective answers will be regraded; AI ratings remain reported history.",
          ]),
      "Merge preserves your existing profile and newer drafts. Exam imports remain historical practice, never new readiness evidence.",
      "Recording bytes require a separate private-store backup.",
    ],
    bundle,
    isTrusted,
  };
}
function mappedId(owner: string, sourceOwner: string, id: string) {
  const h = createHash("sha256")
    .update(owner + ":" + sourceOwner + ":" + id)
    .digest("hex");
  return (
    h.slice(0, 8) +
    "-" +
    h.slice(8, 12) +
    "-5" +
    h.slice(13, 16) +
    "-a" +
    h.slice(17, 20) +
    "-" +
    h.slice(20, 32)
  );
}
export async function importData(
  userId: string,
  input: unknown,
  expectedHash: string,
) {
  const preview = await previewImport(userId, input);
  if (preview.hash !== expectedHash)
    throw new AppError(
      409,
      "The file changed after preview. Preview it again.",
    );
  if (!preview.valid)
    throw new AppError(409, "Resolve the preview conflicts before importing.");
  const db = getDb(),
    known = (
      await db
        .select()
        .from(importRecords)
        .where(
          and(
            eq(importRecords.userId, userId),
            eq(importRecords.hash, preview.hash),
          ),
        )
    )[0];
  if (known) return { imported: false, duplicate: true, report: known.report };
  const profile = (await profileFor(userId)).data,
    today = localDate(new Date(), profile.timezone);
  const contents = await db.select().from(contentVersions);
  await db.transaction(async (tx) => {
    // Claim the package inside the transaction so concurrent imports cannot duplicate it.
    const inserted = await tx
      .insert(importRecords)
      .values({
        id: mappedId(userId, "package", preview.hash),
        userId,
        hash: preview.hash,
        schemaVersion:
          preview.kind === "native"
            ? "german-learning-export-v1"
            : "learning_record-v1",
        report: {
          newAttempts: preview.newAttempts,
          duplicates: preview.duplicates,
          warnings: preview.warnings,
        },
        legacyData:
          preview.kind === "legacy" ? preview.adapted : preview.bundle.archives,
      })
      .onConflictDoNothing()
      .returning();
    if (!inserted.length) return;
    if (preview.kind === "legacy") return;
    const bundle = preview.bundle;
    const current = await tx
      .select()
      .from(attempts)
      .where(eq(attempts.userId, userId));
    for (const a of bundle.attempts) {
      if (
        current.some(
          (c) =>
            c.id === a.id ||
            c.id === mappedId(userId, bundle.ownerId, a.id) ||
            c.idempotencyKey === a.idempotencyKey,
        )
      )
        continue;
      const lesson = lessonSchema.parse(
          contents.find(
            (c) => c.id === a.lessonId && c.version === a.contentVersion,
          )!.payload,
        ),
        task = lesson.exercises.find((t) => t.id === a.exerciseId)!;
      const id = mappedId(userId, bundle.ownerId, a.id),
        originalEvaluations = bundle.evaluations.filter(
          (e) => e.attemptId === a.id,
        );
      const requiresAudio = task.type === "speaking" || !!task.mediaId;
      const data = task.accepted?.length ? grade(task, a.response) : null;
      const original = originalEvaluations
        .filter(
          (e) =>
            !originalEvaluations.some((next) => next.supersedesId === e.id),
        )
        .sort((x, y) => y.createdAt.localeCompare(x.createdAt))[0];
      // A valid signature authenticates prior app evidence; imported JSON never asserts new sound evidence.
      const derived = data || {
        correct: null,
        score: null,
        explanation:
          "Imported productive response retained. Its prior AI feedback is archived; reassessment is required.",
      };
      await tx
        .insert(attempts)
        .values({
          ...a,
          id,
          userId,
          skill: task.skill,
          family: task.family,
          modality:
            task.type === "speaking"
              ? "speaking"
              : task.type === "choice"
                ? "recognition"
                : task.type === "listening"
                  ? "listening"
                  : "production",
          assisted: !preview.isTrusted || a.assisted || requiresAudio,
          transfer:
            preview.isTrusted && a.transfer && task.transfer && !requiresAudio,
          idempotencyKey: mappedId(userId, bundle.ownerId, a.idempotencyKey),
          createdAt: new Date(a.createdAt),
        })
        .onConflictDoNothing();
      await tx.insert(evaluations).values({
        id: mappedId(userId, "evaluation", a.id),
        attemptId: id,
        userId,
        status: derived.correct === null ? "inconclusive" : "completed",
        source: data ? "import_regraded" : "import_reported",
        data: derived,
        rubricVersion: "course-v1",
        createdAt: new Date(a.createdAt),
      });
      // Preserve all original evaluations, including supersession links, in the import archive.
      if (
        original &&
        preview.isTrusted &&
        !requiresAudio &&
        original.source === "ai_coaching" &&
        original.status === "completed"
      ) {
        await tx.insert(evaluations).values({
          ...original,
          id: mappedId(userId, "verified-evaluation", original.id),
          attemptId: id,
          userId,
          supersedesId: mappedId(userId, "evaluation", a.id),
          createdAt: new Date(new Date(a.createdAt).getTime() + 1),
        });
      }
    }
    for (const raw of Array.isArray(bundle.archives.drafts)
      ? bundle.archives.drafts
      : []) {
      const parsed = draftArchiveSchema.safeParse(raw);
      if (!parsed.success) continue;
      const d = parsed.data;
      const content = contents
        .filter((c) => c.id === d.contextId && c.type === "lesson")
        .sort((a, b) => b.version - a.version)[0];
      if (
        !content ||
        !lessonSchema
          .parse(content.payload)
          .exercises.some((e) => e.id === d.data.exerciseId)
      )
        continue;
      await tx
        .insert(drafts)
        .values({
          ...d,
          id: mappedId(userId, "draft", d.id),
          userId,
          data: {
            ...d.data,
            attemptKey: mappedId(userId, bundle.ownerId, d.data.attemptKey),
          },
          assisted: true,
          updatedAt: new Date(d.updatedAt),
        })
        .onConflictDoNothing();
    }
    for (const raw of Array.isArray(bundle.archives.exposures)
      ? bundle.archives.exposures
      : []) {
      const parsed = exposureArchiveSchema.safeParse(raw);
      if (!parsed.success) continue;
      const e = parsed.data;
      if (
        !contents.some(
          (c) =>
            c.type === "lesson" &&
            c.version === e.contentVersion &&
            lessonSchema
              .parse(c.payload)
              .exercises.some((t) => t.id === e.exerciseId),
        )
      )
        continue;
      await tx
        .insert(exposures)
        .values({
          ...e,
          id: mappedId(userId, "exposure", e.id),
          userId,
          attemptKey: mappedId(userId, bundle.ownerId, e.attemptKey),
          createdAt: new Date(e.createdAt),
        })
        .onConflictDoNothing();
    }
    for (const raw of Array.isArray(bundle.archives.exams)
      ? bundle.archives.exams
      : []) {
      const parsed = examArchiveSchema.safeParse(raw);
      if (!parsed.success) continue;
      const e = parsed.data;
      const content = contents.find(
        (c) =>
          c.id === e.mockId &&
          c.type === "mock" &&
          e.definitionVersion.endsWith("/mock-" + c.version),
      );
      const ref = bundle.content.find(
        (c) => c.id === e.mockId && c.version === content?.version,
      );
      if (!content || ref?.hash !== content.hash) continue;
      const mock = mockSchema.parse(content.payload),
        answers = Object.fromEntries(
          Object.entries(e.answers).filter(([id]) =>
            mock.tasks.some((t) => t.id === id),
          ),
        );
      await tx
        .insert(examAttempts)
        .values({
          ...e,
          id: mappedId(userId, bundle.ownerId, e.id),
          userId,
          state: "submitted",
          answers,
          flags: [
            ...new Set([...e.flags, "imported-history", "previously-exposed"]),
          ],
          results: objectiveResult(
            mock,
            answers,
            e.mode === "practice" ? e.block : undefined,
          ),
          startedAt: new Date(e.startedAt),
          deadline: new Date(e.deadline),
          updatedAt: new Date(e.updatedAt),
        })
        .onConflictDoNothing();
    }
    await tx
      .update(importRecords)
      .set({
        legacyData: {
          ...bundle.archives,
          originalEvaluations: bundle.evaluations,
          originalProfile: bundle.profile,
          provenance: {
            ownerId: bundle.ownerId,
            exportedAt: bundle.exportedAt,
            signatureVerified: preview.isTrusted,
          },
        },
      })
      .where(eq(importRecords.id, mappedId(userId, "package", preview.hash)));
    const rows = latestEvaluations(
      await tx
        .select({ attempt: attempts, evaluation: evaluations })
        .from(attempts)
        .innerJoin(evaluations, eq(evaluations.attemptId, attempts.id))
        .where(eq(attempts.userId, userId)),
    );
    const grouped = new Map<string, typeof rows>();
    for (const row of rows) {
      const key = row.attempt.lessonId;
      grouped.set(key, [...(grouped.get(key) || []), row]);
    }
    for (const [lessonId, history] of grouped) {
      const version = Math.max(...history.map((h) => h.attempt.contentVersion)),
        content = contents.find(
          (c) =>
            c.id === lessonId && c.version === version && c.type === "lesson",
        );
      if (!content) continue;
      const lesson = lessonSchema.parse(content.payload),
        relevant = history.filter((h) => h.attempt.contentVersion === version),
        answered = new Set(relevant.map((h) => h.attempt.exerciseId));
      const complete =
        lesson.exercises.every((e) => answered.has(e.id)) &&
        lesson.exercises
          .filter((e) => e.exit)
          .every((e) =>
            relevant.some(
              (h) =>
                h.attempt.exerciseId === e.id &&
                h.evaluation.data.correct === true,
            ),
          );
      await tx
        .insert(lessonProgress)
        .values({
          userId,
          lessonId,
          version,
          state: complete ? "completed" : "in_progress",
          position: answered.size,
        })
        .onConflictDoUpdate({
          target: [lessonProgress.userId, lessonProgress.lessonId],
          set: {
            version,
            state: complete ? "completed" : "in_progress",
            position: answered.size,
          },
        });
    }
    // Rebuild the affected review targets from evidence, never from imported summary scores.
    const targets = new Map<string, ReturnType<typeof scheduleReview>>();
    for (const { attempt: a, evaluation: e } of rows)
      if (e.data.correct !== null) {
        const mode =
            a.modality === "recognition" ? "recognition" : "production",
          key = a.skill + "|" + mode;
        targets.set(
          key,
          scheduleReview(
            targets.get(key),
            { correct: e.data.correct, assisted: a.assisted },
            a.localDate,
          ),
        );
        if (!e.data.correct) {
          const content = contents.find(
              (c) => c.id === a.lessonId && c.version === a.contentVersion,
            ),
            task = content
              ? lessonSchema
                  .parse(content.payload)
                  .exercises.find((t) => t.id === a.exerciseId)
              : null;
          if (task)
            await tx
              .insert(errorPatterns)
              .values({
                id: mappedId(
                  userId,
                  "error",
                  a.skill + ":" + (task.errorTag || "TASK"),
                ),
                userId,
                skill: a.skill,
                tag: task.errorTag || "TASK",
                rootCause: "import_needs_probe",
                original: a.response,
                correction: e.data.correction || "",
                explanation: e.data.explanation,
                exerciseId: a.exerciseId,
                lessonId: a.lessonId,
                attemptId: a.id,
                count: 1,
              })
              .onConflictDoNothing();
        }
      }
    for (const [key, state] of targets) {
      const [skill, mode] = key.split("|");
      await tx
        .insert(reviews)
        .values({
          id: mappedId(userId, "review", key),
          userId,
          targetId: skill,
          mode,
          ...state,
          dueDate: state.dueDate < today ? today : state.dueDate,
          timezone: profile.timezone,
        })
        .onConflictDoUpdate({
          target: [reviews.userId, reviews.targetId, reviews.mode],
          set: {
            ...state,
            dueDate: state.dueDate < today ? today : state.dueDate,
            timezone: profile.timezone,
          },
        });
    }
  });
  if (preview.kind === "native") await refreshPlacement(userId);
  return {
    imported: true,
    duplicate: false,
    report: {
      newAttempts: preview.newAttempts,
      duplicates: preview.duplicates,
      warnings: preview.warnings,
    },
  };
}
export function csvCell(value: unknown) {
  return '"' + String(value ?? "").replaceAll('"', '""') + '"';
}
export function vocabularyCsv() {
  return [
    [
      "id",
      "front",
      "meaning",
      "plural_or_forms",
      "example",
      "translation",
      "tags",
    ],
    ...vocabulary.map((w) => [
      w.id,
      [w.article, w.word].filter(Boolean).join(" "),
      w.meaning,
      w.plural || w.forms || "",
      w.example,
      w.translation,
      "german beruf " + w.type,
    ]),
  ]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
}
export async function reviewCsv(userId: string) {
  const rows = await getDb()
    .select()
    .from(reviews)
    .where(eq(reviews.userId, userId));
  return [
    ["id", "target", "mode", "due_date", "step"],
    ...rows.map((r) => [r.id, r.targetId, r.mode, r.dueDate, r.step]),
  ]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
}
export async function progressSummary(userId: string) {
  const b = await exportData(userId);
  return [
    "German Learn Assistant — progress archive",
    "Exported: " + b.exportedAt,
    "Learner: " + b.profile.name,
    "Attempts: " + b.attempts.length,
    "Evaluations: " + b.evaluations.length,
    "Course completion, independent mastery and exam readiness are separate measures.",
    "This file is a readable summary. The JSON package contains the evidence and provenance.",
    "Recordings need their separate private-store backup.",
  ].join("\n");
}
