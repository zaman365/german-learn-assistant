import { authorLesson } from "./authoring";
import { lessonSchema } from "../src/content/types";

const bridgeGrammar = authorLesson({
  id: "B2-12-L02",
  stage: "bridge",
  minutes: 35,
  title: "Check the foundations across twenty decisions",
  de: "Brückencheck: Formen und eine Kundenantwort",
  objectives: [
    "Check twenty distinct grammar decisions without hints.",
    "Write a usable customer email while preserving uncertainty.",
  ],
  skills: ["grammar", "writing"],
  references: [
    "articles",
    "verbs",
    "connectors",
    "email",
    "negation",
    "quantifiers",
  ],
  vocabulary: ["vertrag", "kunde", "frist", "angebot"],
  explanation:
    "This checkpoint samples the bridge rather than certifying a level. First answer twenty form questions without opening hints or references. The coaching target is sixteen correct. Then write the original email. A grammar total cannot supply missing reading, listening or speaking evidence: take the companion checkpoints separately. If a target is missed, use its linked reference and practise a fresh example on a later day. A second attempt at these same items is practice, not an unseen retest. For the email, organize the known facts, the next action and a realistic deadline before selecting forms.",
  example: [
    "Wir prüfen den Vorgang und melden uns spätestens am Freitag.",
    "We are checking the case and will respond by Friday at the latest.",
  ],
  steps: [
    { label: "Recall", detail: "Twenty decisions, without help" },
    { label: "Communicate", detail: "Write from the new facts" },
    { label: "Review", detail: "Locate gaps by skill, not total alone" },
  ],
  reading: {
    title: "Facts for your customer reply",
    body: "Frau Seidel hat zwölf Leuchten bestellt. Zehn sind angekommen; zwei fehlen. Der Versand prüft, ob die fehlenden Leuchten getrennt verschickt wurden. Das Ergebnis liegt noch nicht vor. Sie dürfen eine Rückmeldung bis Freitag, 14 Uhr, zusagen, aber noch keinen Liefertermin. Die Kundin braucht alle Leuchten für eine Veranstaltung am Montag. Für die Suche fehlt die Bestellnummer. Eine Erstattung ist nicht freigegeben.",
  },
  tip: "After submitting, classify each miss as gender, case, verb position, verb form, government or meaning. In the email, acknowledge the consequence without inventing a solution. Use the separate speaking and comprehension checks before deciding what to practise next.",
  checks: [
    {
      prompt:
        "Complete: Wir sprechen mit ___ Kundin. Use the definite article.",
      answer: "der",
      why: "Mit governs dative; Kundin is feminine.",
      skill: "case",
      tag: "CASE",
    },
    {
      prompt: "Write the dictionary article of Angebot.",
      answer: "das",
      why: "The noun package is das Angebot, die Angebote.",
      skill: "gender",
      tag: "GEN",
    },
    {
      prompt: "Complete: Wir helfen dem ___ (Kollege).",
      answer: "Kollegen",
      why: "Kollege is a weak masculine noun and adds -n outside nominative singular.",
      skill: "noun-endings",
      tag: "NOUN",
    },
    {
      prompt: "Complete: trotz des ___ Termins (kurz).",
      answer: "kurzen",
      why: "After des in genitive masculine the adjective ends in -en.",
      skill: "adjective-endings",
      tag: "ADJ",
    },
    {
      prompt: "Complete: Das Paket, ___ gestern ankam, ist beschädigt.",
      answer: "das",
      why: "The relative pronoun refers to neuter Paket and is subject of ankam.",
      skill: "case",
      tag: "CASE",
    },
    {
      prompt:
        "Order the clause beginning with weil: wir / mehr Zeit / brauchen.",
      answer: "weil wir mehr Zeit brauchen",
      why: "The finite verb comes last in the subordinate clause.",
      skill: "word-order",
      tag: "VPOS",
    },
    {
      prompt: "Complete: Morgen ___ ich Sie an. Use rufen.",
      answer: "rufe",
      why: "Rufe is second; the separable prefix an is at the end.",
      skill: "verb-forms",
      tag: "VFORM",
    },
    {
      prompt: "Complete: Wir haben den Antrag ___. Use prüfen.",
      answer: "geprüft",
      why: "The regular participle is geprüft.",
      skill: "verb-forms",
      tag: "VFORM",
    },
    {
      prompt:
        "Complete: Die Daten ___ gestern geprüft. Use werden in Präteritum.",
      answer: "wurden",
      why: "Plural passive in Präteritum uses wurden plus participle.",
      skill: "verb-forms",
      tag: "VFORM",
    },
    {
      prompt: "Complete politely: ___ Sie mir die Nummer nennen? Use können.",
      answer: "Könnten",
      why: "Konjunktiv II makes this request less direct.",
      skill: "verb-forms",
      tag: "VFORM",
    },
    {
      prompt: "Complete: Wir warten ___ die Bestätigung.",
      answer: "auf",
      why: "Warten auf selects accusative for the thing awaited.",
      skill: "prepositions",
      tag: "PREP",
    },
    {
      prompt: "Complete: Wir interessieren uns ___ das Angebot.",
      answer: "für",
      why: "Sich interessieren für takes accusative.",
      skill: "prepositions",
      tag: "PREP",
    },
    {
      prompt: "Complete: Ich bitte Sie, die Nummer ___. Use angeben with zu.",
      answer: "anzugeben",
      why: "For separable angeben, zu goes between prefix and stem: anzugeben.",
      skill: "verb-forms",
      tag: "VFORM",
    },
    {
      prompt:
        "Complete: Es regnet; ___ findet die Veranstaltung statt. Express contrast.",
      answer: "trotzdem",
      why: "Trotzdem introduces the unexpected result, followed by verb then subject.",
      skill: "connectors",
      tag: "CONN",
    },
    {
      prompt:
        "Complete: Wir haben ___ verbindlichen Liefertermin. Negate an indefinite noun phrase.",
      answer: "keinen",
      why: "Kein negates the indefinite object; masculine accusative is keinen.",
      skill: "case",
      tag: "CASE",
    },
    {
      prompt:
        "Complete: Ich gebe ___ die Nummer. Replace der Kundin with a pronoun.",
      answer: "ihr",
      why: "The recipient is dative: ihr.",
      skill: "case",
      tag: "CASE",
    },
    {
      prompt: "Complete: Beide ___ sind vollständig. Use Lieferung in plural.",
      answer: "Lieferungen",
      why: "Die Lieferung has regular plural Lieferungen.",
      skill: "noun-endings",
      tag: "NOUN",
    },
    {
      prompt:
        "Complete: Je früher die Nummer vorliegt, ___ schneller finden wir den Vorgang.",
      answer: ["desto", "umso"],
      why: "Je pairs with desto or umso to express proportional comparison.",
      skill: "connectors",
      tag: "CONN",
    },
    {
      prompt:
        "Complete: Die Prüfung dauert länger, ___ Unterlagen fehlen. Express a reason.",
      answer: "weil",
      why: "Weil introduces a reason with final finite verb fehlen.",
      skill: "connectors",
      tag: "CONN",
    },
    {
      prompt:
        "Complete: Wir melden uns ___ Freitag, 14 Uhr. Give the latest deadline.",
      answer: "bis",
      why: "Bis gives the latest time; um alone would specify an exact appointment.",
      skill: "prepositions",
      tag: "PREP",
      exit: true,
    },
  ],
  task: {
    prompt:
      "Write Frau Seidel a 130–160-word email. Acknowledge the missing quantity and Monday's event, distinguish the investigation from a confirmed result, request the missing number and state the authorized next action and deadline. Do not guarantee a shipment or refund.",
    rubric: [
      "Preserves quantities, need and deadline.",
      "Separates investigation from certainty and makes only the authorized promise.",
      "Uses a suitable greeting, clear paragraphs and courteous request.",
      "Controls cases, verb position and linking sufficiently for an unambiguous message.",
    ],
  },
  reflection:
    "Which form needs repair, and which other checkpoint still lacks evidence?",
});
const readingSource =
  "Ab dem 3. November testet das Unternehmen einen neuen Ablauf für Raumreservierungen. Der Versuch dauert sechs Wochen und betrifft nur die Räume im zweiten Stock. Bereits bestätigte Buchungen bleiben gültig; sie werden von der Verwaltung übertragen. Neue Reservierungen müssen mindestens zwei Arbeitstage vor dem Termin eingereicht werden. Bei kurzfristigen Kundengesprächen darf die Teamleitung eine Ausnahme beantragen. Eine Ausnahme ist erst wirksam, wenn die Verwaltung sie ausdrücklich bestätigt. Beschäftigte sehen im Kalender die belegten Zeiten, aber keine Namen externer Gäste. Wer einen Raum doch nicht braucht, storniert die Buchung spätestens am Vortag. Die Verwaltung dokumentiert wöchentlich, wie viele Räume trotz Buchung leer bleiben. Die Zahl der Besprechungen allein sagt dagegen nichts über die sinnvolle Nutzung aus. Während des Versuchs gibt es weiterhin telefonische Hilfe; eine telefonische Anfrage ersetzt allerdings keine Bestätigung. Nach drei Wochen werden erste Schwierigkeiten gesammelt. Erst nach dem Abschlussbericht entscheidet die Leitung über eine dauerhafte Einführung. Ein zweiter Test in der Außenstelle ist lediglich vorgeschlagen. Die Beschäftigtenvertretung hat um eine genaue Beschreibung der gespeicherten Daten gebeten. Die Verwaltung erstellt diese Beschreibung vor dem Start. Persönliche Leistungsdaten sollen nicht erhoben werden. Sollte ein Raum wegen technischer Probleme ausfallen, informiert die Verwaltung die buchende Person und schlägt eine Alternative vor. Ein automatischer Anspruch auf einen größeren Raum entsteht dadurch nicht. Für Fragen zur Barrierefreiheit steht Frau Renner zur Verfügung. Sie prüft den individuellen Bedarf gemeinsam mit den Betroffenen; vertrauliche Angaben gehören nicht in den allgemein sichtbaren Kalender. Die Auswertung soll zwischen vermeidbaren Leerständen und Ausfällen durch technische Störungen unterscheiden. Nur so lässt sich beurteilen, ob die neue Stornierungsregel hilft.";
