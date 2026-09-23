import {
  lessons,
  diagnostics,
  vocabulary,
  getReference,
} from "../src/content/catalog";
import { vocabularyLessons } from "../src/content/vocabulary-practice";
import { courseAudio } from "../content/audio";
import { mocks } from "../content/exams";
import { lessonSchema, lexicalSchema } from "../src/content/types";
export function validateContent() {
  const ids = new Set<string>();
  const words = new Set(vocabulary.map((w) => w.id));
  for (const l of [...lessons, ...diagnostics, ...vocabularyLessons]) {
    lessonSchema.parse(l);
    if (ids.has(l.id)) throw new Error(`Duplicate lesson: ${l.id}`);
    ids.add(l.id);
    for (const ref of l.references)
      if (!getReference(ref)) throw new Error(`Missing reference: ${ref}`);
    for (const word of l.vocabulary)
      if (!words.has(word)) throw new Error(`Missing vocabulary: ${word}`);
    for (const e of l.exercises) {
      if (e.mediaId && !courseAudio.some((a) => a.id === e.mediaId))
        throw new Error("Missing audio script: " + e.mediaId);
      if (e.options && new Set(e.options).size !== e.options.length)
        throw new Error("Duplicate choices: " + e.id);

      if (ids.has(e.id)) throw new Error(`Duplicate exercise: ${e.id}`);
      ids.add(e.id);
      if (
        e.accepted?.length &&
        e.type === "choice" &&
        !e.accepted.every((a) => e.options?.includes(a))
      )
        throw new Error(`Answer outside options: ${e.id}`);
    }
  }
  const visit = (id: string, active: Set<string>) => {
    if (active.has(id)) throw new Error(`Prerequisite cycle: ${id}`);
    const lesson = lessons.find((l) => l.id === id);
    if (!lesson) throw new Error(`Missing prerequisite: ${id}`);
    for (const dep of lesson.prerequisites)
      visit(dep, new Set([...active, id]));
  };
  lessons.forEach((l) => visit(l.id, new Set()));
  vocabulary.forEach((w) => lexicalSchema.parse(w));
  if (words.size !== vocabulary.length) throw new Error("Duplicate lexical ID");
  for (const [stage, count] of [
    ["bridge", 12],
    ["c1", 18],
    ["exam", 10],
    ["article", 5],
    ["pronunciation", 5],
    ["c2", 4],
  ] as const)
    if (
      new Set(lessons.filter((l) => l.stage === stage).map((l) => l.moduleId))
        .size < count
    )
      throw new Error("Missing module coverage for " + stage);
  if (lessons.filter((l) => l.stage === "c1").length < 48)
    throw new Error("At least 48 C1 lessons are required.");
  for (const mock of mocks) {
    if (mock.tasks.length !== 60 || mock.audio.length !== 14)
      throw new Error("Incomplete mock: " + mock.id);
    for (const t of mock.tasks)
      if (t.answer && !t.options?.includes(t.answer))
        throw new Error("Invalid mock answer: " + t.id);
  }
  const scored = [...lessons, ...diagnostics]
    .flatMap((l) => l.exercises)
    .filter((e) => e.accepted?.length).length;
  if (scored < 60 || vocabulary.length < 80)
    throw new Error("M1 content floors are unmet");
  return {
    lessons: lessons.length,
    scoredItems: scored,
    lexicalEntries: vocabulary.length,
  };
}
if (process.argv[1]?.includes("validate-content"))
  console.log(validateContent());
