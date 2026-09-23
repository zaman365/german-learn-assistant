import { createHash } from "node:crypto";
import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { examAttempts, jobs, media, usageLimits } from "@/db/schema";
import { AppError, profileFor } from "@/learning/service";
import {
  capabilities,
  tutor,
  synthesize,
  transcribe,
  evaluateText,
  analyzeSound,
} from "@/ai/provider";
import { assessRubric } from "@/ai/contracts";
import { getJob } from "@/ai/service";
import { enqueue } from "@/jobs/queue";
import { ownedMedia, mediaUrl } from "@/audio/service";
import { readAsset, putAsset } from "@/audio/storage";
import { inspectWav } from "@/audio/wav";
import { pcm16, wavFromPcm } from "@/audio/pcm";
import { localDate } from "@/learning/policies";
import { publishedMock, mockVersionOf, objectiveResult } from "./service";
import {
  writingHalfPoints,
  speakingHalfPoints,
  type Band,
  type LanguageBand,
} from "./definition";
export type ExamAiInput = {
  examId: string;
  taskId?: string;
  recordingId?: string;
  initial?: boolean;
};
export async function requestExamJob(
  userId: string,
  operation: "exam_partner" | "exam_evaluate",
  input: ExamAiInput,
) {
  const db = getDb(),
    run = (
      await db
        .select()
        .from(examAttempts)
        .where(
          and(
            eq(examAttempts.id, input.examId),
            eq(examAttempts.userId, userId),
          ),
        )
    )[0];
  if (!run) throw new AppError(404, "Exam attempt not found.");
  if (!capabilities().text)
    throw new AppError(
      503,
      "Configure the text model to use AI exam coaching.",
    );
  if (operation === "exam_partner") {
    if (!capabilities().speech || !capabilities().transcription)
      throw new AppError(
        503,
        "The spoken partner requires configured speech and transcription models.",
      );
    const mock = await publishedMock(run.mockId, mockVersionOf(run)),
      task = mock.tasks.find(
        (t) =>
          t.id === input.taskId &&
          t.kind === "speaking" &&
          t.block === run.block,
      );
    if (!task || run.state !== "active" || new Date() >= run.deadline)
      throw new AppError(409, "Open a current speaking task.");
    if (input.recordingId) {
      const asset = await ownedMedia(userId, input.recordingId),
        metadata = asset.metadata as { examId?: string; taskId?: string };
      if (metadata.examId !== run.id || metadata.taskId !== task.id)
        throw new AppError(404, "Recording not found in this task.");
    } else if (!input.initial)
      throw new AppError(
        400,
        "Record a turn before asking the partner to reply.",
      );
  } else if (run.state !== "submitted")
    throw new AppError(
      409,
      "Submit the exam work before requesting assessment.",
    );
  const id = createHash("sha256")
    .update(
      userId +
        ":" +
        operation +
        ":" +
        run.id +
        ":" +
        (input.taskId || "all") +
        ":" +
        (input.recordingId || "initial"),
    )
    .digest("hex");
  const profile = (await profileFor(userId)).data,
    quota = "ai:" + userId + ":" + localDate(new Date(), profile.timezone),
    cost = operation === "exam_partner" ? 3 : 2;
  const inserted = await db.transaction(async (tx) => {
    if ((await tx.select().from(jobs).where(eq(jobs.id, id))).length)
      return false;
    const usage = (
      await tx
        .insert(usageLimits)
        .values({
          key: quota,
          count: cost,
          expiresAt: new Date(Date.now() + 172800000),
        })
        .onConflictDoUpdate({
          target: usageLimits.key,
          set: { count: sql.raw('"usage_limits"."count" + ' + cost) },
        })
        .returning()
    )[0];
    if (
      usage.count >
      Math.max(
        1,
        Math.min(200, Number(process.env.AI_DAILY_REQUEST_LIMIT) || 40),
      )
    )
      throw new AppError(
        429,
        "Today's AI allowance is used. Your recorded work is retained.",
      );
    await tx
      .insert(jobs)
      .values({ id, userId, operation, status: "queued", input });
    return true;
  });
  if (inserted) {
    if (capabilities().worker) await enqueue(id);
    else if (process.env.NODE_ENV !== "production") {
      const { processJob } = await import("@/ai/service");
      await processJob(id);
    }
  }
  return getJob(userId, id);
}
export async function processExamPartner(job: typeof jobs.$inferSelect) {
  const input = job.input as ExamAiInput,
    db = getDb(),
    run = (
      await db
        .select()
        .from(examAttempts)
        .where(
          and(
            eq(examAttempts.id, input.examId),
            eq(examAttempts.userId, job.userId),
          ),
        )
    )[0];
  if (!run) throw new Error("Missing exam attempt.");
  if (run.state !== "active" || run.block !== 3 || new Date() >= run.deadline)
    throw new Error(
      "The spoken section closed before this partner request could run.",
    );
  const mock = await publishedMock(run.mockId, mockVersionOf(run)),
    task = mock.tasks.find((t) => t.id === input.taskId)!;
  const previous = await db
    .select()
    .from(jobs)
    .where(
      and(
        eq(jobs.userId, job.userId),
        eq(jobs.operation, "exam_partner"),
        eq(jobs.status, "completed"),
      ),
    );
  const history = previous
    .filter((j) => (j.input as ExamAiInput).examId === run.id)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(-8);
  const transcript = input.recordingId
    ? await transcribe(
        await readAsset((await ownedMedia(job.userId, input.recordingId)).key),
        job.id + "-transcript",
      )
    : "";
  await db
    .update(jobs)
    .set({
      output: { transcript, transcriptEdited: false },
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, job.id));
  const result = await tutor(
    {
      mode: "roleplay",
      language: "de",
      lesson: {
        task: task.prompt,
        phase: task.section,
        instruction:
          "Act as the examiner in 1A/1B and as the other candidate in 1C/2/3. In 1C provide a short original workplace position for the learner to explain. In 2 and 3 genuinely respond to the last argument, introduce a relevant tradeoff and ask one question. Keep your spoken turn below 70 words. Do not give hints, corrections, marks or model answers during this practice.",
      },
      question:
        transcript ||
        "Beginne diese Prüfungsphase mit einem kurzen passenden Gesprächsimpuls.",
      history: history.flatMap((j) => {
        const out = j.output as { transcript?: string; answer?: string };
        return [
          { role: "user" as const, text: out.transcript || "" },
          { role: "assistant" as const, text: out.answer || "" },
        ];
      }),
    },
    job.id + "-reply",
  );
  const text = [result.value.answer, result.value.followUp]
      .filter(Boolean)
      .join("\n"),
    bytes = await synthesize(text.slice(0, 5000), "alloy", job.id + "-speech"),
    properties = inspectWav(bytes);
  const id = createHash("sha256")
      .update(job.userId + ":" + job.id + ":partner")
      .digest("hex"),
    key = "recordings/" + job.userId + "/" + id + ".wav";
  await putAsset(key, bytes, "audio/wav");
  await db
    .insert(media)
    .values({
      id,
      userId: job.userId,
      key,
      mime: "audio/wav",
      bytes: bytes.length,
      checksum: createHash("sha256").update(bytes).digest("hex"),
      kind: "learner_recording",
      state: "ready",
      metadata: {
        ...properties,
        examId: run.id,
        taskId: task.id,
        role: "ai_partner",
        synthetic: true,
      },
    })
    .onConflictDoNothing();
  await db
    .update(jobs)
    .set({
      status: "completed",
      model: result.model,
      output: {
        ...result.value,
        transcript,
        transcriptEdited: false,
        audioId: id,
        audioUrl: await mediaUrl(job.userId, id),
        notice:
          "Synthetic AI partner voice. Automatic transcript may contain recognition errors.",
      },
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, job.id));
}
const writingCriteria = [
  "Customer email: A/3 fully appropriate fulfilment; B/2 largely appropriate with minor omissions; C/1 only partly achieved; D/0 not achieved.",
  "Management statement: A/3 well-developed position, balanced reasons and workable proposal; B/2 largely achieved; C/1 partial; D/0 not achieved.",
  "Organization across BOTH extended texts, rated ONCE: 3 strong C1 coherent and well-controlled; 2 sound C1 with minor weaknesses; 1 B2, limited development; 0 below B2.",
  "Grammatical and orthographic accuracy across BOTH extended texts, rated ONCE: 3 strong C1; 2 sound C1 despite occasional errors; 1 B2; 0 below B2.",
  "Linguistic range and appropriate register across BOTH extended texts, rated ONCE: 3 strong C1; 2 sound C1; 1 B2; 0 below B2.",
  "Phone note: caller name matches the key (3) or not (0).",
  "Phone note: contact details match the key (3) or not (0).",
  "Phone note: first complete information aspect matches the key (3) or not (0).",
  "Phone note: second complete information aspect matches the key (3) or not (0).",
  "Phone note: third complete information aspect matches the key (3) or not (0).",
  "Phone note: fourth complete information aspect matches the key (3) or not (0).",
  "Phone note: requested action and its time limit match the key (3) or not (0).",
];
const speakingCriteria = [
  "Task 1A: clear relevant developed presentation. 3=A fully achieved, 2=B largely achieved, 1=C partly achieved, 0=D not achieved.",
  "Task 1B: responsive and developed answers to actual follow-up questions. Same A/B/C/D scale.",
  "Task 1C: accurate explanation of the partner's actual position. Same A/B/C/D scale.",
  "Task 2: spontaneous reciprocal informal conversation. Same A/B/C/D scale.",
  "Task 3: collaborative problem-solving, responding to objections and agreeing feasible steps. Same A/B/C/D scale.",
  "Pronunciation and intonation over the entire performance: 3 upper C1, 2 middle C1 intelligible controlled prosody, 1 B2, 0 below B2. Judge the audio, not its transcript.",
  "Grammatical accuracy over the entire performance: 3 upper C1, 2 middle C1, 1 B2, 0 below B2.",
  "Linguistic range over the entire performance: 3 upper C1 flexible and precise, 2 middle C1, 1 B2, 0 below B2.",
];
const band = (n: number): Band => (["D", "C", "B", "A"] as const)[n];
const language = (n: number): LanguageBand =>
  (["below_b2", "b2", "middle_c1", "upper_c1"] as const)[n];
