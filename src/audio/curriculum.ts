import { eq, and, isNull } from "drizzle-orm";
import { getDb } from "@/db";
import { media } from "@/db/schema";
import { courseAudio } from "../../content/audio";
import { isReviewedClip } from "./readiness";
import { readAsset } from "./storage";
import { AppError } from "@/learning/service";
export async function readyCourseAudio() {
  const rows = await getDb()
    .select()
    .from(media)
    .where(
      and(
        eq(media.kind, "curriculum_audio"),
        eq(media.state, "ready"),
        isNull(media.deletedAt),
      ),
    );
  return new Set(
    courseAudio
      .filter((script) =>
        isReviewedClip(
          rows.find((row) => row.id === script.id),
          script,
        ),
      )
      .map((script) => script.id),
  );
}
export async function curriculumAudio(id: string) {
  const script = courseAudio.find((s) => s.id === id);
  if (!script) throw new AppError(404, "Audio not found.");
  const row = (
    await getDb()
      .select()
      .from(media)
      .where(
        and(
          eq(media.id, id),
          eq(media.kind, "curriculum_audio"),
          eq(media.state, "ready"),
          isNull(media.deletedAt),
        ),
      )
  )[0];
  if (!isReviewedClip(row, script))
    throw new AppError(
      503,
      "This original recording is awaiting generation or audio review. It cannot yet count as listening practice.",
    );
  return { row, bytes: await readAsset(row.key) };
}
