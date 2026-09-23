import { listen } from "./listening";
import { authorLesson } from "./authoring";
import type { AudioScript } from "./audio";

export const checkpointAudio: AudioScript[] = [
  {
    id: "audio-bridge-checkpoint-01",
    version: 1,
    title: "A workshop changes rooms",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Guten Morgen, hier ist Nora Sommer aus der Fortbildung. Unser Workshop am Mittwoch beginnt wie geplant um neun Uhr. Geändert hat sich nur der Raum: Wir treffen uns in Raum 214, nicht in 204. Der Aufzug ist wegen Wartungsarbeiten bis zehn Uhr außer Betrieb. Wer einen stufenlosen Zugang benötigt, meldet sich bitte heute bis 15 Uhr bei mir; wir organisieren dann einen geeigneten Raum im Erdgeschoss. Die Teilnahme ist weiterhin kostenlos. Bringen Sie bitte einen eigenen Laptop mit. Falls Sie keinen mitbringen können, reservieren Sie spätestens morgen eines unserer vier Leihgeräte. Die Unterlagen erhalten Sie nach dem Workshop per E-Mail, nicht vorher. Die Übungsphase endet um halb zwölf, danach ist noch eine halbe Stunde für Fragen vorgesehen. Die Teilnahmebescheinigung wird nur ausgestellt, wenn Sie auch an der Übungsphase teilnehmen. Bei Fragen erreichen Sie mich unter der Durchwahl 427. Vielen Dank.",
  },
  {
    id: "audio-c1-checkpoint-01",
    version: 1,
    title: "What a service pilot can establish",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Bevor wir über eine Ausweitung entscheiden, möchte ich die Ergebnisse unseres Pilotprojekts einordnen. In den sechs Wochen gingen 480 Anfragen ein. Davon konnten 360 ohne Rückfrage abgeschlossen werden. Das entspricht drei Vierteln, allerdings nicht automatisch einer Verbesserung: Im Vergleichszeitraum waren die Fälle anders zusammengesetzt. Eine Gruppe hatte deutlich mehr komplexe Anliegen. Außerdem begann während des Piloten eine zusätzliche Kollegin, die anfangs begleitet werden musste. Die häufig genannte Zeitersparnis lässt sich deshalb bisher nicht zuverlässig beziffern. Dass die meisten Beschäftigten das Verfahren als übersichtlicher erleben, ist erfreulich, beruht aber auf freiwilligen Rückmeldungen von nur elf Personen. Wir sollten diese Einschätzung ernst nehmen, ohne sie dem ganzen Team zuzuschreiben. Ich empfehle für die nächsten vier Wochen eine getrennte Erfassung einfacher und komplexer Fälle. Die Namen der bearbeitenden Personen brauchen wir für diese Auswertung nicht; es geht um den Ablauf, nicht um individuelle Ranglisten. Frau Bender hat zugesagt, die Erfassungsmaske bis Dienstag vorzubereiten. Die Teamleitungen prüfen sie am Mittwoch. Der neue Abschnitt darf erst beginnen, wenn die Datenschutzbeauftragte zugestimmt hat. Eine Ausweitung auf die Außenstelle ist damit ausdrücklich noch nicht beschlossen. Im nächsten Bericht sollten wir zudem dokumentieren, wie oft Fälle erneut geöffnet werden. Eine schnelle erste Antwort hilft wenig, wenn danach vermeidbare Nacharbeit entsteht.",
  },
];
const bridge = listen(
  "B2-12-L04",
  "B2-12",
  "Check bridge listening from actual sound",
  "audio-bridge-checkpoint-01",
  [
    {
      q: "On which weekday is the workshop?",
      a: "Mittwoch",
      why: "The message says Mittwoch.",
    },
    {
      q: "Write the start time as H:MM.",
      a: "9:00",
      why: "The start remains nine o'clock.",
    },
    {
      q: "Write the final room number.",
      a: "214",
      why: "214 corrects the earlier 204.",
    },
    {
      q: "Until what time is the lift unavailable? Use H:MM.",
      a: "10:00",
      why: "Maintenance lasts until ten.",
    },
    {
      q: "When should someone needing step-free access contact Nora?",
      a: "heute bis 15 Uhr",
      why: "The request is due today by 15 Uhr.",
    },
    {
      q: "Is the workshop still free?",
      a: "Yes",
      options: ["Yes", "No"],
      why: "Participation remains kostenlos.",
    },
    {
      q: "How many loan laptops are available?",
      a: "4",
      why: "Four loan devices are offered.",
    },
    {
      q: "Are the materials sent before the workshop?",
      a: "No",
      options: ["Yes", "No"],
      why: "They arrive after the workshop.",
    },
    {
      q: "Write the end of the exercise phase as H:MM.",
      a: "11:30",
      why: "Halb zwölf means 11:30, followed by thirty minutes of questions.",
    },
    { q: "Write Nora's extension.", a: "427", why: "The extension is 427." },
  ],
);
bridge.stage = "bridge";
bridge.objectives.push(
  "Bridge coaching target: seven of ten, with sound evidence kept separate from reading.",
);
const c1 = listen(
  "C1-18-L04",
  "C1-18",
  "Check C1 listening with qualifications",
  "audio-c1-checkpoint-01",
  [
    {
      q: "How many inquiries arrived during the pilot?",
      a: "480",
      why: "The speaker reports 480 inquiries.",
    },
    {
      q: "How many were completed without a follow-up question?",
      a: "360",
      why: "360 of 480 were completed without a query.",
    },
    {
      q: "Does that ratio by itself prove improvement?",
      a: "No",
      options: ["Yes", "No"],
      why: "Case composition differed between periods.",
    },
    {
      q: "How many people gave voluntary feedback?",
      a: "11",
      why: "Only eleven people supplied the cited impressions.",
    },
    {
      q: "How many more weeks of separate case recording are recommended?",
      a: "4",
      why: "The recommendation covers four further weeks.",
    },
    {
      q: "Are individual employee rankings the purpose?",
      a: "No",
      options: ["Yes", "No"],
      why: "The speaker excludes individual rankings and names from this analysis.",
    },
    {
      q: "Who prepares the entry form? Write the surname.",
      a: "Bender",
      why: "Frau Bender has accepted that responsibility.",
    },
    {
      q: "Has expansion to the branch office been decided?",
      a: "No",
      options: ["Yes", "No"],
      why: "The speaker explicitly denies that a decision has been made.",
    },
    {
      q: "Complete from the recording: Erfassen, wie oft Fälle erneut ___ werden.",
      a: "geöffnet",
      why: "Reopened cases indicate follow-up work concealed by a quick first response.",
    },
  ],
);
c1.objectives.push(
  "C1 comprehension coaching target: six of nine, without treating this as a whole-level verdict.",
);
const reading = authorLesson({
  id: "C1-18-L03",
  stage: "c1",
  minutes: 30,
  title: "Check the limits of a written proposal",
  de: "C1-Lesecheck: Spielräume und Vorbehalte",
  objectives: [
    "Separate a proposed policy, conditions and current obligations.",
    "Reach six of nine comprehension checks before choosing targeted repairs.",
  ],
  skills: ["reading"],
  references: ["comprehension", "clauses", "mediation"],
  vocabulary: ["antrag", "frist", "ergebnis", "ergebnis"],
  explanation:
    "This unfamiliar proposal tests how carefully you preserve status and scope. Read once for its purpose, then verify conditions. The C1 coaching target is at least two thirds of the nine checks. Do not interpret a pilot permission as a permanent entitlement. After answering, explain why the most tempting wrong inference is unsupported. Complete the separate written-position, listening and voice components; this reading result cannot replace them.",
  example: [
    "Die Zustimmung zum Versuch nimmt die Entscheidung über die dauerhafte Regelung nicht vorweg.",
    "Approval for the trial does not prejudge the decision about a permanent arrangement.",
  ],
  steps: [
    { label: "Status", detail: "Draft, permission or binding rule?" },
    { label: "Scope", detail: "Who and what is covered?" },
    { label: "Limits", detail: "Which conditions remain unresolved?" },
  ],
  reading: {
    title: "A draft for shared working spaces",
    body: "Die folgende Regelung ist ein Entwurf für einen dreimonatigen Versuch in der Verwaltung. Sie betrifft weder die Werkstatt noch Arbeitsplätze mit besonderer technischer Ausstattung. Ziel ist, ungenutzte Schreibtische leichter verfügbar zu machen, ohne Beschäftigte mit anerkanntem individuellem Bedarf zu benachteiligen. Für sie wird vor Beginn gemeinsam mit der zuständigen Stelle eine geeignete Lösung festgelegt. Eine allgemeine Pflicht zum täglichen Platzwechsel ist nicht vorgesehen.\n\nFreie Plätze sollen bis zu fünf Arbeitstage im Voraus gebucht werden können. Wer eine Buchung nicht nutzt, gibt sie möglichst früh, spätestens jedoch bis neun Uhr am betreffenden Tag frei. Bei unvorhersehbarer Abwesenheit kann die Teamassistenz die Freigabe übernehmen. Eine fehlende Freigabe führt im Versuch nicht automatisch zu einer Sanktion; wiederholte Schwierigkeiten sollen zunächst auf ihre Ursachen geprüft werden.\n\nDie Arbeitsgruppe schlägt vor, die Auslastung ausschließlich in zusammengefasster Form auszuwerten. Individuelle Bewegungsprofile sollen nicht erstellt werden. Die technische Umsetzung dieser Begrenzung ist noch nicht bestätigt. Ohne diese Bestätigung darf der Versuch nicht starten, auch wenn die Räume bereits vorbereitet sind. Die Beschäftigtenvertretung hat dem Ziel zugestimmt, über den konkreten Entwurf aber noch nicht abschließend beraten.\n\nNach sechs Wochen ist eine Zwischenbesprechung vorgesehen. Die Zahl belegter Plätze wird dabei nicht allein als Erfolg gewertet. Ebenso wichtig sind die Suche nach geeigneten Plätzen, störungsfreies Arbeiten und der Aufwand für Buchungen. Rückmeldungen können anonym über ein Formular oder vertraulich bei der zuständigen Ansprechperson abgegeben werden. Ein positiver Zwischenstand erlaubt keine automatische Ausweitung. Erst nach dem Abschlussbericht entscheiden Leitung und zuständige Gremien über das weitere Vorgehen. Bis dahin gelten außerhalb des Versuchs die bisherigen Regelungen.",
  },
  tip: "Mark a statement as fact, proposal, condition or future decision. Check whether a restriction applies to all employees or only a defined group. Use the comprehension reference if needed after your first submission; assisted checks stay practice evidence.",
  checks: [
    {
      prompt: "How many months is the proposed trial?",
      answer: "3",
      why: "The proposal specifies three months.",
    },
    {
      prompt: "Does the trial include the workshop?",
      answer: "No",
      options: ["Yes", "No"],
      why: "The workshop is explicitly excluded.",
    },
    {
      prompt: "Is daily desk-changing compulsory?",
      answer: "No",
      options: ["Yes", "No"],
      why: "No general daily switching requirement is proposed.",
    },
    {
      prompt: "How many working days ahead may a desk be booked?",
      answer: "5",
      why: "Bookings are proposed up to five working days ahead.",
    },
    {
      prompt: "Write the latest same-day cancellation time as H:MM.",
      answer: "9:00",
      why: "The deadline is nine on that day.",
    },
    {
      prompt: "Does one missed cancellation automatically trigger a sanction?",
      answer: "No",
      options: ["Yes", "No"],
      why: "The trial first investigates causes of repeated difficulties.",
    },
    {
      prompt:
        "Can the trial start before the data limitation is technically confirmed?",
      answer: "No",
      options: ["Yes", "No"],
      why: "Technical confirmation is a condition even if rooms are ready.",
    },
    {
      prompt: "After how many weeks is the interim discussion?",
      answer: "6",
      why: "The interim review is after six weeks.",
    },
    {
      prompt:
        "Does a positive interim result authorize expansion automatically?",
      answer: "No",
      options: ["Yes", "No"],
      why: "Further decisions follow the final report.",
    },
  ],
  task: {
    skill: "reading",
    prompt:
      "A manager writes: 'The rooms are ready and staff representatives support the goal, so we can start tomorrow and expand after six weeks.' Reply in 120–150 words, identifying the two unjustified decisions and the necessary evidence. Preserve the distinction between support for a goal and approval of this draft.",
    rubric: [
      "Identifies the unconfirmed technical prerequisite.",
      "Separates agreement on the goal from the unresolved draft decision.",
      "Rejects automatic expansion based on an interim result.",
      "Gives a concise evidence-based explanation without adding legal claims.",
    ],
  },
  reflection:
    "Which separate conditions would your first reading have collapsed into one approval?",
});
export const comprehensionCheckpoints = [bridge, c1, reading];
