import archivedMocks from "../content/archive/mocks-v1.json";
import archivedLessons from "../content/archive/lessons-v1.json";
import "dotenv/config";
import { vocabularyLessons } from "../src/content/vocabulary-practice";
import { mocks } from "../content/exams";
import { createHash } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { getDb, closeDb } from "../src/db";
import { contentVersions } from "../src/db/schema";
import {
  lessons,
  diagnostics,
  vocabulary,
  getReferences,
  modules,
} from "../src/content/catalog";
import { validateContent } from "./validate-content";
async function main() {
  const counts = validateContent();
  const db = getDb();
  const entries = [
    ...archivedLessons,
    ...lessons,
    ...diagnostics,
    ...vocabularyLessons,
  ].map((l) => ({
    id: l.id,
    version: l.version,
    type: "lesson",
    payload: l,
    published: l.status === "published",
  }));
  const others = [
    ...vocabulary.map((w) => ({
      id: `lex:${w.id}`,
      type: "lexical",
      payload: w,
    })),
    ...getReferences().map((r) => ({
      id: `ref:${r.id}`,
      type: "reference",
      payload: r,
    })),
    ...modules.map((m) => ({ id: m.id, type: "module", payload: m })),
  ].map((x) => ({ ...x, version: 1, published: true }));
  await db.transaction(async (tx) => {
    for (const entry of [
      ...entries,
      ...others,
      ...[...archivedMocks, ...mocks].map((m) => ({
        id: m.id,
        version: m.version,
        type: "mock",
        payload: m,
        published: true,
      })),
    ]) {
      const hash = createHash("sha256")
        .update(JSON.stringify(entry.payload))
        .digest("hex");
      const existing = (
        await tx
          .select()
          .from(contentVersions)
          .where(
            and(
              eq(contentVersions.id, entry.id),
              eq(contentVersions.version, entry.version),
            ),
          )
      )[0];
      if (existing && existing.hash !== hash)
        throw new Error(
          `Immutable content collision: ${entry.id} v${entry.version}. Increase its version.`,
        );
      if (!existing)
        await tx.insert(contentVersions).values({ ...entry, hash });
    }
  });
  console.log("Published content without modifying learner progress:", counts);
}
main().finally(closeDb);
