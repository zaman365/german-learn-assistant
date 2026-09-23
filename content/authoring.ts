import { lessonSchema, type Lesson, type Exercise } from "../src/content/types";
export type Check = {
  prompt: string;
  answer: string | string[];
  why: string;
  options?: string[];
  skill?: string;
  tag?: string;
  exit?: boolean;
};
export type LessonDraft = {
  id: string;
  version?: number;
  title: string;
  de: string;
  stage?: Lesson["stage"];
  minutes?: number;
  objectives: string[];
  prerequisites?: string[];
  skills: string[];
  references: string[];
  vocabulary?: string[];
  explanation: string;
  example: [string, string];
  table?: { title: string; headers: string[]; rows: string[][] };
  steps?: { label: string; detail: string }[];
  reading: { title: string; body: string };
  tip: string;
  checks: Check[];
  task: {
    prompt: string;
    rubric: string[];
    type?: "writing" | "speaking";
    skill?: string;
  };
  reflection: string;
  audioId?: string;
};
export function authorLesson(d: LessonDraft): Lesson {
  const block: Lesson["blocks"] = [
    { type: "text", title: "Understand the move", body: d.explanation },
    { type: "example", german: d.example[0], english: d.example[1] },
  ];
  if (d.table) block.push({ type: "table", ...d.table });
  if (d.steps)
    block.push({
      type: "diagram",
      title: "A decision you can reuse",
      steps: d.steps,
    });
  block.push(
    { type: "reading", ...d.reading },
    { type: "text", title: "Make it your own", body: d.tip },
  );
  if (d.audioId)
    block.push({ type: "audio", title: d.reading.title, mediaId: d.audioId });
  const exercises: Partial<Exercise>[] = d.checks.map((c, i) => ({
    id: `${d.id}-Q${String(i + 1).padStart(2, "0")}`,
    type: c.options ? "choice" : "short",
    prompt: c.prompt,
    accepted: Array.isArray(c.answer) ? c.answer : [c.answer],
    explanation: c.why,
    hint: "Return to the worked example. Identify the exact relationship or form the task asks for.",
    skill: c.skill || d.skills[0],
    family: `${d.id}-${c.options ? "recognition" : i < 2 ? "form" : "transfer"}`,
    errorTag: c.tag || "LEX",
    options: c.options,
    transfer: !c.options,
    exit: c.exit ?? i === d.checks.length - 1,
  }));
  exercises.push({
    id: `${d.id}-P01`,
    type: d.task.type || "writing",
    prompt: d.task.prompt,
    stimulus: d.reading.body,
    explanation:
      "Use the published criteria to review task completion, evidence, organization and language. An original response requires rubric evaluation.",
    hint: "Plan the relevant content first, then choose structures that express the intended meaning.",
    skill:
      d.task.skill || (d.task.type === "speaking" ? "speaking" : "writing"),
    family: `${d.id}-independent-composition`,
    mediaId: d.audioId,
    transfer: true,
    exit: true,
    rubric: d.task.rubric,
  });
  return lessonSchema.parse({
    id: d.id,
    version: d.version || 1,
    moduleId: d.id.replace(/-L\d+$/, ""),
    stage: d.stage || "c1",
    title: d.title,
    subtitle: d.de,
    minutes: d.minutes || 25,
    objectives: d.objectives,
    prerequisites: d.prerequisites || [],
    skills: [
      ...new Set([
        ...d.skills,
        d.task.skill || (d.task.type === "speaking" ? "speaking" : "writing"),
      ]),
    ],
    references: d.references,
    vocabulary: d.vocabulary || [],
    blocks: block,
    exercises,
    reflection: d.reflection,
    status: "published",
    quality: {
      method: "ai-authored-and-reviewed",
      reviewedAt: "2026-09-23",
      unresolved: [],
    },
  });
}
