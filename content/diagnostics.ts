import { lessonSchema, exerciseSchema } from "../src/content/types";
const rubric = [
  "Fulfils every requested point and preserves relevant facts.",
  "Organizes the response for its audience.",
  "Uses appropriate register and sufficiently accurate German.",
  "Supports the intended meaning without invented claims.",
];
const base = {
  version: 1,
  moduleId: "diagnostic",
  stage: "bridge",
  minutes: 20,
  prerequisites: [],
  references: [],
  vocabulary: [],
  quality: {
    method: "ai-authored-and-reviewed",
    reviewedAt: "2026-09-23",
    unresolved: [],
  },
  status: "published",
  reflection:
    "Which part felt uncertain? Your evidence helps choose the next lesson; it does not certify a level.",
};
const productive = (
  id: string,
  prompt: string,
  skill: string,
  type = "writing",
  stimulus?: string,
) =>
  exerciseSchema.parse({
    id,
    type,
    prompt,
    stimulus,
    skill,
    family: id,
    transfer: true,
    exit: true,
    rubric,
    explanation:
      "This independent response is retained for rubric-based assessment. Unsupported modalities remain unassessed.",
    hint: "Try independently first. Asking for help is allowed and will be recorded.",
  });
const text =
  "Das Unternehmen Linden führt im Herbst einen neuen Ablauf für interne Fortbildungsanträge ein. Bisher schickten Beschäftigte ihre Wünsche unmittelbar an die Personalabteilung. Künftig bespricht die antragstellende Person zuerst mit ihrer Teamleitung, welche Kenntnisse für die aktuelle oder eine absehbare neue Aufgabe benötigt werden. Die Teamleitung bestätigt dabei nur die fachliche Relevanz; die Kostenübernahme entscheidet weiterhin die Personalabteilung.\nFür Fortbildungen im November müssen vollständige Anträge spätestens am 15. Oktober vorliegen. Eine bloße Terminreservierung beim Anbieter wahrt diese interne Frist nicht. Fehlt ein Kostenangebot, gilt der Antrag erst mit dessen Eingang als vollständig. Pflichtschulungen, die für eine unmittelbar bevorstehende Tätigkeit erforderlich sind, werden unabhängig von dieser Monatsfrist bearbeitet. Auch sie müssen aber mit der Teamleitung abgestimmt werden.\nEin vierwöchiger Test des Formulars fand in zwei Teams statt. Acht von zehn Befragten fanden die erforderlichen Angaben verständlich. Zwei wünschten sich eine zusätzliche Erläuterung für mehrtägige Veranstaltungen. Ob sich die Bearbeitungszeit verkürzt, wurde nicht gemessen. Die Projektgruppe hat die Erläuterung ergänzt und empfiehlt eine Einführung in weiteren Teams. Sie macht keine Aussage darüber, ob externe Veranstaltungen grundsätzlich wirksamer sind als interne Angebote.\nBereits schriftlich genehmigte Fortbildungen bleiben von der Änderung unberührt. Eine erneute Antragstellung ist für sie nicht erforderlich. Wer technisch keinen Zugriff auf das Formular hat, kann es als PDF bei der Personalabteilung anfordern. Eine telefonische Anmeldung ersetzt die vollständigen Unterlagen nicht. Die Projektgruppe bietet in der ersten Oktoberwoche zwei offene Sprechstunden an. Dort werden Fragen zum Ablauf beantwortet; Einzelanträge können dort nicht verbindlich genehmigt werden.";
