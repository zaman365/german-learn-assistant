import { authorLesson } from "./authoring";
export const themeLesson = authorLesson({
  id: "X-08-L02",
  stage: "exam",
  title: "Prepare all twelve public speaking themes",
  de: "Themen flexibel entwickeln und auf Rückfragen reagieren",
  minutes: 20,
  objectives: [
    "Develop a specific example for any public speaking theme.",
    "Respond to an unprepared objection and preserve a partner's condition.",
  ],
  skills: ["speaking", "interaction", "mediation"],
  references: ["speaking-themes", "conversation", "mediation"],
  vocabulary: [
    "ausbildung",
    "fuhrungskraft",
    "kundenbindung",
    "reichweite",
    "selbststandigkeit",
    "einwand",
  ],
  explanation:
    "The internal speaking-themes reference contains twelve complete preparation routes: career decision, training, service, manufacturing, leadership, business idea, self-employment, company success, customer loyalty, work app, advertising and social media. Start with a concrete case, then develop two connected points and a qualification. Practise the same topic from a contrasting perspective on another day. Knowing public themes is expected preparation; seeing the exact scenario of the reserved mock is a separate exposure. Do not memorize a universal opening that delays your answer to the actual question. For a follow-up, give your answer first, then explain the reason. English clarification remains available in the reference.",
  example: [
    "Ich würde die App zunächst in beiden Schichten testen. Entscheidend wäre für mich, ob offene Aufgaben anschließend seltener verloren gehen.",
    "I would first test the app in both shifts. My key criterion would be whether fewer open tasks are subsequently missed.",
  ],
  steps: [
    { label: "Context", detail: "Eine konkrete berufliche Situation nennen" },
    { label: "Develop", detail: "Zwei Punkte mit Beispielen begründen" },
    { label: "Qualify", detail: "Grenze oder Gegenargument berücksichtigen" },
    { label: "Respond", detail: "Rückfrage direkt beantworten" },
  ],
  reading: {
    title: "Eine Partnerin ergänzt einen Einwand",
    body: "Unsere gemeinsame Aufgabenliste ist häufig nicht aktuell. Ich fände eine App hilfreich, sofern die Spätschicht genauso darauf zugreifen kann wie die Frühschicht. Sonst hätten wir am Ende eine digitale und eine handschriftliche Liste. Bei einer Einführung sollten wir deshalb zuerst die Zugänge prüfen. Danach könnten wir zwei Wochen lang beobachten, welche Aufgaben bei der Übergabe offenbleiben. Ich würde noch nicht versprechen, dass die App die Bearbeitungszeit verkürzt. Dafür fehlen uns Vergleichsdaten.",
  },
  tip: "Open the internal theme reference before choosing your topic. Close it for the independent recording. Work on a different public theme next time; the reference includes two different follow-up angles for each one.",
  checks: [
    {
      prompt: "What condition does the partner place on the app?",
      options: [
        "Equal access for both shifts",
        "An immediate guaranteed time saving",
        "A separate paper list for each team",
      ],
      answer: "Equal access for both shifts",
      why: "Her support is conditional on both shifts being able to use the same list.",
      skill: "mediation",
    },
    {
      prompt: "Which claim is still unverified?",
      answer: "Shorter processing time",
      options: [
        "Shorter processing time",
        "There are two shifts",
        "The list is often outdated",
      ],
      why: "She explicitly says comparative data are missing.",
      skill: "reading",
    },
    {
      prompt:
        "Complete the condition: Ich wäre dafür, ___ beide Schichten Zugang erhalten.",
      answer: ["wenn", "sofern", "falls"],
      why: "All three can introduce the required condition here.",
      skill: "connectors",
      tag: "CONN",
    },
  ],
  task: {
    type: "speaking",
    skill: "speaking",
    prompt:
      "Choose one of the twelve public themes from the internal reference. Record a two-minute presentation using a specific professional example and a limitation. Then answer, without a script: What objection would make you change your proposal? Finally explain the supplied partner's position, preserving her access condition and uncertainty about time savings. Identify your chosen theme at the start.",
    rubric: [
      "The chosen theme is developed through a concrete example, two connected points and a qualified conclusion.",
      "The follow-up receives a direct responsive answer, rather than a repetition of the presentation.",
      "Partner explanation preserves the access condition and absence of comparative timing evidence.",
      "Speech is intelligible, organized and sufficiently varied for the task; audio evidence is required.",
    ],
  },
  reflection:
    "Which follow-up changed what you wanted to say, and did your partner explanation retain the condition?",
});
