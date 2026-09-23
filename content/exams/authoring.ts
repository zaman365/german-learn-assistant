import { mockSchema, type Mock, type ExamTask } from "../../src/exams/types";
type Question = {
  prompt: string;
  options: string[];
  answer: number;
  why: string;
};
export type MockDraft = {
  id: string;
  title: string;
  description: string;
  teasers: string[];
  needs: { text: string; answer: number; why: string }[];
  internal: { text: string; questions: Question[] }[];
  advice: string[];
  adviceQuestions: { text: string; answer: number; why: string }[];
  minutes: string;
  minuteQuestions: Question[];
  email: string;
  emailQuestions: Question[];
  emailPrompt: string;
  gapText1: string;
  wordBank: string[];
  gaps1: { answer: string; why: string }[];
  gapText2: string;
  gaps2: { options: string[]; answer: number; why: string }[];
  statement: string[];
  listening: { title: string; script: string; questions: Question[] }[];
  phone: { script: string; reason: Question; key: string[] };
  speaking: {
    topic: string;
    followup: string;
    partner: string;
    conversation: string;
    problem: string;
  };
};
export function authorMock(d: MockDraft): Mock {
  const tasks: ExamTask[] = [],
    audio: Mock["audio"] = [];
  const add = (task: Omit<ExamTask, "id">) =>
    tasks.push({
      ...task,
      id: d.id + "-T" + String(tasks.length + 1).padStart(2, "0"),
    });
  const choice = (
    block: number,
    section: string,
    skill: ExamTask["skill"],
    title: string,
    stimulus: string | undefined,
    q: Question,
    audioId?: string,
  ) =>
    add({
      block,
      section,
      skill,
      title,
      stimulus,
      prompt: q.prompt,
      options: q.options,
      answer: q.options[q.answer],
      rationale: q.why,
      halfPoints: skill === "writing" ? 1 : 6,
      kind: "choice",
      audioId,
    });
  const teasers = d.teasers
    .map((s, i) => String.fromCharCode(65 + i) + ". " + s)
    .join("\n\n");
  for (const q of d.needs)
    choice(0, "Lesen 1", "reading", "Ein passendes Angebot finden", teasers, {
      prompt: q.text,
      options: d.teasers.map((_, i) => String.fromCharCode(65 + i)),
      answer: q.answer,
      why: q.why,
    });
  const truthChecks: Record<string, { statement: string; correct: boolean }[]> =
    {
      "MOCK-01": [
        {
          statement:
            "Die eingetragene Person darf Vertragsänderungen ohne Freigabe der Fachabteilung bestätigen.",
          correct: false,
        },
        {
          statement:
            "Für die Fallwerkstatt muss die Teilnahme mit der Teamleitung abgestimmt werden.",
          correct: true,
        },
      ],
      "MOCK-02": [
        {
          statement:
            "Eine Aufgabe gilt erst nach Bestätigung der übernehmenden Schicht als übergeben.",
          correct: true,
        },
        {
          statement:
            "Wer das Vorgängermodell kennt, muss nicht an der Schulung teilnehmen.",
          correct: false,
        },
      ],
      "MOCK-03": [
        {
          statement:
            "Die spätere Sprechzeit ersetzt einen Teil der bisherigen Beratungszeit.",
          correct: true,
        },
        {
          statement:
            "Die zweite Prüfung übernimmt die fachliche Verantwortung der Autorinnen und Autoren.",
          correct: false,
        },
      ],
    };
  d.internal.forEach((source, index) =>
    source.questions.forEach((question, i) => {
      const fact = truthChecks[d.id][index];
      const task =
        i === 0
          ? {
              prompt: fact.statement,
              options: ["Richtig.", "Falsch."],
              answer: fact.correct ? 0 : 1,
              why: question.why,
            }
          : question;
      choice(
        0,
        "Lesen 2",
        "reading",
        "Interne Mitteilungen",
        source.text,
        task,
      );
    }),
  );
  for (const q of d.adviceQuestions)
    choice(
      0,
      "Lesen 3",
      "reading",
      "Rat im beruflichen Alltag",
      d.advice
        .map((s, i) => String.fromCharCode(65 + i) + ". " + s)
        .join("\n\n"),
      {
        prompt: q.text,
        options: [
          ...d.advice.map((_, i) => String.fromCharCode(65 + i)),
          "Kein passender Beitrag",
        ],
        answer: q.answer,
        why: q.why,
      },
    );
  for (const q of d.minuteQuestions)
    choice(0, "Lesen 4", "reading", "Ein Protokoll auswerten", d.minutes, q);
  for (const q of d.emailQuestions)
    choice(
      0,
      "Lesen und Schreiben",
      "reading",
      "Eine Beschwerde verstehen",
      d.email,
      q,
    );
  add({
    block: 0,
    section: "Lesen und Schreiben",
    skill: "writing",
    title: "Antwort an die Kundschaft",
    stimulus: d.email,
    prompt: d.emailPrompt,
    kind: "writing",
    halfPoints: 14,
    rationale:
      "Gehen Sie auf alle Anliegen ein, trennen Sie bestätigte Fakten von Zusagen und formulieren Sie adressatengerecht.",
    rubric: [
      "Aufgabenbewältigung des Kundenbriefs",
      "Organisation, Korrektheit und Spektrum werden gemeinsam mit der Stellungnahme bewertet.",
    ],
  });
  const matchingAnswers = d.listening
    .slice(3, 7)
    .map((clip) => clip.questions[0].options[clip.questions[0].answer]);
  const matchingDistractors = d.listening[3].questions[0].options
    .filter((option) => !matchingAnswers.includes(option))
    .slice(0, 2);
  const matchingBank = [
    matchingAnswers[2],
    matchingDistractors[0],
    matchingAnswers[0],
    matchingAnswers[3],
    matchingDistractors[1],
    matchingAnswers[1],
  ];
  d.listening.forEach((clip, i) => {
    const id = d.id + "-A" + String(i + 1).padStart(2, "0");
    const section =
      i < 3 ? "Hören 1" : i < 7 ? "Hören 2" : i === 7 ? "Hören 3" : "Hören 4";
    const offsets = [
      45, 165, 285, 415, 490, 565, 640, 755, 1005, 1070, 1135, 1200, 1265,
    ];
    audio.push({
      id,
      title: clip.title,
      script: clip.script,
      offset: offsets[i],
    });
    clip.questions.forEach((original) => {
      const question =
        i >= 3 && i < 7
          ? {
              ...original,
              prompt: "Welche Aussage passt am besten zu diesem Gespräch?",
              options: matchingBank,
              answer: matchingBank.indexOf(original.options[original.answer]),
            }
          : original;
      choice(1, section, "listening", clip.title, undefined, question, id);
    });
  });
  const phoneId = d.id + "-A14";
  audio.push({
    id: phoneId,
    title: "Telefonnotiz",
    script: d.phone.script,
    offset: 1360,
  });
  choice(
    1,
    "Hören und Schreiben",
    "listening",
    "Den Anlass erkennen",
    undefined,
    d.phone.reason,
    phoneId,
  );
  add({
    block: 1,
    section: "Hören und Schreiben",
    skill: "writing",
    title: "Eine Telefonnotiz weitergeben",
    prompt:
      "Notieren Sie Name, Kontakt, vier wichtige Informationen und die gewünschte Handlung. Schreiben Sie so, dass eine Kollegin ohne Rückfrage weiterarbeiten kann.",
    kind: "writing",
    audioId: phoneId,
    halfPoints: 12,
    rubric: [
      "Name · 0,5 Punkte",
      "Kontakt · 0,5 Punkte",
      "Information vollständig und richtig · ein gemeinsamer Aspekt, 4 oder 0 Punkte",
      "Gewünschte Handlung · 1 Punkt",
    ],
    rationale: d.phone.key.join(" | "),
  });
  d.gaps1.forEach((gap, i) =>
    choice(
      2,
      "Sprachbausteine 1",
      "writing",
      "Wörter im Zusammenhang",
      d.gapText1,
      {
        prompt: "Wählen Sie das Wort für Lücke " + (i + 1) + ".",
        options: d.wordBank,
        answer: d.wordBank.indexOf(gap.answer),
        why: gap.why,
      },
    ),
  );
  d.gaps2.forEach((gap, i) =>
    choice(
      2,
      "Sprachbausteine 2",
      "writing",
      "Präzise Verknüpfungen",
      d.gapText2,
      {
        prompt: "Wählen Sie die Ergänzung für Lücke " + (i + 1) + ".",
        options: gap.options,
        answer: gap.answer,
        why: gap.why,
      },
    ),
  );
  add({
    block: 2,
    section: "Schreiben",
    skill: "writing",
    title: "Stellungnahme an die Geschäftsleitung",
    stimulus: d.statement
      .map((s, i) => "Thema " + (i + 1) + ": " + s)
      .join("\n\n"),
    prompt:
      "Wählen Sie eines der beiden Themen. Begründen Sie Ihre Position, wägen Sie Vor- und Nachteile ab und machen Sie einen umsetzbaren Vorschlag.",
    kind: "writing",
    halfPoints: 28,
    rationale:
      "Eine klare Position, abgewogene Gründe und ein konkreter Vorschlag erfüllen die kommunikative Aufgabe.",
    rubric: [
      "Aufgabenbewältigung der Stellungnahme",
      "Organisation, Korrektheit und Spektrum: einmal über Kundenbrief und Stellungnahme zusammen",
    ],
  });
  const oral = [
    ["Sprechen 1A", "Ein berufliches Thema darstellen", d.speaking.topic, 10],
    ["Sprechen 1B", "Nachfragen beantworten", d.speaking.followup, 10],
    ["Sprechen 1C", "Eine Aussage vermitteln", d.speaking.partner, 4],
    [
      "Sprechen 2",
      "Ein informelles Gespräch führen",
      d.speaking.conversation,
      16,
    ],
    ["Sprechen 3", "Gemeinsam ein Problem lösen", d.speaking.problem, 20],
  ] as const;
  for (const [section, title, prompt, halfPoints] of oral)
    add({
      block: 3,
      section,
      skill: "speaking",
      title,
      prompt,
      kind: "speaking",
      halfPoints,
      rationale:
        "Reagieren Sie auf den Gesprächspartner und entwickeln Sie das Gespräch weiter. Gesamte Audioleistung für Aussprache, Korrektheit und Spektrum erforderlich.",
      rubric: [
        "Kommunikative Aufgabenbewältigung",
        "Aussprache und Intonation",
        "Formale Richtigkeit",
        "Spektrum sprachlicher Mittel",
      ],
    });
  return mockSchema.parse({
    id: d.id,
    version: 1,
    title: d.title,
    description: d.description,
    reserved: d.id === "MOCK-03",
    quality: "authored-awaiting-independent-review",
    tasks,
    audio,
  });
}
