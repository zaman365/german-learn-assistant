import { authorLesson, type LessonDraft } from "./authoring";
const writing = [
  "Responds to the exact communicative task without inventing facts.",
  "Selects and organizes relevant information clearly.",
  "Uses accurate and varied German with an appropriate register.",
  "Makes uncertainty, responsibility and the next step explicit.",
];
const base = {
  stage: "exam" as const,
  minutes: 25,
  references: ["comprehension", "email", "editing"],
  vocabulary: ["ruckmeldung", "zustandigkeit", "entscheidung", "vorschlag"],
};
const drafts: LessonDraft[] = [
  {
    ...base,
    id: "X-01-L01",
    title: "Plan your exam route",
    de: "Vier Fertigkeiten, drei schriftliche Blöcke",
    objectives: [
      "Separate the timetable from score destinations.",
      "Plan a shared block without an invented compulsory split.",
    ],
    skills: ["exam-planning"],
    explanation:
      "The checked paper reference has three written blocks: 65 minutes for reading plus the customer reply, a continuous 25-minute listening sequence including the phone note, and 45 minutes for language elements plus the statement. The overview's reading allocations of 45 and 20 minutes are a planning guide within one shared block. They are not two independent locks. The four scored skills each have a maximum of 60. Writing collects several sources of evidence, including the phone note and language elements. Exact pass-boundary wording and the announced digital format still need authoritative clarification; no coaching result should conceal that uncertainty.",
    example: [
      "Ich reserviere Zeit für die Antwort und prüfe nach der Hälfte des Blocks meinen Arbeitsstand.",
      "I reserve time for the reply and check my progress halfway through the block.",
    ],
    table: {
      title: "Time and evidence",
      headers: ["Block", "Budget", "Output"],
      rows: [
        ["Reading + reply", "65 min", "Reading answers + customer email"],
        ["Listening + note", "25 min", "Listening answers + phone note"],
        ["Language + statement", "45 min", "Gap answers + reasoned statement"],
        ["Speaking", "About 16 min, paired", "Presentation and interaction"],
      ],
    },
    reading: {
      title: "Choose a realistic plan",
      body: "Sie haben in einer Übung die Leseaufgaben in 42 Minuten bearbeitet, für die Kundenantwort aber 28 Minuten gebraucht. Die letzten fünf Minuten lagen damit außerhalb des gemeinsamen Blocks. Die Antwort war inhaltlich vollständig, enthielt jedoch mehrere ungeprüfte Zusagen. In der nächsten Übung möchten Sie eine kurze Planungsphase und eine Schlusskontrolle vorsehen. Ihr Ziel ist nicht, jeden einzelnen Satz perfekt zu formulieren, sondern die kommunikative Aufgabe innerhalb der verfügbaren Zeit zuverlässig zu erfüllen.",
    },
    tip: "Budget by output, then test the plan against actual attempts. Keep a short checking window for names, quantities, negation and commitments. Change your personal allocation when evidence shows a bottleneck.",
    checks: [
      {
        prompt:
          "How long is the shared reading-and-reply block in the paper reference? Write minutes.",
        answer: "65",
        why: "Reading and the integrated reply share 65 minutes.",
      },
      {
        prompt: "May a course infer full readiness without spoken evidence?",
        answer: "No",
        options: ["Yes", "No"],
        why: "A missing modality stays unassessed.",
      },
      {
        prompt:
          "Does the practice result prove which digital rules apply after the announced transition?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The digital definition requires separate verification.",
      },
    ],
    task: {
      prompt:
        "Write a German study note of 120–160 words. Diagnose the planning problem in the example, propose a revised allocation totalling 65 minutes, and name two concrete checks that prevent unsupported promises.",
      rubric: writing,
    },
    reflection: "Which part of your plan will you measure in the next attempt?",
  },
  {
    ...base,
    id: "X-02-L01",
    title: "Read for constraints and evidence",
    de: "Nicht nur Schlüsselwörter erkennen",
    objectives: [
      "Match needs to offers using all decisive constraints.",
      "Distinguish no-match evidence from uncertainty.",
    ],
    skills: ["reading"],
    explanation:
      "A tempting option often shares a keyword but fails a decisive constraint. Mark purpose, audience, timing, location and required feedback before comparing offers. For internal messages, identify scope and exceptions: initially, only, until approved and not yet can change the entire answer. In minutes, distinguish a proposal, a decision and an assigned action. A no-match response is justified when no supplied post answers the stated need; it does not mean you personally lack background knowledge. Under time pressure, return to the shortest passage that can confirm or contradict the whole option.",
    example: [
      "Das Angebot passt thematisch, scheidet aber aus, weil feste Termine vorgeschrieben sind.",
      "The topic fits, but fixed attendance times rule out the offer.",
    ],
    steps: [
      { label: "Need", detail: "Ziel und zwingende Bedingungen markieren" },
      { label: "Compare", detail: "Jede Bedingung im Text belegen" },
      { label: "Exclude", detail: "Widerspruch statt Bauchgefühl nutzen" },
      { label: "Confirm", detail: "Die ganze Option prüfen" },
    ],
    reading: {
      title: "Two offers",
      body: "Angebot A: Schreibwerkstatt, dienstags von 18 bis 20 Uhr in Präsenz. Sie überarbeiten eigene Beschwerdeantworten und erhalten individuelle Rückmeldungen. Angebot B: Selbstlernkurs mit jederzeit abrufbaren Einheiten zu professionellen E-Mails. Zwei eigene Texte werden von einer Trainerin kommentiert. Bedarf: Eine Schichtarbeiterin möchte schwierige Kundenantworten verbessern, kann aber keine festen Termine zusagen. Individuelles Feedback ist ihr wichtig.",
    },
    tip: "Use a small constraint table instead of repeatedly rereading every offer. Do not confuse 'online' with 'asynchronous': an online meeting may still require a fixed time.",
    checks: [
      {
        prompt: "Which offer meets all stated constraints?",
        answer: "B",
        options: ["A", "B"],
        why: "B combines flexible access with individual feedback.",
      },
      {
        prompt: "What rules out A?",
        answer: "Fixed times",
        options: ["No writing practice", "Fixed times", "No feedback"],
        why: "The learner cannot commit to fixed attendance.",
      },
      {
        prompt:
          "Complete: Das Angebot scheidet ___, weil feste Termine gelten.",
        answer: "aus",
        why: "Ausscheiden is separated in a main clause.",
      },
    ],
    task: {
      prompt:
        "Write a 140-word German recommendation for the learner. Compare both offers against the exact constraints and explain why a shared topic alone is insufficient.",
      rubric: writing,
    },
    reflection: "Which small qualifier changed your decision?",
  },
  {
    ...base,
    id: "X-03-L01",
    title: "Reply to a customer within your authority",
    de: "Verbindlich im nächsten Schritt, vorsichtig beim Ergebnis",
    objectives: [
      "Combine comprehension with an appropriate customer response.",
      "Separate an approved action from an unconfirmed outcome.",
    ],
    skills: ["writing", "mediation"],
    explanation:
      "The integrated task begins with understanding the source, not with a stock opening. Extract the customer's concern, verified facts, authorized remedies, open questions and the next deadline. A good reply acknowledges the practical impact, explains what can be done and gives the recipient a useful next step. Do not promise a result merely because the task asks you to sound confident. A precise commitment to check and respond is often more appropriate than an invented guarantee. Use the internal message to guide the reply without forwarding internal blame or irrelevant details.",
    example: [
      "Die Ersatzteile sind verfügbar. Den Zustelltermin bestätigen wir Ihnen morgen bis 12 Uhr.",
      "The parts are available; the delivery date will be confirmed by noon tomorrow.",
    ],
    table: {
      title: "Five notes before drafting",
      headers: ["Question", "Example"],
      rows: [
        ["Concern", "Missing parts before an event"],
        ["Fact", "Parts in stock"],
        ["Authority", "Replacement shipping paid"],
        ["Open", "Carrier delivery window"],
        ["Next step", "Confirm by tomorrow noon"],
      ],
    },
    reading: {
      title: "A partial delivery",
      body: "Kunde: Zwei Halterungen fehlen; die Anlage wird am Freitag benötigt. Lager: Die Halterungen können morgen versendet werden. Versand: Der Zustelltermin ist noch offen. Leitung: Die Kosten der Nachlieferung übernehmen wir. Eine Erstattung der ursprünglichen Expressgebühr wird erst nach Prüfung der Rechnung entschieden. Antworten Sie heute und melden Sie sich morgen bis 12 Uhr mit dem bestätigten Lieferfenster.",
    },
    tip: "Before submitting, underline each promise. Ask whether the source authorizes it. Check that all customer concerns receive an answer, even if one answer explains a pending decision.",
    checks: [
      {
        prompt: "Is delivery on Friday already confirmed?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The carrier has not confirmed the delivery window.",
      },
      {
        prompt: "Who pays for replacement shipping?",
        answer: "The company",
        options: ["The customer", "The company"],
        why: "Management explicitly authorizes the cost.",
      },
      {
        prompt: "Complete: Wir melden uns morgen ___ 12 Uhr.",
        answer: "bis",
        why: "Bis marks the latest time.",
      },
    ],
    task: {
      prompt:
        "Write the complete customer reply in German, covering every concern and the authorized next steps. Do not copy the internal message verbatim.",
      rubric: writing,
    },
    reflection: "Which promise did you replace with a precise next action?",
  },
  {
    ...base,
    id: "X-04-L01",
    title: "Listen for corrections and conditions",
    de: "Die spätere Präzisierung zählt",
    objectives: [
      "Track corrected information in real speech.",
      "Distinguish a proposal from an accepted responsibility.",
    ],
    skills: ["listening"],
    audioId: "audio-meeting-01",
    explanation:
      "In spoken workplace information, the first number may be corrected, a proposal may remain unaccepted, and an exception may narrow the scope. Keep notes in compact slots: who, what, when, exception and status. If a later clause corrects an earlier detail, update the note instead of retaining both as equally valid. A speaker may report an older plan merely to replace it. Use a first listen for the communicative purpose and a second study listen to locate the evidence for a correction. In a paper-reference rehearsal, replay is unavailable; study and rehearsal conditions must remain distinct.",
    example: [
      "Frau Neumann wurde vorgeschlagen; sie hat die Aufgabe noch nicht bestätigt.",
      "Ms Neumann was proposed; she has not yet accepted the task.",
    ],
    table: {
      title: "Listening note slots",
      headers: ["Slot", "Listen for"],
      rows: [
        ["Scope", "nur, außer, zunächst"],
        ["Correction", "nicht … sondern, ursprünglich"],
        ["Status", "vorgeschlagen, bestätigt, beschlossen"],
        ["Measure", "Was wird tatsächlich erfasst?"],
      ],
    },
    reading: {
      title: "Listen before you decide",
      body: "Eine Arbeitsgruppe bespricht einen gemeinsamen Eingang für Anfragen. Hören Sie die Aufnahme. Notieren Sie den Umfang des Versuchs, seine Dauer, die wöchentliche Messgröße und den Stand der Zuständigkeit. Trennen Sie dabei eine ältere Planung von der aktuellen Aussage. Die Aufnahme wird erst nach ihrer Vorbereitung und Prüfung freigeschaltet.",
    },
    tip: "When one detail is missed, keep listening rather than mentally replaying the previous sentence. Use the structure of the next information slot to rejoin the message.",
    checks: [
      {
        prompt: "Does vorgeschlagen always mean formally accepted?",
        answer: "No",
        options: ["Yes", "No"],
        why: "A proposal still needs acceptance or approval.",
      },
      {
        prompt: "Complete: Nicht vier, ___ drei Wochen.",
        answer: "sondern",
        why: "Sondern corrects a negated alternative.",
      },
      {
        prompt: "Can a missing audio recording count as listening evidence?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The actual sound must be available.",
      },
    ],
    task: {
      skill: "listening",
      prompt:
        "After listening, write a concise German briefing with the scope, duration, weekly measure and unresolved responsibility. Label what is confirmed and what remains open.",
      rubric: writing,
    },
    reflection: "Which correction would be easiest to miss on one listen?",
  },
  {
    ...base,
    id: "X-05-L01",
    title: "Write a phone note that another person can use",
    de: "Zahlen, Anliegen, Handlung",
    objectives: [
      "Capture names and contact details separately.",
      "Preserve information and the requested action without adding assumptions.",
    ],
    skills: ["listening", "mediation"],
    audioId: "audio-phone-01",
    explanation:
      "A phone note transfers usable information to someone who did not hear the call. Use separate fields for the caller, contact, occasion, important details and requested action. Spellings, quantities, places and deadlines matter because an approximate summary may be impossible to act on. Keep corrected details and discard superseded ones. Do not infer an action that the caller made conditional. The paper-reference note awards small distinct contributions for names and contact, one complete information aspect worth four points, and an action. The original task keys list required subfacts, which are assessed together for the information aspect; there is no invented partial-credit ladder.",
    example: [
      "Rückruf nur erforderlich, falls das neue Zeitfenster nicht passt.",
      "A callback is needed only if the new time window is unsuitable.",
    ],
    table: {
      title: "A usable note",
      headers: ["Field", "Question"],
      rows: [
        ["Caller / contact", "Who, and how to reach them?"],
        ["Occasion", "Which order or appointment?"],
        ["Information", "What exactly changed?"],
        ["Action", "Who should do what, by when, under which condition?"],
      ],
    },
    reading: {
      title: "A changed collection",
      body: "Hören Sie die Nachricht des Lieferteams. Ihre Kollegin muss die Abholung vorbereiten, hat aber selbst keinen Zugriff auf die Nachricht. Erfassen Sie Name und Kontakt sowie Zeitpunkt, Menge, Ort, Kennzeichnung und die Bedingung für einen Rückruf. Verwenden Sie eine übersichtliche Notiz mit kurzen, eindeutigen Einträgen.",
    },
    tip: "Check digit groups separately from ordinary language. A well-written sentence with a wrong number is still a harmful transfer error. Listen first; reveal the transcript only after saving your own note.",
    checks: [
      {
        prompt:
          "Is a conditional callback the same as an unconditional request to call?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The condition determines whether action is needed.",
      },
      {
        prompt: "Complete: Rückruf nur, ___ das Zeitfenster nicht passt.",
        answer: "falls",
        why: "Falls introduces the condition.",
      },
      {
        prompt:
          "Should a note contain an invented contact number when one was missed?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Missing information must not be fabricated.",
      },
    ],
    task: {
      skill: "mediation",
      prompt:
        "Listen and write the complete phone note in German. Keep the corrected time, location, quantities and callback condition accurate. Use headings rather than a customer-letter format.",
      rubric: writing,
    },
    reflection: "Could someone carry out the action using your note alone?",
  },
  {
    ...base,
    id: "X-06-L01",
    title: "Solve language elements through structure",
    de: "Erst Satzbau, dann Bedeutung",
    objectives: [
      "Use case, verb patterns and clause structure to narrow options.",
      "Verify the resulting meaning in the whole text.",
    ],
    skills: ["grammar-in-context"],
    explanation:
      "Language-element tasks reward a disciplined sequence. Identify whether the gap needs a connector, preposition, pronoun, adjective ending or part of a verb. Check the grammatical frame before choosing by meaning: a subordinate connector may require a different word order from a linking adverb. Then reread the full sentence and paragraph to check the relationship. A form can be grammatical yet contradict the intended argument. Word-bank items may look interchangeable in isolation but differ in the frame they govern. Use the final pass to check negation and reference, not just endings.",
    example: [
      "Wegen des Ausfalls … / Obwohl das System ausgefallen ist, … / Das System ist ausgefallen. Deshalb …",
      "Similar facts require different grammatical frames.",
    ],
    steps: [
      { label: "Frame", detail: "Satzart und Verbposition erkennen" },
      { label: "Form", detail: "Kasus, Kongruenz und Rektion prüfen" },
      { label: "Meaning", detail: "Beziehung im Kontext prüfen" },
      { label: "Read back", detail: "Den vollständigen Satz kontrollieren" },
    ],
    reading: {
      title: "A short internal message",
      body: "Wegen des Systemausfalls nutzen wir vorübergehend die Ersatzliste. Sobald das System wieder erreichbar ist, werden die Einträge übertragen. Bitte kennzeichnen Sie bereits übertragene Fälle, damit keine Doppelarbeit entsteht. Obwohl die Liste nur vorübergehend eingesetzt wird, müssen alle Pflichtfelder ausgefüllt werden.",
    },
    tip: "Name the relationship in plain English or German: reason, condition, concession, sequence or purpose. Then select a form that fits both the relationship and the sentence frame.",
    checks: [
      {
        prompt: "Complete: Wegen ___ Systemausfalls. Write the article.",
        answer: "des",
        why: "Wegen takes genitive here; Systemausfall is masculine.",
      },
      {
        prompt:
          "Complete: Wir markieren die Fälle, ___ keine Doppelarbeit entsteht.",
        answer: "damit",
        why: "Damit expresses the intended purpose.",
      },
      {
        prompt: "Where is the finite verb in the obwohl clause?",
        answer: "At the end",
        options: ["First", "Second", "At the end"],
        why: "Obwohl introduces a subordinate clause.",
      },
    ],
    task: {
      prompt:
        "Rewrite the message as a short, coherent instruction using one causal expression, one temporal clause and one purpose clause. Keep every operational detail accurate.",
      rubric: writing,
    },
    reflection: "Which gap did grammar resolve before you considered meaning?",
  },
  {
    ...base,
    id: "X-07-L01",
    title: "Build a management statement",
    de: "Position, Abwägung, umsetzbarer Vorschlag",
    objectives: [
      "Develop a supported position without a memorized generic essay.",
      "Address a strong counterargument and define an actionable proposal.",
    ],
    skills: ["writing", "argumentation"],
    explanation:
      "A management statement is a decision-oriented workplace text. Identify the proposed change and who is affected. State your position, support it with relevant reasons, acknowledge a serious disadvantage and propose an adjustment or condition. Avoid unsupported statistics and claims that every employee shares your view. A conditional pilot can be a useful conclusion when evidence is missing, but it must have a duration, responsibility and evaluation criterion. In full exam coaching, organization, accuracy and range are rated once across the statement and the customer email; task fulfilment remains distinct for each.",
    example: [
      "Ich befürworte einen begrenzten Versuch, sofern Zuständigkeit und Auswertung vorab geklärt werden.",
      "I support a limited trial provided responsibility and evaluation are agreed beforehand.",
    ],
    table: {
      title: "Argument moves",
      headers: ["Move", "Purpose"],
      rows: [
        ["Position", "Answer the decision question"],
        ["Reason", "Explain a concrete effect"],
        ["Objection", "Address a real disadvantage"],
        ["Adjustment", "Reduce the disadvantage"],
        ["Next step", "Who, when, measure"],
      ],
    },
    reading: {
      title: "A proposed review rule",
      body: "Die Geschäftsleitung erwägt, jede Kundenantwort vor dem Versand von einer zweiten Person prüfen zu lassen. Das soll Fehler reduzieren. Im Service gehen täglich sowohl einfache Eingangsbestätigungen als auch komplexe Vertragsfragen ein. Die Beschäftigten befürchten zusätzliche Wartezeiten. Bisher liegen keine nach Art der Antwort getrennten Fehlerzahlen vor. Ein vierwöchiger Versuch wäre organisatorisch möglich.",
    },
    tip: "Use different criteria for low-risk confirmations and binding commitments if the source supports this distinction. Prefer a clear, tested proposal to a long list of disconnected advantages and disadvantages.",
    checks: [
      {
        prompt:
          "Are separate error rates for different response types already available?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The source explicitly says they are missing.",
      },
      {
        prompt:
          "Complete: Ich stimme zu, ___ klare Kriterien vereinbart werden. Use sofern.",
        answer: "sofern",
        why: "Sofern introduces the condition for agreement.",
      },
      {
        prompt: "Should a statement contain an actionable next step?",
        answer: "Yes",
        options: ["Yes", "No"],
        why: "The purpose is to support a practical management decision.",
      },
    ],
    task: {
      prompt:
        "Write a 250–300-word German statement to management. Give a position, two developed reasons, a serious counterargument and a bounded proposal with responsibility and evaluation criteria.",
      rubric: writing,
    },
    reflection: "What would make management able to act on your conclusion?",
  },
  {
    ...base,
    id: "X-08-L01",
    title: "Present, answer, explain",
    de: "Flexibel auf Nachfragen reagieren",
    objectives: [
      "Structure a short professional presentation.",
      "Answer a follow-up and mediate another person's position.",
    ],
    skills: ["speaking", "mediation"],
    references: ["conversation", "pronunciation", "mediation"],
    explanation:
      "Prepare reusable structures and examples rather than a fixed speech for every possible question. In a short presentation, introduce the topic, develop two or three relevant aspects and close with a meaningful evaluation. A follow-up tests whether you can adapt, clarify or justify a point. Listen to the precise question before extending your prepared material. When explaining a partner's position, preserve their intention and any qualification; do not replace it with your own opinion. Sound evidence requires a recording. A polished transcript cannot establish pronunciation, fluency or successful spoken interaction.",
    example: [
      "Mit Ihrem Einwand meinen Sie vermutlich, dass … Habe ich Sie richtig verstanden?",
      "You probably mean that … Have I understood correctly?",
    ],
    steps: [
      { label: "Present", detail: "Thema, Aspekte, Beispiel, Einschätzung" },
      { label: "Respond", detail: "Die konkrete Nachfrage beantworten" },
      { label: "Mediate", detail: "Fremde Position korrekt wiedergeben" },
    ],
    reading: {
      title: "An original speaking prompt",
      body: "Stellen Sie ein berufliches Werkzeug oder Verfahren vor, das die Zusammenarbeit verbessert. Erläutern Sie Zweck, Anwendung, Nutzen und eine Grenze. Nachfrage: Wie würden Sie eine skeptische Kollegin von einem begrenzten Versuch überzeugen? Partneraussage: „Eine gemeinsame Liste hilft nur dann, wenn klar ist, wer sie pflegt.“ Erklären Sie, welche Bedingung in dieser Aussage entscheidend ist.",
    },
    tip: "Practise one unprepared follow-up after every planned presentation. Use a brief pause to select the point rather than filling time with an unrelated memorized paragraph.",
    checks: [
      {
        prompt: "Can a typed speech alone establish pronunciation evidence?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Pronunciation needs the actual sound.",
      },
      {
        prompt: "Which detail must a mediation preserve?",
        answer: "The condition",
        options: [
          "Only the topic",
          "The condition",
          "Your own preferred opinion",
        ],
        why: "The partner makes the value of the list conditional on responsibility.",
      },
      {
        prompt: "Complete: Habe ich Sie richtig ___? Use verstehen.",
        answer: "verstanden",
        why: "The perfect form is habe … verstanden.",
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record a two-minute presentation, then answer the follow-up and explain the partner's condition. In the exam lab, repeat this with the spoken partner so your response is genuinely interactive.",
      rubric: [
        "Presents the topic coherently with a relevant example.",
        "Answers the follow-up rather than repeating the presentation.",
        "Preserves the partner's condition accurately.",
        "Uses intelligible speech, controlled phrasing and appropriate German.",
      ],
    },
    reflection: "Which answer depended on listening rather than preparation?",
  },
  {
    ...base,
    id: "X-09-L01",
    title: "Keep a conversation moving toward a solution",
    de: "Aufgreifen, abwägen, vereinbaren",
    objectives: [
      "Respond to a partner and develop a joint proposal.",
      "Agree responsibility, deadline and a fallback.",
    ],
    skills: ["speaking", "problem-solving"],
    references: ["conversation", "pronunciation"],
    explanation:
      "Successful interaction is more than alternating prepared monologues. Refer to what the other person actually said, ask a useful question and contribute a reason or alternative. In informal conversation, show interest without turning every answer into a long presentation. In problem-solving, first identify the urgent effect, then compare feasible options and agree a next action. A good compromise may preserve one goal while changing the method. Make the agreement explicit: responsible person, deadline and fallback. If you disagree, explain the practical consequence rather than merely saying that the idea is bad.",
    example: [
      "Ihr Vorschlag löst das Zeitproblem. Wie sichern wir dabei die Qualität?",
      "Your proposal solves the timing problem. How do we protect quality?",
    ],
    table: {
      title: "Useful interaction moves",
      headers: ["Move", "German"],
      rows: [
        ["Acknowledge", "Das würde uns tatsächlich Zeit sparen."],
        ["Probe", "Welche Voraussetzung müsste dafür erfüllt sein?"],
        ["Qualify", "Für Standardfälle wäre das möglich; bei Ausnahmen …"],
        ["Agree", "Dann übernehmen Sie …, und ich kläre … bis …"],
      ],
    },
    reading: {
      title: "A staffing problem",
      body: "Zwei Beschäftigte fehlen kurzfristig. Eine wichtige Kundeninformation muss heute versendet werden, mehrere Routineaufgaben können bis morgen warten. Die fachliche Freigabe der Kundeninformation steht noch aus. Ihre Partnerin schlägt vor, zuerst alle Routineaufgaben schnell zu erledigen und anschließend den Text zu schreiben. Sie halten es für sinnvoller, die Freigabe sofort anzustoßen, während eine Person den Entwurf vorbereitet.",
    },
    tip: "Return to the common goal when positions harden. Ask which action is on the critical path: a five-minute request now may prevent an hour of waiting later. Do not present an unapproved commitment as the agreed solution.",
    checks: [
      {
        prompt: "Which action can reduce later waiting?",
        answer: "Request the approval now",
        options: [
          "Ignore approval",
          "Request the approval now",
          "Finish all routine tasks first",
        ],
        why: "The pending approval is a dependency for the urgent information.",
      },
      {
        prompt: "Does joint problem-solving require responding to the partner?",
        answer: "Yes",
        options: ["Yes", "No"],
        why: "Interaction cannot be established by a solo memorized speech.",
      },
      {
        prompt: "Complete: Ich kümmere mich ___ die Freigabe.",
        answer: "um",
        why: "Sich kümmern um takes an accusative object.",
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record your first response to the partner, acknowledging her aim and proposing a workable alternative. State responsibility, deadline and a fallback. Then practise at least two back-and-forth turns with the exam-lab partner.",
      rubric: [
        "Responds to the partner's actual proposal.",
        "Explains a relevant tradeoff and feasible alternative.",
        "Makes a clear agreement with responsibility and deadline.",
        "Speaks intelligibly and flexibly in an appropriate register.",
      ],
    },
    reflection: "Which partner contribution changed your proposal?",
  },
  {
    ...base,
    id: "X-10-L01",
    title: "Turn mock evidence into the next week’s plan",
    de: "Auswerten statt nur Punkte sammeln",
    objectives: [
      "Separate exposed practice from an unseen rehearsal.",
      "Use criterion-level gaps to choose a specific repair.",
    ],
    skills: ["exam-reflection"],
    explanation:
      "A mock is useful when its result leads to a precise next action. Keep format familiarity, language knowledge, timing and interaction separate in the review. An exposed task can still support learning but is weaker evidence of transfer. The reserved third original mock stays out of ordinary tutor retrieval and section practice. Full readiness needs two distinct complete valid unseen-at-start mocks plus verified applicable rules; no overall verdict should appear when a modality is missing. The project target of 156 out of 240 with at least 36 in each skill is a coaching milestone, not an official pass rule or a probability.",
    example: [
      "Die Gesamtpunktzahl hilft mir wenig, wenn eine Fertigkeit noch nicht belastbar beurteilt wurde.",
      "A total score helps little if one skill has not been assessed reliably.",
    ],
    table: {
      title: "A useful review",
      headers: ["Observed gap", "Next action"],
      rows: [
        ["Unconfirmed promises", "Authority check before drafting"],
        [
          "Missed corrections in speech",
          "Short correction-and-condition listening",
        ],
        ["Weak response to objections", "Two-turn problem-solving"],
        ["Exceeded block time", "Repeat with a measured allocation"],
      ],
    },
    reading: {
      title: "Incomplete mock evidence",
      body: "Eine Lernende erzielt 45 Punkte im Lesen und 42 im Hören. Ihre schriftlichen Texte wurden gespeichert, aber noch nicht nach dem gemeinsamen Sprachraster bewertet. Für das Sprechen liegt nur ein getippter Entwurf vor. Sie hat die Lesetexte vorher bereits im Training gesehen. Die Lernende möchte aus diesen Daten eine sichere Aussage über das Bestehen ableiten.",
    },
    tip: "Write one action per weakness with a task, condition and observable success criterion. Repeating the entire mock immediately may mainly test memory; choose a new focused task for repair first.",
    checks: [
      {
        prompt: "Can the example establish full readiness?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Writing and actual speech are unassessed, and reading was exposed.",
      },
      {
        prompt:
          "How many distinct complete valid unseen mocks does the project target require?",
        answer: "2",
        why: "Two distinct full attempts are required by the project policy.",
      },
      {
        prompt: "Is the project target an official probability of passing?",
        answer: "No",
        options: ["Yes", "No"],
        why: "It is a coaching target without statistical calibration.",
      },
    ],
    task: {
      prompt:
        "Write a German seven-day repair plan for the learner. Explain the evidence limits, name three targeted activities and define how each will be checked without reusing exposed answers.",
      rubric: writing,
    },
    reflection:
      "What evidence would most reduce uncertainty about your next step?",
  },
];
export const examPreparation = drafts.map(authorLesson);
