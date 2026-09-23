import { lessonSchema } from "../src/content/types";
export function listen(
  id: string,
  moduleId: string,
  title: string,
  audioId: string,
  questions: { q: string; a: string; why: string; options?: string[] }[],
) {
  return lessonSchema.parse({
    id,
    version: 1,
    moduleId,
    stage: "c1",
    title,
    subtitle: "Zuhören, belegen, weitergeben",
    minutes: 20,
    objectives: [
      "Extract the corrected details and action from actual audio.",
      "Distinguish a proposal from an agreement.",
    ],
    prerequisites: [],
    skills: ["listening", "mediation"],
    references: ["comprehension", "mediation", "numbers"],
    vocabulary: ["ruckfrage", "termin", "ergebnis"],
    blocks: [
      {
        type: "text",
        title: "Before you listen",
        body: "Read the questions and identify the types of information needed. Listen without opening a transcript. In study mode you may replay the clip. A transcript becomes available after a saved attempt and is recorded as assistance for later tasks using this clip.",
      },
      { type: "audio", title, mediaId: audioId },
      {
        type: "text",
        title: "After the first attempt",
        body: "Check the missed detail in the recording before opening the transcript. Pay attention to negations, corrected dates and whether the speaker describes an agreed action or merely a proposal. Missing audio is not a listening score of zero.",
      },
    ],
    exercises: [
      ...questions.map((x, i) => ({
        id: id + "-Q" + String(i + 1).padStart(2, "0"),
        type: "listening",
        prompt: x.q,
        options: x.options,
        accepted: [x.a],
        explanation: x.why,
        hint: "Listen for the complete clause, especially a correction or condition.",
        skill: "listening",
        family: id + "-audio-details",
        mediaId: audioId,
        transfer: false,
        exit: i === questions.length - 1,
      })),
      {
        id: id + "-P01",
        type: "writing",
        prompt:
          "Write an 80–100-word note for a colleague from the recording. Preserve the important quantities, corrections, responsibilities, conditions and next action. Do not add facts you did not hear.",
        explanation:
          "Use the spoken evidence to create a usable note. An original note requires rubric evaluation against the recording's verified script.",
        hint: "Use caller/topic, relevant facts, action and deadline fields.",
        skill: "listening-mediation",
        family: id + "-audio-note",
        transfer: true,
        exit: true,
        mediaId: audioId,
        rubric: [
          "Preserves the recording's relevant facts, corrections and uncertainty.",
          "Identifies the next action and any deadline accurately.",
          "Creates a concise, usable note without inventing information.",
        ],
      },
    ],
    reflection: "Which detail was changed or qualified by a later phrase?",
    quality: {
      method: "ai-authored-and-reviewed",
      reviewedAt: "2026-09-23",
      unresolved: [
        "Audio must be generated or supplied and reviewed before this activity becomes available.",
      ],
    },
    status: "published",
  });
}
export const listeningLessons = [
  listen("C1-17-L03", "C1-17", "A changed collection time", "audio-phone-01", [
    {
      q: "What is the final collection window?",
      a: "11–12 Uhr",
      options: ["9–10 Uhr", "11–12 Uhr", "16–17 Uhr"],
      why: "The caller corrects the earlier 9 Uhr time to 11–12 Uhr.",
    },
    {
      q: "Where should the cartons be placed?",
      a: "am Wareneingang",
      options: ["am Haupteingang", "am Wareneingang", "im Besprechungsraum"],
      why: "Wareneingang is specified and contrasted with Haupteingang.",
    },
    {
      q: "Write the order number as digits.",
      a: "4826",
      why: "The caller gives Auftragsnummer 4826.",
    },
    {
      q: "Write the callback extension.",
      a: "318",
      why: "The extension is 318.",
    },
    {
      q: "Is a callback required if the window is suitable?",
      a: "No",
      options: ["Yes", "No"],
      why: "A callback is requested only if the time is unsuitable.",
    },
  ]),
  listen(
    "C1-03-L04",
    "C1-03",
    "A trial with an exception",
    "audio-meeting-01",
    [
      {
        q: "How many weeks is the proposed trial? Write digits.",
        a: "3",
        why: "Three weeks corrects the earlier four-week plan.",
      },
      {
        q: "Which cases stay with the specialist department?",
        a: "Vertragsänderungen",
        why: "Contract changes remain with the Fachabteilung.",
      },
      {
        q: "What will be counted every Friday?",
        a: "offene Fälle",
        why: "The speaker proposes counting open cases.",
      },
      {
        q: "Will processing time be measured in this first step?",
        a: "No",
        options: ["Yes", "No"],
        why: "The speaker explicitly excludes measuring processing time at this stage.",
      },
      {
        q: "Has Frau Neumann accepted responsibility for the list?",
        a: "No",
        options: ["Yes", "No"],
        why: "Her responsibility is proposed but not confirmed.",
      },
    ],
  ),
  listen(
    "C1-12-L04",
    "C1-12",
    "Interpret a spoken service trend",
    "audio-presentation-01",
    [
      {
        q: "How many inquiries arrived last month? Write digits.",
        a: "1200",
        why: "The speaker reports 1,200 inquiries.",
      },
      {
        q: "What was the latest rework rate? Include %.",
        a: "3%",
        why: "36 of 1,200 cases equals 3%.",
      },
      {
        q: "What was the previous month's rate? Include %.",
        a: "4%",
        why: "40 of 1,000 equals 4%.",
      },
      {
        q: "Has the checklist's separate effect been established?",
        a: "No",
        options: ["Yes", "No"],
        why: "A mentoring change occurred at the same time.",
      },
      {
        q: "Which extra information should be recorded?",
        a: "Fallarten",
        why: "The recommendation is to distinguish types of cases.",
      },
    ],
  ),
  listen(
    "C1-10-L04",
    "C1-10",
    "Follow a respectful clarification",
    "audio-feedback-01",
    [
      {
        q: "Which attachment was missing?",
        a: "die Quellenliste",
        why: "The draft arrived without its source list.",
      },
      {
        q: "Does the speaker assume the colleague forgot it?",
        a: "No",
        options: ["Yes", "No"],
        why: "The speaker explicitly avoids that assumption.",
      },
      {
        q: "Which page's two figures need sources first? Write digits.",
        a: "3",
        why: "The urgent request concerns two figures on page three.",
      },
      {
        q: "When may the remaining sources be provided?",
        a: "morgen",
        why: "The remainder can follow tomorrow.",
      },
      {
        q: "What future practice is proposed?",
        a: "Mention missing attachments in the covering message.",
        options: [
          "Always reject incomplete drafts.",
          "Mention missing attachments in the covering message.",
          "Stop collecting sources.",
        ],
        why: "The proposed agreement is an explicit note about missing attachments.",
      },
    ],
  ),
];
