import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { and, eq, isNull, lt, inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { media, profiles } from "@/db/schema";
import { AppError, publishedLesson, submitAttempt } from "@/learning/service";
import { inspectWav } from "./wav";
import { putAsset, readAsset, removeAsset } from "./storage";
export const MAX_AUDIO_BYTES = 20 * 1024 * 1024;
function secret() {
  if (!process.env.BETTER_AUTH_SECRET)
    throw new Error("Media signing secret unavailable.");
  return process.env.BETTER_AUTH_SECRET;
}
export async function ownedMedia(userId: string, id: string) {
  const row = (
    await getDb()
      .select()
      .from(media)
      .where(
        and(
          eq(media.id, id),
          eq(media.userId, userId),
          eq(media.state, "ready"),
          isNull(media.deletedAt),
        ),
      )
  )[0];
  if (!row) throw new AppError(404, "Recording not found.");
  return row;
}
export async function uploadRecording(
  userId: string,
  bytes: Buffer,
  input: { lessonId: string; exerciseId: string; attemptKey: string },
) {
  if (bytes.length > MAX_AUDIO_BYTES)
    throw new AppError(413, "The recording exceeds the 20 MB limit.");
  let properties;
  try {
    properties = inspectWav(bytes);
  } catch (e) {
    throw new AppError(400, (e as Error).message);
  }
  const lesson = await publishedLesson(input.lessonId),
    exercise = lesson.exercises.find((e) => e.id === input.exerciseId);
  if (!exercise || exercise.type !== "speaking")
    throw new AppError(400, "Select a speaking exercise.");
  const id = createHash("sha256")
      .update(userId + ":" + input.attemptKey)
      .digest("hex"),
    checksum = createHash("sha256").update(bytes).digest("hex"),
    key = "recordings/" + userId + "/" + id + ".wav";
  const previous = (
    await getDb().select().from(media).where(eq(media.id, id))
  )[0];
  if (previous && (previous.checksum !== checksum || previous.deletedAt))
    throw new AppError(
      409,
      "This recording key is already in use. Create a new take.",
    );
  if (!previous || previous.state === "failed") {
    const claimed = previous
      ? await getDb()
          .update(media)
          .set({ state: "uploading", createdAt: new Date() })
          .where(and(eq(media.id, id), eq(media.state, "failed")))
          .returning()
      : await getDb()
          .insert(media)
          .values({
            id,
            userId,
            key,
            mime: "audio/wav",
            bytes: bytes.length,
            checksum,
            kind: "learner_recording",
            state: "uploading",
            metadata: {
              ...properties,
              lessonId: lesson.id,
              contentVersion: lesson.version,
              exerciseId: exercise.id,
              attemptKey: input.attemptKey,
              source: "browser_microphone",
              transcriptEdited: false,
            },
          })
          .onConflictDoNothing()
          .returning();
    if (!claimed.length)
      throw new AppError(
        409,
        "This upload is already being processed. Retry after it finishes.",
      );
    try {
      await putAsset(key, bytes, "audio/wav");
      const ready = await getDb()
        .update(media)
        .set({ state: "ready" })
        .where(
          and(
            eq(media.id, id),
            eq(media.state, "uploading"),
            isNull(media.deletedAt),
          ),
        )
        .returning();
      if (!ready.length) {
        await removeAsset(key);
        throw new AppError(409, "The upload expired. Record a new take.");
      }
    } catch (e) {
      await getDb()
        .update(media)
        .set({ state: "failed" })
        .where(and(eq(media.id, id), eq(media.state, "uploading")));
      await removeAsset(key).catch(() => {});
      throw e;
    }
  } else if (previous.state !== "ready")
    throw new AppError(
      409,
      "This recording is still being uploaded. Please retry shortly.",
    );
  const result = await submitAttempt(userId, {
    ...input,
    version: lesson.version,
    response: "[Recording " + id + "]",
    recordingId: id,
  });
  return {
    ...result,
    media: {
      id,
      duration: properties.duration,
      url: await mediaUrl(userId, id),
    },
  };
}
export async function mediaUrl(userId: string, id: string) {
  await ownedMedia(userId, id);
  const expires = Math.floor(Date.now() / 1000) + 300,
    payload = userId + ":" + id + ":" + expires,
    signature = createHmac("sha256", secret()).update(payload).digest("hex");
  return "/api/media/" + id + "?expires=" + expires + "&signature=" + signature;
}
export async function getSignedMedia(
  userId: string,
  id: string,
  expires: string | null,
  signature: string | null,
) {
  const seconds = Number(expires);
  if (
    !Number.isInteger(seconds) ||
    seconds < Math.floor(Date.now() / 1000) ||
    seconds > Math.floor(Date.now() / 1000) + 301 ||
    !signature ||
    !/^[a-f0-9]{64}$/.test(signature)
  )
    throw new AppError(
      403,
      "The playback link expired. Refresh it to continue.",
    );
  const expected = createHmac("sha256", secret())
    .update(userId + ":" + id + ":" + seconds)
    .digest("hex");
  if (
    !timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex"),
    )
  )
    throw new AppError(403, "Invalid playback link.");
  const row = await ownedMedia(userId, id);
  return { row, bytes: await readAsset(row.key) };
}
export async function deleteRecording(userId: string, id: string) {
  const row = (
    await getDb()
      .select()
      .from(media)
      .where(and(eq(media.id, id), eq(media.userId, userId)))
  )[0];
  if (!row) throw new AppError(404, "Recording not found.");
  await getDb()
    .update(media)
    .set({ state: "deleting", deletedAt: new Date() })
    .where(and(eq(media.id, id), eq(media.userId, userId)));
  await removeAsset(row.key);
  await getDb().update(media).set({ state: "deleted" }).where(eq(media.id, id));
  return { deleted: true };
}
export async function cleanExpiredRecordings(now = new Date()) {
  // Tombstone before removal: playback stays denied if S3 is unavailable.
  // Retrying these idempotent deletes also recovers a worker crash during removal.
  const stale = await getDb()
    .update(media)
    .set({ state: "deleting", deletedAt: now })
    .where(
      and(
        eq(media.kind, "learner_recording"),
        eq(media.state, "uploading"),
        lt(media.createdAt, new Date(now.getTime() - 10 * 60000)),
      ),
    )
    .returning();
  const pending = await getDb()
    .select()
    .from(media)
    .where(
      and(
        eq(media.kind, "learner_recording"),
        inArray(media.state, ["deleting"]),
      ),
    );
  for (const asset of new Map(
    [...stale, ...pending].map((a) => [a.id, a]),
  ).values()) {
    await removeAsset(asset.key);
    await getDb()
      .update(media)
      .set({ state: "deleted" })
      .where(eq(media.id, asset.id));
  }
  const rows = await getDb()
    .select({ asset: media, profile: profiles.data })
    .from(media)
    .innerJoin(profiles, eq(profiles.userId, media.userId))
    .where(
      and(
        eq(media.kind, "learner_recording"),
        isNull(media.deletedAt),
        lt(media.createdAt, now),
      ),
    );
  for (const { asset, profile } of rows)
    if (
      now.getTime() - asset.createdAt.getTime() >
      profile.recordingRetentionDays * 86400000
    )
      await deleteRecording(asset.userId!, asset.id);
}
