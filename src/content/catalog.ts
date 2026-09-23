import { themeLesson } from "../../content/speaking-themes";
import { checkpointLessons } from "../../content/checkpoints";
import { comprehensionCheckpoints } from "../../content/checkpoint-comprehension";
import { repairLessons } from "../../content/repair-lessons";
import { repairVocabulary } from "../../content/lexicon-repairs";
import fs from "node:fs";
import path from "node:path";
import { bridgeLessons, diagnosticLesson } from "../../content/bridge";
import { vocabulary as bridgeVocabulary } from "../../content/vocabulary";
import { extraVocabulary } from "../../content/lexicon-expansion";
import { expandedBridge } from "../../content/bridge-expansion";
import { c1Foundations } from "../../content/c1-foundations";
import { c1Meetings } from "../../content/c1-meetings";
import { c1Customers } from "../../content/c1-customers";
import { c1Negotiation } from "../../content/c1-negotiation";
import { c1Collaboration } from "../../content/c1-collaboration";
import { c1Leadership } from "../../content/c1-leadership";
import { c1CareerChange } from "../../content/c1-career-change";
import { c1Transfer } from "../../content/c1-transfer";
import { articleLessons } from "../../content/article-track";
import { pronunciationLessons } from "../../content/pronunciation-track";
import { listeningLessons } from "../../content/listening";
import { c2Lessons } from "../../content/c2";
import { examPreparation } from "../../content/exam-prep";
import { diagnosticRounds } from "../../content/diagnostics";
import type { Module } from "./types";
export const lessons = [
  ...bridgeLessons,
  ...expandedBridge,
  ...checkpointLessons.filter((l) => l.stage === "bridge"),
  ...comprehensionCheckpoints.filter((l) => l.stage === "bridge"),
  ...c1Foundations,
  ...c1Meetings,
  ...c1Customers,
  ...c1Negotiation,
  ...c1Collaboration,
  ...c1Leadership,
  ...c1CareerChange,
  ...c1Transfer,
  ...checkpointLessons.filter((l) => l.stage === "c1"),
  ...comprehensionCheckpoints.filter((l) => l.stage === "c1"),
  ...articleLessons,
  ...repairLessons,
  ...pronunciationLessons,
  ...listeningLessons,
  ...examPreparation,
  themeLesson,
  ...checkpointLessons.filter((l) => l.stage === "c2"),
  ...c2Lessons,
];
export const diagnostic = diagnosticLesson;
export const diagnostics = [diagnostic, ...diagnosticRounds];
export const vocabulary = [
  ...bridgeVocabulary,
  ...extraVocabulary,
  ...repairVocabulary,
];
export function getReference(id: string) {
  const canonical = id === "plurals" ? "noun-endings" : id;
  if (!/^[a-z-]+$/.test(canonical)) return null;
  const file = path.join(
    process.cwd(),
    "content/references",
    `${canonical}.md`,
  );
  return fs.existsSync(file)
    ? { id: canonical, body: fs.readFileSync(file, "utf8") }
    : null;
}
export function getReferences() {
  return fs
    .readdirSync(path.join(process.cwd(), "content/references"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const id = f.slice(0, -3);
      const ref = getReference(id)!;
      return { ...ref, title: ref.body.split("\n")[0].replace(/^# /, "") };
    });
}
const moduleNames: Record<string, string[]> = {
  bridge: [
    "Sentence architecture",
    "Articles and cases",
    "Adjectives, nouns and pronouns",
    "The verb system",
    "Passive and Konjunktiv II",
    "Prepositions and valency",
    "Linking ideas",
    "Professional emails",
    "Spoken interaction",
    "Working with texts",
    "Comprehension strategies",
    "The B2 → C1 checkpoint",
  ],
  c1: [
    "Roles and processes",
    "Instructions and safety",
    "Meetings",
    "Minutes and reports",
    "Inquiries and offers",
    "Complaints and de-escalation",
    "Negotiation",
    "Argumentation",
    "Solving problems together",
    "Feedback and conflict",
    "Leading and delegating",
    "Presentations and numbers",
    "Career and interviews",
    "Rules and dense texts",
    "Change and sustainability",
    "Informal workplace talk",
    "Mediation",
    "Precision and editing",
  ],
  exam: [
    "Your exam map",
    "Reading",
    "Integrated reading and writing",
    "Listening",
    "Phone notes",
    "Language elements",
    "A statement to management",
    "Speaking: topics and follow-ups",
    "Speaking: conversation and solutions",
    "Mocks and readiness",
  ],
  article: [
    "Gender is not case",
    "Reliable suffixes",
    "Tendencies and exceptions",
    "Compounds and word families",
    "Your personal article deck",
  ],
  pronunciation: [
    "Vowels",
    "Consonants",
    "Word stress",
    "Rhythm and intonation",
    "Fluency",
  ],
  c2: [
    "Source synthesis",
    "Nuance and register",
    "Advanced argument",
    "Complex listening and discussion",
  ],
};
const prefixes: Record<string, string> = {
  bridge: "B2",
  c1: "C1",
  exam: "X",
  article: "ART",
  pronunciation: "PR",
  c2: "C2",
};
export const modules: Module[] = Object.entries(moduleNames).flatMap(
  ([stage, names]) =>
    names.map((title, i) => ({
      id: `${prefixes[stage]}-${String(i + 1).padStart(2, "0")}`,
      stage: stage as Module["stage"],
      title,
      outcome: title,
      order: i + 1,
    })),
);
modules.splice(
  modules.findIndex((m) => m.stage === "c2"),
  0,
  {
    id: "C2-00",
    stage: "c2",
    title: "Fresh C2 entry diagnostic",
    outcome: "Locate the next written stretch and separate sound evidence gaps",
    order: 0,
  },
);
export function findLesson(id: string) {
  return (
    diagnostics.find((l) => l.id === id) || lessons.find((l) => l.id === id)
  );
}