export async function processExamEvaluation(job: typeof jobs.$inferSelect) {
  const db = getDb(),
    input = job.input as ExamAiInput,
    run = (
      await db
        .select()
        .from(examAttempts)
        .where(
          and(
            eq(examAttempts.id, input.examId),
            eq(examAttempts.userId, job.userId),
          ),
        )
    )[0];
  if (!run || run.state !== "submitted")
    throw new Error("Submit the exam before assessment.");
  const mock = await publishedMock(run.mockId, mockVersionOf(run)),
    written = mock.tasks.filter((t) => t.kind === "writing"),
    full = run.mode !== "practice";
  const results = {
    ...objectiveResult(mock, run.answers, full ? undefined : run.block),
    writing: null as number | null,
    speaking: null as number | null,
    total: null as number | null,
  };
  const feedback: Record<string, unknown> = {
    limitations: [
      "AI coaching estimates from an original unofficial mock. These bands are not an official rating or a calibrated C1 certificate.",
    ],
  };
  const selected = written.filter((t) => !!run.answers[t.id]);
  if (selected.length) {
    const complete = selected.length === 3,
      criteria = complete
        ? writingCriteria
        : [
            "Communicative fulfilment of each supplied task",
            "Coherence and organization of the submitted texts",
            "Grammatical accuracy",
            "Range and appropriate register",
          ];
    const response = selected
      .map((t) => t.title + "\n" + run.answers[t.id])
      .join("\n\n");
    const task = {
      id: run.id,
      type: "writing" as const,
      prompt:
        "Evaluate the submitted DTB C1 original practice texts against the supplied coaching rubric.",
      stimulus: JSON.stringify(
        selected.map((t) => ({
          prompt: t.prompt,
          source: t.stimulus,
          noteKey:
            t.section === "Hören und Schreiben" ? t.rationale : undefined,
        })),
      ),
      rubric: criteria,
      explanation: "Original exam writing coaching",
      hint: "Follow the task requirements.",
      skill: "writing",
      family: "exam-writing",
      normalize: { caseSensitive: true, punctuation: true },
      transfer: false,
      exit: false,
    };
    const result = await evaluateText(
        task,
        response,
        "en",
        job.id + "-writing",
      ),
      assessment = assessRubric(result.value, criteria, response);
    feedback.writing = { ...result.value, assessment };
    if (complete && assessment.correct !== null) {
      const r = criteria.map(
        (_, i) => result.value.criteria.find((c) => c.index === i)!.rating,
      );
      if (r.slice(5).every((n) => n === 0 || n === 3)) {
        results.writing =
          writingHalfPoints(
            {
              email: band(r[0]),
              statement: band(r[1]),
              organization: language(r[2]),
              accuracy: language(r[3]),
              range: language(r[4]),
              note: {
                names: r[5] === 3,
                contact: r[6] === 3,
                information: r.slice(7, 11).every((n) => n === 3),
                action: r[11] === 3,
              },
            },
            mock.tasks.filter(
              (t) =>
                t.answer &&
                t.skill === "writing" &&
                run.answers[t.id] === t.answer,
            ).length,
          ) / 2;
      }
    }
  }
  const oral = mock.tasks.filter((t) => t.kind === "speaking"),
    audio: Buffer[] = [],
    segments: { task: string; start: number; end: number }[] = [];
  let duration = 0;
  for (const task of oral) {
    const ids: string[] = JSON.parse(run.answers["$turns:" + task.id] || "[]");
    for (const id of ids) {
      const asset = await ownedMedia(job.userId, id);
      if ((asset.metadata as { examId: string }).examId !== run.id)
        throw new Error("Unrelated recording.");
      const bytes = await readAsset(asset.key),
        pcm = pcm16(bytes),
        seconds = pcm.length / 32000;
      segments.push({
        task: task.section,
        start: duration,
        end: duration + seconds,
      });
      audio.push(pcm);
      duration += seconds;
    }
  }
  const partnerJobs = (
    await db
      .select()
      .from(jobs)
      .where(
        and(
          eq(jobs.userId, job.userId),
          eq(jobs.operation, "exam_partner"),
          eq(jobs.status, "completed"),
        ),
      )
  ).filter((j) => (j.input as ExamAiInput).examId === run.id);
  const interactionComplete =
    oral.every((t) =>
      partnerJobs.some((j) => (j.input as ExamAiInput).taskId === t.id),
    ) &&
    oral
      .slice(3)
      .every(
        (t) => JSON.parse(run.answers["$turns:" + t.id] || "[]").length >= 2,
      );
  if (audio.length && capabilities().soundAnalysis && duration <= 720) {
    const result = await analyzeSound(
      wavFromPcm(Buffer.concat(audio)),
      JSON.stringify({
        rubric: speakingCriteria,
        tasks: oral.map((t) => ({ phase: t.section, prompt: t.prompt })),
        segments,
        partnerTurns: partnerJobs.map((j) => ({
          task: (j.input as ExamAiInput).taskId,
          reply: (j.output as { answer: string }).answer,
        })),
      }),
      duration,
      job.id + "-speaking",
    );
    feedback.speaking = result.value;
    const r = result.value.criteria;
    if (
      oral.every((t) => run.answers[t.id]) &&
      interactionComplete &&
      r.length === 8 &&
      new Set(r.map((c) => c.index)).size === 8 &&
      r.every((c) => c.index < 8) &&
      result.value.status === "assessed"
    ) {
      const ratings = Array.from(
        { length: 8 },
        (_, i) => r.find((c) => c.index === i)!.rating,
      );
      results.speaking =
        speakingHalfPoints({
          topic: band(ratings[0]),
          followup: band(ratings[1]),
          mediation: band(ratings[2]),
          conversation: band(ratings[3]),
          problem: band(ratings[4]),
          pronunciation: language(ratings[5]),
          accuracy: language(ratings[6]),
          range: language(ratings[7]),
        }) / 2;
    }
  } else if (audio.length)
    feedback.speaking = {
      status: "inconclusive",
      summary:
        "Audio analysis needs the configured sound model and a combined learner performance of at most 12 minutes.",
    };
  if (
    full &&
    results.writing !== null &&
    results.speaking !== null &&
    results.reading !== null &&
    results.listening !== null
  )
    results.total =
      results.reading + results.listening + results.writing + results.speaking;
  await db.transaction(async (tx) => {
    await tx
      .update(examAttempts)
      .set({
        results: {
          ...results,
          feedback,
          coaching: true,
          definitionVersion: run.definitionVersion,
        },
        updatedAt: new Date(),
      })
      .where(
        and(eq(examAttempts.id, run.id), eq(examAttempts.userId, job.userId)),
      );
    await tx
      .update(jobs)
      .set({
        status: "completed",
        model: process.env.OPENAI_TEXT_MODEL,
        output: {
          summary:
            "Exam coaching saved. Open the result to see criterion evidence and unassessed dimensions.",
          results,
        },
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, job.id));
  });
}