export const diagnosticRounds = [
  lessonSchema.parse({
    ...base,
    id: "D2",
    title: "Reading and meaning",
    subtitle: "Überblick, Detail und Folgerung",
    skills: ["reading", "mediation"],
    objectives: [
      "Locate facts, exceptions and supported inferences.",
      "Paraphrase a workplace procedure.",
    ],
    blocks: [
      {
        type: "text",
        body: "Read independently, then answer the questions. You may return to the text. This assesses reading, not listening.",
      },
      { type: "reading", title: "A revised training process", body: text },
      {
        type: "text",
        body: "Keep verified decisions separate from recommendations and impressions. A plausible workplace practice is not evidence unless this text supports it.",
      },
    ],
    exercises: [
      {
        id: "D2-Q01",
        type: "choice",
        prompt: "What is the text's main purpose?",
        options: [
          "Explain a new application procedure",
          "Prove external training is better",
          "Announce that all training is cancelled",
        ],
        accepted: ["Explain a new application procedure"],
        explanation:
          "The text explains process, deadlines and exceptions, not the superiority of a training type.",
        hint: "Find the main practical change.",
        skill: "reading",
        family: "D2-gist",
      },
      {
        id: "D2-Q02",
        type: "choice",
        prompt: "Who decides cost coverage?",
        options: ["Teamleitung", "Personalabteilung", "The training provider"],
        accepted: ["Personalabteilung"],
        explanation:
          "The team lead confirms relevance; HR retains the cost decision.",
        hint: "Separate relevance from funding.",
        skill: "reading",
        family: "D2-detail",
      },
      {
        id: "D2-Q03",
        type: "choice",
        prompt:
          "Does booking a place with the provider preserve the internal deadline?",
        options: ["Yes", "No"],
        accepted: ["No"],
        explanation:
          "Only a complete internal application preserves the deadline.",
        hint: "Look for a negated condition.",
        skill: "reading",
        family: "D2-condition",
      },
      {
        id: "D2-Q04",
        type: "short",
        prompt:
          "What missing document delays completeness? Write its German compound noun without an article.",
        accepted: ["Kostenangebot"],
        explanation:
          "Without the cost quotation, the application is not complete.",
        hint: "Find the document named in the second paragraph.",
        skill: "reading",
        family: "D2-lexis",
      },
      {
        id: "D2-Q05",
        type: "choice",
        prompt: "Is shorter processing time demonstrated?",
        options: ["Yes", "No"],
        accepted: ["No"],
        explanation:
          "The pilot collected perceived clarity, not handling times.",
        hint: "Check what was actually measured.",
        skill: "reading",
        family: "D2-inference",
        exit: true,
      },
      productive(
        "D2-P01",
        "In 90–110 German words, explain the process to a colleague whose November application lacks a cost quotation. Include the deadline, relevant roles and the limits of the pilot's findings.",
        "mediation",
        "writing",
        text,
      ),
    ],
  }),
  lessonSchema.parse({
    ...base,
    id: "D3",
    minutes: 25,
    title: "Writing and professional tone",
    subtitle: "Reklamation und begründete Meinung",
    skills: ["writing", "register", "argumentation"],
    objectives: [
      "Reply to a customer using internal instructions.",
      "Justify a workplace opinion and respond to an objection.",
    ],
    blocks: [
      {
        type: "text",
        body: "Write independently. Approximate word counts guide the activity; they are not invented official DTB minimums.",
      },
      {
        type: "reading",
        title: "Customer and internal note",
        body: "Kunde: Die Schulungsunterlagen kamen unvollständig an. Vier Hefte fehlen; wir brauchen sie bis Freitag. Interne Anweisung: Bestand heute prüfen, spätestens morgen 12 Uhr antworten. Zustellung bis Freitag noch nicht garantieren. Eine digitale Zwischenlösung ist erlaubt, sofern der Kunde zustimmt. Ursache ungeklärt.",
      },
      {
        type: "text",
        body: "Your original texts stay saved even if feedback is unavailable. Grammar accuracy, task completion, organization and register are assessed together.",
      },
    ],
    exercises: [
      productive(
        "D3-P01",
        "Write about 150 words to the customer. Address the four missing booklets, stock check, response deadline, delivery uncertainty and optional digital alternative.",
        "writing",
        "writing",
        "Vier Hefte fehlen. Bestand heute prüfen; Rückmeldung morgen bis 12 Uhr. Freitag nicht garantieren. Digitale Zwischenlösung nur mit Zustimmung. Ursache ungeklärt.",
      ),
      productive(
        "D3-P02",
        "Write 130–170 words stating whether your workplace should introduce a short weekly knowledge-sharing meeting. Develop two reasons, acknowledge one serious objection and give a proportionate conclusion.",
        "argumentation",
      ),
      productive(
        "D3-P03",
        "Rewrite this internal phrase for a new customer and explain your choice in German: 'Schick uns erst die Nummer, sonst können wir nichts machen.' Preserve the need for the order number without becoming defensive.",
        "register",
      ),
    ],
  }),
  lessonSchema.parse({
    ...base,
    id: "D4",
    minutes: 15,
    title: "Spoken interaction",
    subtitle: "Erklären, nachfragen, reagieren",
    skills: ["speaking", "interaction"],
    objectives: [
      "Give a short workplace explanation.",
      "Respond to follow-ups and repair a misunderstanding.",
    ],
    blocks: [
      {
        type: "text",
        body: "Use the recorder. A typed script is not a substitute for spoken evidence. Short pauses are fine; respond from meaning rather than a memorized speech.",
      },
      {
        type: "example",
        german: "Wenn ich Sie richtig verstanden habe, …",
        english: "If I have understood you correctly, …",
      },
      {
        type: "text",
        body: "Pronunciation, rhythm and intelligibility need actual accessible audio. An automatic transcript may normalize or mishear your words.",
      },
    ],
    exercises: [
      productive(
        "D4-P01",
        "Record a two-minute account of a workplace process you know. Explain the sequence, responsible roles, one difficulty and a practical improvement.",
        "speaking",
        "speaking",
      ),
      productive(
        "D4-P02",
        "Respond spontaneously in a 60–90-second recording: What would you change if only half the usual staff were available? Explain what you would prioritize and why.",
        "interaction",
        "speaking",
      ),
      productive(
        "D4-P03",
        "Record a clarification exchange. A colleague understood forty devices for Tuesday; you meant fourteen for Thursday. Correct quantity and day politely, ask for a read-back and confirm the next action.",
        "interaction",
        "speaking",
      ),
    ],
  }),
  lessonSchema.parse({
    ...base,
    id: "D5",
    minutes: 15,
    title: "Listening and a usable note",
    subtitle: "Korrigierte Details richtig festhalten",
    skills: ["listening", "mediation"],
    objectives: [
      "Extract corrected quantities and conditions from real audio.",
      "Create a concise phone note without invented details.",
    ],
    blocks: [
      {
        type: "text",
        body: "Listen independently before opening any transcript. This round remains unavailable until its recordings have been prepared and reviewed.",
      },
      { type: "audio", title: "Phone message", mediaId: "audio-phone-01" },
      {
        type: "audio",
        title: "A meeting proposal",
        mediaId: "audio-meeting-01",
      },
    ],
    exercises: [
      {
        id: "D5-Q01",
        type: "listening",
        prompt: "What is the final pickup time?",
        options: ["9–10 Uhr", "11–12 Uhr", "15–16 Uhr"],
        accepted: ["11–12 Uhr"],
        mediaId: "audio-phone-01",
        explanation:
          "The caller corrects 9 Uhr to a window from eleven to twelve.",
        hint: "Listen for nicht … sondern …",
        skill: "listening",
        family: "D5-phone",
      },
      {
        id: "D5-Q02",
        type: "listening",
        prompt: "Write the four-digit order number.",
        accepted: ["4826"],
        mediaId: "audio-phone-01",
        explanation: "The order number is 4826.",
        hint: "Listen for Auftragsnummer.",
        skill: "listening",
        family: "D5-phone",
      },
      {
        id: "D5-Q03",
        type: "listening",
        prompt: "Where should the cartons be placed?",
        options: ["Wareneingang", "Haupteingang", "Büro"],
        accepted: ["Wareneingang"],
        mediaId: "audio-phone-01",
        explanation:
          "The receiving entrance, not the main entrance, is specified.",
        hint: "Listen for the location contrast.",
        skill: "listening",
        family: "D5-phone",
        exit: true,
      },
      {
        id: "D5-Q04",
        type: "listening",
        prompt: "How many weeks is the meeting's proposed trial? Write digits.",
        accepted: ["3"],
        mediaId: "audio-meeting-01",
        explanation: "The speaker corrects the duration to three weeks.",
        hint: "Listen for the correction after the duration.",
        skill: "listening",
        family: "D5-meeting",
      },
      {
        id: "D5-Q05",
        type: "listening",
        prompt: "Has the proposed list owner accepted the task?",
        options: ["Yes", "No"],
        accepted: ["No"],
        mediaId: "audio-meeting-01",
        explanation: "Frau Neumann's acceptance is still missing.",
        hint: "Distinguish proposing a person from their agreement.",
        skill: "listening",
        family: "D5-meeting",
        exit: true,
      },
      {
        ...productive(
          "D5-P01",
          "Write an 80–100-word phone note preserving caller, cartons, location, order number, pickup window and conditional callback action.",
          "mediation",
        ),
        mediaId: "audio-phone-01",
      },
    ],
  }),
];