const readingChecks = [
  {
    prompt: "How many weeks does the trial last? Write digits.",
    answer: "6",
    why: "The trial runs for six weeks.",
  },
  {
    prompt: "Which floor is included? Write the number.",
    answer: "2",
    why: "Only rooms on the second floor participate.",
  },
  {
    prompt: "Must an existing confirmed booking be submitted again?",
    answer: "No",
    options: ["Yes", "No"],
    why: "The administration transfers existing confirmed bookings.",
  },
  {
    prompt: "How many working days in advance is a regular request due?",
    answer: "2",
    why: "The normal lead time is at least two working days.",
  },
  {
    prompt: "Who confirms an exception? Use the German department name.",
    answer: "Verwaltung",
    why: "A team lead may request an exception; the administration confirms it.",
  },
  {
    prompt: "Does the public calendar show external guests' names?",
    answer: "No",
    options: ["Yes", "No"],
    why: "Only occupied times are visible.",
  },
  {
    prompt: "Complete from the source: Storniert wird spätestens am ___.",
    answer: "Vortag",
    why: "Cancellation is due the day before.",
  },
  {
    prompt: "Is permanent introduction already decided?",
    answer: "No",
    options: ["Yes", "No"],
    why: "The decision follows the final report.",
  },
  {
    prompt: "Write the surname of the accessibility contact.",
    answer: "Renner",
    why: "Frau Renner handles accessibility questions.",
  },
  {
    prompt: "Does a technical outage guarantee a larger room?",
    answer: "No",
    options: ["Yes", "No"],
    why: "An alternative is proposed, but there is no automatic entitlement to a larger room.",
  },
];
const reading = authorLesson({
  id: "B2-12-L03",
  stage: "bridge",
  minutes: 25,
  title: "Check unfamiliar reading separately",
  de: "Brückencheck: Bedingungen genau lesen",
  objectives: [
    "Retrieve details and distinguish a request from approval.",
    "Explain two exceptions without adding workplace assumptions.",
  ],
  skills: ["reading"],
  references: ["comprehension", "mediation"],
  vocabulary: ["termin", "antrag", "frist", "mitarbeiter"],
  explanation:
    "Use this new notice without a dictionary or hints on the first attempt. Read for purpose, then locate the evidence for each answer. The bridge coaching target is seven of ten. This result covers this source only: it does not demonstrate listening or retention. After feedback, label a miss as an overlooked condition, unsupported inference or unknown expression. The companion listening check uses a different situation.",
  example: [
    "Eine Ausnahme kann beantragt werden. Das bedeutet noch nicht, dass sie genehmigt ist.",
    "An exception may be requested. That does not yet mean it has been approved.",
  ],
  steps: [
    { label: "Purpose", detail: "Find scope and audience" },
    {
      label: "Conditions",
      detail: "Distinguish request, confirmation and decision",
    },
    { label: "Evidence", detail: "Verify every answer in the notice" },
  ],
  reading: { title: "A limited reservation trial", body: readingSource },
  tip: "Do not open this source before your intended first check. After submission, paraphrase the clause that changed your answer. Repeating the same source is supported practice, not fresh assessment.",
  checks: readingChecks,
  task: {
    skill: "reading",
    prompt:
      "A colleague says: 'My manager requested the exception, so I can use any larger room now.' Explain in 80–100 words which two claims lack support and what needs to happen next. Use the notice, not rules from your own workplace.",
    rubric: [
      "Separates request from explicit confirmation.",
      "Rejects an automatic claim to a larger room.",
      "Gives a usable next step grounded in the notice.",
    ],
  },
  reflection: "Which qualifier prevented a plausible but unsupported answer?",
});

