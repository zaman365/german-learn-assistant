import { vocabulary } from "./catalog";
import { lessonSchema } from "./types";
export const vocabularyLessons = vocabulary.map((word) => {
  const head = [word.article, word.word].filter(Boolean).join(" "),
    forms = word.plural || word.forms || word.phrase;
  const candidates = [
    word.example,
    ...vocabulary
      .filter((w) => w.id !== word.id && w.example !== word.example)
      .slice(0, 2)
      .map((w) => w.example),
  ];
  const pivot =
    [...word.id].reduce((sum, c) => sum + c.charCodeAt(0), 0) %
    candidates.length;
  const options = [...candidates.slice(pivot), ...candidates.slice(0, pivot)];
  return lessonSchema.parse({
    id: "VOC-" + word.id,
    version: 1,
    moduleId: "VOC",
    stage: "c1",
    title: head,
    subtitle:
      "Retrieve a complete word package, then connect it to a useful phrase.",
    minutes: 6,
    objectives: [
      "Recall the German expression from its meaning.",
      "Recall its article or forms and recognize a workplace use.",
    ],
    prerequisites: [],
    skills: ["lex:" + word.id],
    references: [word.type === "noun" ? "gender" : "verbs"],
    vocabulary: [word.id],
    blocks: [
      { type: "text", title: head, body: word.meaning + " · " + word.register },
      {
        type: "table",
        title: "Word package",
        headers: ["Element", "German"],
        rows: [
          ["Base form", head],
          ["Plural / forms / phrase", forms],
          ["Stress", word.stress],
        ],
      },
      {
        type: "example",
        german: word.example,
        english: word.translation,
        note: word.phrase,
      },
    ],
    exercises: [
      {
        id: "VOC-" + word.id + "-01",
        type: "short",
        prompt:
          "Write the German base expression for: " +
          word.meaning +
          ". For a noun, include its dictionary article.",
        accepted: [head],
        explanation:
          "Learn this complete base form: " + head + ". " + word.example,
        hint: "Think of the complete package shown in the lesson.",
        skill: "lex:" + word.id,
        family: "lexical-production",
        normalize: { caseSensitive: true, punctuation: false },
        transfer: false,
        exit: true,
      },
      {
        id: "VOC-" + word.id + "-02",
        type: "short",
        prompt:
          word.type === "noun"
            ? "Write the plural exactly as it appears in the word package for " +
              head +
              "."
            : "Recall the forms or complete phrase from the word package for " +
              head +
              ".",
        accepted: [forms],
        explanation: "The word package contains: " + forms,
        hint: "Recall the whole form, including any required preposition.",
        skill: "lex:" + word.id,
        family: "lexical-forms",
        normalize: { caseSensitive: true, punctuation: false },
        transfer: false,
        exit: true,
      },
      {
        id: "VOC-" + word.id + "-03",
        type: "choice",
        prompt: "Which workplace example uses " + head + "?",
        options,
        accepted: [word.example],
        explanation: word.translation,
        hint: "Look for the word or an inflected form of it.",
        skill: "lex:" + word.id,
        family: "lexical-recognition",
        normalize: { caseSensitive: true, punctuation: true },
        transfer: false,
        exit: false,
      },
    ],
    reflection:
      "Use this word in one sentence about your own work. Recall it again when its review is due.",
    quality: {
      method: "ai-authored-and-reviewed",
      reviewedAt: "2026-09-23",
      unresolved: [],
    },
    status: "published",
  });
});
