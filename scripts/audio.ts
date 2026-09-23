import "dotenv/config";
import { createHash } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb, closeDb } from "../src/db";
import { media } from "../src/db/schema";
import { mocks } from "../content/exams";
import { courseAudio } from "../content/audio";
import { synthesize, capabilities } from "../src/ai/provider";
import { putAsset, readAsset } from "../src/audio/storage";
import { scriptHash } from "../src/audio/readiness";
import { inspectWav } from "../src/audio/wav";
async function main() {
  const [action, id] = process.argv.slice(2);
  const script = [
    ...courseAudio,
    ...mocks.flatMap((m) =>
      m.audio.map((a) => ({
        ...a,
        version: a.version || m.version,
        voice: "alloy",
      })),
    ),
  ].find((s) => s.id === id);
  if (!script) throw new Error("Choose a course or original exam audio ID.");
  const db = getDb(),
    existing = (await db.select().from(media).where(eq(media.id, id)))[0];
  if (action === "generate") {
    if (existing) {
      console.log(
        "Asset already exists; no duplicate generation. Review or version it explicitly.",
      );
      return;
    }
    if (!capabilities().speech)
      throw new Error("Configure the speech provider and model first.");
    const bytes = await synthesize(
        script.script,
        script.voice,
        id + "-v" + script.version,
      ),
      properties = inspectWav(bytes),
      key = "curriculum/" + id + "-v" + script.version + ".wav";
    await putAsset(key, bytes, "audio/wav");
    await db.insert(media).values({
      id,
      userId: null,
      key,
      mime: "audio/wav",
      bytes: bytes.length,
      checksum: createHash("sha256").update(bytes).digest("hex"),
      kind: "curriculum_audio",
      state: "pending_review",
      metadata: {
        ...properties,
        scriptVersion: script.version,
        scriptHash: createHash("sha256").update(script.script).digest("hex"),
        synthetic: true,
        voice: script.voice,
        model: process.env.OPENAI_SPEECH_MODEL,
      },
    });
    console.log(
      "Generated and stored; publication awaits a German audio review.",
    );
  } else if (action === "approve") {
    if (process.env.AUDIO_REVIEW_CONFIRMED !== "true")
      throw new Error(
        "Listen to the full clip and check German words, quantities, pace and script fidelity, then set AUDIO_REVIEW_CONFIRMED=true.",
      );
    if (!existing) throw new Error("Generate the asset first.");
    const meta = existing.metadata as {
      scriptHash?: string;
      scriptVersion?: number;
    };
    if (
      existing.deletedAt ||
      meta.scriptHash !== scriptHash(script.script) ||
      meta.scriptVersion !== script.version
    )
      throw new Error(
        "This asset belongs to an older script. Publish a new version before approval.",
      );
    inspectWav(await readAsset(existing.key));
    await db
      .update(media)
      .set({
        state: "ready",
        metadata: {
          ...(existing.metadata as object),
          reviewedAt: new Date().toISOString(),
          reviewMethod: "operator-confirmed listening",
        },
      })
      .where(eq(media.id, id));
    console.log("Audio approved for course use.");
  } else throw new Error("Usage: pnpm audio generate|approve AUDIO_ID");
}
main().finally(closeDb);