function voiceCheckpoint(
  id: string,
  stage: "bridge" | "c1",
  title: string,
  scenario: string,
) {
  return authorLesson({
    id,
    stage,
    minutes: 20,
    title,
    de: "Sprechen, nachfragen, gemeinsam weiterkommen",
    objectives: [
      "Speak from new facts for three minutes.",
      "Respond to follow-ups and preserve conditions.",
    ],
    skills: ["speaking"],
    references: ["conversation", "numbers", "mediation"],
    vocabulary: ["projekt", "ergebnis", "empfehlen", "termin"],
    explanation:
      "Plan for at most two minutes using keywords, then record a three-minute contribution and the two follow-up responses in one take (maximum five minutes). Do not read a script. This is a structured individual checkpoint; the follow-ups are visible prompts, not a claim of spontaneous interaction with a live partner. Actual audio evaluation is needed for intelligibility and fluency. Typed answers can only receive text feedback. Use the exam partner later for reciprocal spoken turns.",
    example: [
      "Ich halte den Test für sinnvoll, sofern die Zuständigkeiten vorher geklärt werden.",
      "I consider the trial useful provided responsibilities are clarified first.",
    ],
    steps: [
      { label: "Position", detail: "State a recommendation" },
      { label: "Evidence", detail: "Preserve limits of the available facts" },
      {
        label: "Follow-up",
        detail: "Answer each objection with a concrete next step",
      },
    ],
    reading: { title: "Your new situation", body: scenario },
    tip: "A pause to organize a complex answer is normal. Repair an unclear phrase explicitly. Do not trade accuracy for speed. Re-recording this same task gives practice; it is not independent unseen evidence.",
    checks: [
      {
        prompt: "Can a typed transcript establish pronunciation?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Sound must be heard to assess pronunciation.",
      },
      {
        prompt: "Should an unconfirmed proposal be described as a decision?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Preserve the speaker's degree of commitment.",
      },
      {
        prompt:
          "Complete a conditional recommendation: Ich stimme zu, ___ die Zuständigkeit geklärt wird.",
        answer: ["wenn", "sofern", "falls"],
        why: "Each of these conjunctions introduces the condition.",
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record a three-minute recommendation based on the situation. Then answer: (1) Was tun Sie, wenn die verantwortliche Person kurzfristig ausfällt? (2) Woran erkennen Sie nach dem Test, ob sich die Änderung bewährt hat? Keep the complete recording under five minutes.",
      rubric: [
        "Gives a clear position and supported reasons without invented facts.",
        "Responds to both follow-ups with feasible actions and relevant evidence.",
        "Links ideas and qualifies certainty using suitable professional register.",
        "Actual recording shows intelligibility, rhythm and manageable hesitation; no pronunciation rating from text.",
      ],
    },
    reflection: "Which follow-up required a decision rather than repetition?",
  });
}
const bridgeVoice = voiceCheckpoint(
  "B2-12-L05",
  "bridge",
  "Check bridge speaking with follow-ups",
  "Ihr Team möchte Übergaben schriftlich festhalten. Bisher wird vieles mündlich weitergegeben. In der vergangenen Woche fehlte bei zwei von zwanzig Fällen eine Zuständigkeit. Ein zweiwöchiger Versuch mit einer kurzen Liste ist erlaubt. Für jeden Eintrag sind Fallnummer, nächste Aktion und verantwortliche Person vorgesehen. Ein zusätzlicher täglicher Termin ist nicht genehmigt. Eine Kollegin befürchtet Mehrarbeit. Empfehlen Sie einen Ablauf, der diese Sorge berücksichtigt, und nennen Sie Grenzen der verfügbaren Zahlen.",
);
const c1Voice = voiceCheckpoint(
  "C1-18-L05",
  "c1",
  "Check a C1 spoken recommendation",
  "Eine Abteilung schlägt vor, interne Beratungen teilweise online anzubieten. In einer freiwilligen Befragung antworteten 18 von 60 Beschäftigten; 14 davon wünschen Online-Termine. Für vertrauliche Anliegen steht bisher kein freigegebener Videodienst bereit. Die IT kann innerhalb von drei Wochen zwei Lösungen prüfen. Der Betriebsrat möchte wissen, wie Zugänglichkeit und Datenschutz gesichert werden. Die Leitung erlaubt einen begrenzten Test, sobald diese Fragen geklärt sind. Entwickeln Sie eine begründete Empfehlung, gehen Sie auf die Aussagekraft der Befragung ein und schlagen Sie faire Erfolgskriterien vor.",
);

const c2Diagnostic = authorLesson({
  id: "C2-00-L01",
  stage: "c2",
  minutes: 30,
  title: "Find your next stretch beyond C1",
  de: "C2-Einstieg: Schlussfolgerungen und Nuancen prüfen",
  objectives: [
    "Distinguish implication, reservation and evidence in a fresh source.",
    "Synthesize contrasting positions without overstating certainty.",
  ],
  skills: ["reading", "mediation"],
  references: ["editing", "mediation", "connectors"],
  vocabulary: ["ergebnis", "empfehlen", "projekt", "ergebnis"],
  explanation:
    "This fresh entry diagnostic selects useful extension work; it is not a C2 certificate. Read the two positions, answer the interpretation checks and write a synthesis. A high written result does not remove the need for complex listening and reciprocal speech. Use the C2 listening lesson when reviewed audio becomes available, and record an oral response to a counterargument. Nuance means preserving a speaker's reservation, not making every sentence longer.",
  example: [
    "Dass der Vorschlag Zustimmung findet, macht seine Voraussetzungen noch nicht entbehrlich.",
    "The fact that the proposal has support does not remove its prerequisites.",
  ],
  steps: [
    { label: "Separate", detail: "Position, premise and evidence" },
    { label: "Compare", detail: "Find an actual disagreement" },
    { label: "Qualify", detail: "Keep unresolved conditions visible" },
  ],
  reading: {
    title: "Two views on sharing expertise",
    body: "Position A: Eine gemeinsame Wissenssammlung könnte Doppelarbeit vermeiden. Allerdings wäre wenig gewonnen, wenn veraltete Hinweise nur leichter zu finden wären. Ich unterstütze den Aufbau unter der Voraussetzung, dass jede Seite eine fachlich verantwortliche Person und einen Prüftermin erhält. Die Zahl der Aufrufe wäre allenfalls ein Hinweis auf Interesse, kein Nachweis für bessere Entscheidungen. Position B: Verantwortung ist notwendig, aber eine perfekte Freigabekette kann den Nutzen ebenfalls zunichtemachen. Wenn jede kleine Ergänzung wochenlang wartet, tauschen die Teams ihr Wissen wieder außerhalb des Systems aus. Wir sollten deshalb zwischen verbindlichen Anweisungen und deutlich gekennzeichneten Erfahrungsberichten unterscheiden. Für Letztere könnte eine nachträgliche Prüfung genügen. Ob das praktikabel ist, sollten zwei Teams zunächst anhand konkreter Fälle erproben. Beide Positionen beziehen sich auf einen Vorschlag; beschlossen ist bislang weder die Plattform noch das Prüfverfahren.",
  },
  tip: "Name the shared concern before describing the disagreement. Do not equate rejecting one measure with rejecting the whole project. After feedback, choose the source-synthesis or register lesson according to the actual weakness; sound remains a separate evidence gap.",
  checks: [
    {
      prompt: "Does A reject a shared collection outright?",
      answer: "No",
      options: ["Yes", "No"],
      why: "A supports it conditionally, with ownership and review dates.",
    },
    {
      prompt: "Does B propose that binding instructions need no review?",
      answer: "No",
      options: ["Yes", "No"],
      why: "B distinguishes binding instructions from marked experience reports.",
    },
    {
      prompt:
        "Complete: Aufrufzahlen belegen Interesse, aber nicht automatisch bessere ___.",
      answer: "Entscheidungen",
      why: "A explicitly limits what viewing statistics demonstrate.",
    },
    {
      prompt: "Is the platform already selected?",
      answer: "No",
      options: ["Yes", "No"],
      why: "The source says neither platform nor procedure has been decided.",
    },
  ],
  task: {
    skill: "mediation",
    prompt:
      "Write a 180–220-word synthesis for the project lead. Show the shared goal, the genuine disagreement about review, an original workable compromise and a limitation of the proposed success measure. Clearly distinguish your proposal from source claims.",
    rubric: [
      "Represents both conditional positions fairly.",
      "Identifies the review tradeoff without inventing an absolute disagreement.",
      "Marks an original compromise and evaluation limits explicitly.",
      "Uses precise cohesive German and controlled reformulation.",
    ],
  },
  reflection:
    "Which implication did you infer, and which source words support it?",
});
export const checkpointLessons = [
  bridgeGrammar,
  reading,
  bridgeVoice,
  c1Voice,
  lessonSchema.parse(c2Diagnostic),
];
