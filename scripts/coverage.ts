import fs from "node:fs";
import {
  lessons,
  diagnostics,
  modules,
  vocabulary,
  getReferences,
} from "../src/content/catalog";
import { vocabularyLessons } from "../src/content/vocabulary-practice";
import { mocks } from "../content/exams";
const escape = (s: string) => s.replaceAll("|", "\\|").replaceAll("\n", " ");
const lines = [
  "# Implemented content coverage",
  "",
  "Generated from the authored catalog. This maps implementation locations, not independent language-quality certification. Audio IDs identify required assets; runtime availability depends on reviewed files in private storage.",
  "",
  "## Course map",
  "",
  "| Module | Lesson | Outcomes | Exit checks | References | Required audio |",
  "|---|---|---|---|---|---|",
  ...modules
    .flatMap((m) =>
      lessons
        .filter((l) => l.moduleId === m.id)
        .map((l) =>
          [
            m.id,
            l.id + " — " + l.title,
            l.objectives.join(" / "),
            l.exercises
              .filter((e) => e.exit)
              .map((e) => e.id)
              .join(", "),
            l.references.join(", "),
            [
              ...new Set(
                l.exercises.flatMap((e) => (e.mediaId ? [e.mediaId] : [])),
              ),
            ].join(", ") || "None",
          ].map(escape),
        ),
    )
    .map((row) => "| " + row.join(" | ") + " |"),
  "",
  "## Diagnostics",
  "",
  ...diagnostics.map(
    (d) =>
      "- " +
      d.id +
      ": " +
      d.title +
      " — " +
      d.exercises.length +
      " tasks; " +
      d.skills.join(", ") +
      ".",
  ),
  "",
  "## Internal learning resources",
  "",
  "- " +
    vocabulary.length +
    " lexical packages; " +
    vocabularyLessons.length +
    " native three-task retrieval packages, each linked from the vocabulary browser.",
  "- " +
    getReferences().length +
    " reference articles: " +
    getReferences()
      .map((r) => r.id)
      .join(", ") +
    ".",
  "- English explanations, German examples, exact declension tables and semantic step diagrams are embedded in lessons.",
  "- Gender patterns distinguish productive suffixes, tendencies, exceptions, compound heads and lexical senses.",
  "",
  "## Original exam assets",
  "",
  "| Set | Tasks | Listening scripts | Reserved |",
  "|---|---:|---:|---|",
  ...mocks.map(
    (m) =>
      "| " +
      m.id +
      " — " +
      m.title +
      " | " +
      m.tasks.length +
      " | " +
      m.audio.length +
      " | " +
      (m.reserved ? "Yes" : "No") +
      " |",
  ),
  "",
  "Every set includes 20 reading items, 20 listening items, 12 language-element items, a customer email, phone note, management statement and five speaking phases. Each 25-minute timeline is composed only after its 14 clips are generated and reviewed. Complete mock delivery remains subject to audio/provider/content/rule gates.",
  "",
  "## Behavior and evidence mapping",
  "",
  "| Requirement | Implementation |",
  "|---|---|",
  "| Immutable published content and attempts | scripts/seed.ts; src/db/schema.ts; src/learning/service.ts |",
  "| Orthography-aware objective feedback | src/assessment/grade.ts |",
  "| Independent transfer and seven-day retention | src/learning/policies.ts; src/learning/evidence.ts |",
  "| Calendar reviews and daily/weekly recommendations | src/learning/policies.ts; src/planning/planner.ts |",
  "| Structured AI output, actual-error/variant distinction | src/ai/contracts.ts; src/ai/service.ts |",
  "| Real recordings, signed owner playback, deletion/retention | src/audio; src/components/audio-recorder.tsx |",
  "| Timer, exposure, reserved mock and rubric arithmetic | src/exams; content/exams |",
  "| Export, current-owner merge and legacy provenance | src/exports |",
  "| Install, recovery and external verification gates | docs/RUNBOOK.md; docs/IMPLEMENTATION_STATUS.md |",
  "",
  "Read the implementation record for what has actually been tested. The full course requires an independent German/content review before it is represented as a verified C1 teaching release.",
  "",
];
fs.writeFileSync("docs/CONTENT_COVERAGE.md", lines.join("\n"));
console.log("Wrote course, diagnostic, lexical, reference and exam coverage.");
