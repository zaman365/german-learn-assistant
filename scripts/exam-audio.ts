import "dotenv/config";
import { createHash } from "node:crypto";
import { eq } from "drizzle-orm";
import { mocks } from "../content/exams";
import { getDb, closeDb } from "../src/db";
import { media } from "../src/db/schema";
import { putAsset, readAsset } from "../src/audio/storage";
import { isReviewedClip, timelineSourceHash } from "../src/audio/readiness";
import { composeTimeline } from "../src/audio/pcm";
async function main() {
  const [action, id] = process.argv.slice(2),
    mock = mocks.find((m) => m.id === id);
  if (!mock) throw new Error("Choose MOCK-01, MOCK-02 or MOCK-03.");
  const db = getDb(),
    assetId = id + "-timeline-v" + mock.version;
  if (action === "compose") {
    if ((await db.select().from(media).where(eq(media.id, assetId))).length)
      throw new Error(
        "This timeline already exists. Version a new timeline explicitly.",
      );
    const clips = [];
    for (const clip of mock.audio) {
      const row = (
        await db.select().from(media).where(eq(media.id, clip.id))
      )[0];
      if (!isReviewedClip(row, clip))
        throw new Error("Generate and approve " + clip.id + " first.");
      clips.push({ offset: clip.offset, bytes: await readAsset(row.key) });
    }
    const bytes = composeTimeline(clips, 1500),
      key = "exams/" + assetId + ".wav";
    await putAsset(key, bytes, "audio/wav");
    await db.insert(media).values({
      id: assetId,
      key,
      userId: null,
      mime: "audio/wav",
      bytes: bytes.length,
      checksum: createHash("sha256").update(bytes).digest("hex"),
      kind: "exam_timeline",
      state: "pending_review",
      metadata: {
        mockId: id,
        sourceHash: timelineSourceHash(mock),
        duration: 1500,
        version: mock.version,
        synthetic: true,
        reviewRequired:
          "Listen end-to-end; verify cues, answer windows and content. This original timeline is not claimed to reproduce official unverified cue rules.",
      },
    });
    console.log(
      "25-minute original timeline composed. End-to-end review is required.",
    );
  } else if (action === "approve") {
    if (process.env.AUDIO_REVIEW_CONFIRMED !== "true")
      throw new Error(
        "Review the complete timeline before setting AUDIO_REVIEW_CONFIRMED=true.",
      );
    const row = (await db.select().from(media).where(eq(media.id, assetId)))[0];
    if (!row) throw new Error("Compose the timeline first.");
    if (
      row.deletedAt ||
      (row.metadata as { sourceHash?: string }).sourceHash !==
        timelineSourceHash(mock)
    )
      throw new Error(
        "The source scripts changed. Compose a newly versioned timeline.",
      );
    await readAsset(row.key);
    await db
      .update(media)
      .set({
        state: "ready",
        metadata: {
          ...(row.metadata as object),
          reviewedAt: new Date().toISOString(),
        },
      })
      .where(eq(media.id, assetId));
    console.log(
      "Original timeline approved for future rehearsal; official simulation verification remains separate.",
    );
  } else throw new Error("Usage: pnpm exam:audio compose|approve MOCK-01");
}
main().finally(closeDb);
