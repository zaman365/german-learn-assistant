import { authorLesson, type LessonDraft } from "./authoring";
const rubric = [
  "Represents the problem and other person's position accurately.",
  "Proposes feasible actions with responsibility and follow-up.",
  "Uses clear, respectful language and the target structures.",
  "Preserves uncertainty and does not invent authority or facts.",
];
const base = {
  references: ["conversation", "clauses", "editing"],
  vocabulary: ["problem", "team", "losung", "termin"],
};
const data: LessonDraft[] = [
  {
    ...base,
    id: "C1-09-L01",
    title: "Separate immediate action from lasting repair",
    de: "Zunächst absichern, anschließend verbessern",
    objectives: [
      "Distinguish symptom management from cause investigation.",
      "Agree on immediate and longer-term steps.",
    ],
    skills: ["problem-solving"],
    explanation:
      "Problem-solving conversations need two time horizons. Immediate action protects the current task; a lasting repair addresses a verified cause or tests a possible one. Do not postpone an urgent workaround until every cause is known, but do not present a workaround as a permanent solution. Zunächst and kurzfristig label the first horizon; mittelfristig and anschließend label the second. Add an owner, deadline and success check to each action. Modal assumptions such as könnte an … liegen help explore causes without declaring them established. When partners propose incompatible priorities, summarize the shared goal before comparing options.",
    example: [
      "Kurzfristig erfassen wir die Anfragen manuell; anschließend prüfen wir, weshalb die Übertragung ausfällt.",
      "We will log requests manually for now and then investigate the transfer failures.",
    ],
    table: {
      title: "Two horizons",
      headers: ["Now", "Later"],
      rows: [
        ["Capture missing requests", "Investigate transfer failures"],
        ["Assign one owner per case", "Test a monitored repair"],
        ["Confirm urgent customers", "Compare completeness after the change"],
      ],
    },
    reading: {
      title: "Interrupted order transfer",
      body: "Seit dem Morgen erscheinen einige Onlinebestellungen nicht im internen System. Die Bestellbestätigungen an die Kundschaft wurden jedoch versandt. Welche Fälle betroffen sind, ist noch unklar. Der Kundenservice kann die Bestätigungen vorübergehend mit einer exportierten Bestellliste abgleichen. Die IT untersucht die Übertragung, kann aber noch keinen Abschlusszeitpunkt nennen. Zwei dringende Kundenanfragen liegen bereits vor. Das Team muss vermeiden, Bestellungen doppelt anzulegen. Eine Person soll den Abgleich koordinieren und dokumentieren, welche Aufträge bereits geprüft wurden. Die Ursache darf bis zum Abschluss der Untersuchung nicht als behoben gemeldet werden.",
    },
    tip: "State the risk your immediate action controls. Then identify a separate test for the lasting repair. A deadline for an update is realistic even when the technical fix cannot yet be timed.",
    checks: [
      {
        prompt: "Are all missing orders already identified?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The affected cases remain unclear.",
      },
      {
        prompt: "What risk accompanies manual re-entry?",
        answer: "Duplicate orders",
        options: [
          "Automatic refunds",
          "Duplicate orders",
          "A confirmed data deletion",
        ],
        why: "The brief explicitly warns against duplicate creation.",
      },
      {
        prompt: "Complete: Die Störung könnte ___ der Übertragung liegen.",
        answer: "an",
        why: "An etwas liegen uses an plus dative.",
      },
      {
        prompt:
          "Complete: ___ erfassen wir die Fälle manuell. Use the word meaning initially.",
        answer: "Zunächst",
        why: "Zunächst marks the immediate first step.",
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record a two-minute proposal to your partner: immediate protection, owner, update deadline, longer-term investigation and success check. Then respond to: Warum legen wir nicht einfach alle Bestellungen neu an?",
      rubric,
    },
    reflection: "Which action contains the problem, and which tests its cause?",
  },
  {
    ...base,
    id: "C1-09-L02",
    title: "Compare solutions with shared criteria",
    de: "Machbar, wirksam, verhältnismäßig",
    objectives: [
      "Evaluate alternatives against the same criteria.",
      "Express assumptions and identify missing information.",
    ],
    skills: ["option-evaluation"],
    explanation:
      "Options are easier to compare when the criteria remain constant. Choose a small set such as time, staffing, reversibility and expected benefit. Apply every criterion to every option. Sonst riskierst du … is a prediction and needs a reason, not just a worried tone. Use a condition to show when an option becomes suitable: Falls die Ausfallzeit länger als einen Tag dauert, … . Distinguish something technically possible from something authorized and staffed. A decision matrix can support reasoning but does not turn guessed ratings into measured facts. Label unknowns, then ask which missing answer could change the choice.",
    example: [
      "Die manuelle Lösung wäre sofort umsetzbar, würde jedoch zwei Personen binden.",
      "The manual option could be implemented immediately but would occupy two people.",
    ],
    table: {
      title: "Same criteria, different options",
      headers: ["Option", "Time", "Staff", "Main uncertainty"],
      rows: [
        ["Manual check", "now", "two people", "volume"],
        ["Temporary tool", "one day", "IT setup", "compatibility"],
        ["Wait for repair", "unknown", "little setup", "duration"],
      ],
    },
    reading: {
      title: "Choosing a temporary workflow",
      body: "Für den Bestellabgleich stehen drei Möglichkeiten zur Diskussion. Ein manueller Abgleich kann sofort beginnen, benötigt aber zwei Beschäftigte für jeweils zwei Stunden. Ein vorhandenes Hilfsprogramm könnte den Aufwand senken; die IT muss seine Kompatibilität prüfen und rechnet dafür mit einem Arbeitstag. Einfach auf die Reparatur zu warten spart Einrichtungsaufwand, lässt jedoch dringende Kundenanfragen offen. Die Zahl der betroffenen Bestellungen wird erst nach einem ersten Stichprobenabgleich bekannt. Die Teamleitung kann für heute zwei Personen freistellen, für morgen ist dies noch unklar. Sie sollen eine vorläufige Lösung mit einem klaren Überprüfungspunkt vorschlagen.",
    },
    tip: "Avoid a permanent decision based on a temporary estimate. State which assumption your choice relies on and exactly when you will review it. Compare the opportunity cost of staff time as well as speed.",
    checks: [
      {
        prompt:
          "How many person-hours does the immediate manual option require?",
        answer: "4",
        why: "Two people working two hours each equals four person-hours.",
      },
      {
        prompt: "Is tomorrow's staffing confirmed?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Only today's temporary staffing is authorized.",
      },
      {
        prompt: "Complete: Die Lösung hängt ___ der Zahl der Fälle ab.",
        answer: "von",
        why: "Abhängen von governs dative.",
      },
      {
        prompt: "Which option leaves urgent inquiries unresolved immediately?",
        answer: "Waiting for the repair",
        options: [
          "Manual checking",
          "Waiting for the repair",
          "A confirmed instant tool",
        ],
        why: "Waiting provides no immediate response path.",
      },
    ],
    task: {
      prompt:
        "Write a 180-word recommendation comparing all three options on time, staffing and uncertainty. Choose a temporary approach and define a review point that could change the decision.",
      rubric,
    },
    reflection: "Did every option face the same criteria?",
  },
  {
    ...base,
    id: "C1-09-L03",
    title: "Reach an actionable joint solution",
    de: "Wer übernimmt was bis wann?",
    objectives: [
      "Invite partner input and negotiate responsibility.",
      "Close with a shared plan and contingency.",
    ],
    skills: ["joint-planning"],
    explanation:
      "Joint problem-solving means building on the partner's contribution. Ask an open question, acknowledge the answer, compare a concrete alternative and confirm the allocation of work. Avoid assigning all tasks to the other person or treating your opening proposal as settled. A contingency describes what happens if a necessary condition fails. Use falls or sollte … to introduce it: Sollte die IT bis 14 Uhr keine Rückmeldung geben, … . State a follow-up point and the evidence you will review. A polished monologue may practise useful language, but independent interaction requires spontaneous responses to another turn.",
    example: [
      "Ich könnte den Abgleich koordinieren. Könnten Sie die dringenden Kunden kontaktieren? Falls neue Fälle auftauchen, stimmen wir uns um 14 Uhr erneut ab.",
      "I could coordinate the check. Could you contact urgent customers? If new cases appear, we will review at 2 p.m.",
    ],
    steps: [
      { label: "Invite", detail: "Ask for the partner's view" },
      { label: "Compare", detail: "One alternative and its trade-off" },
      { label: "Allocate", detail: "Owner, deliverable, deadline" },
      { label: "Review", detail: "Contingency and follow-up" },
    ],
    reading: {
      title: "Your shared planning brief",
      body: "Sie und eine Kollegin koordinieren den Nachmittag. Zwölf Bestellungen müssen geprüft werden; drei davon sind dringend. Sie können die technische Liste lesen, die Kollegin kennt die betroffenen Kunden. Eine dritte Person steht ab 13 Uhr für eine Stunde zur Verfügung. Die IT verspricht bis 14 Uhr einen Statusbericht, aber noch keine Reparatur. Die Teamleitung möchte bis 15 Uhr eine Übersicht über geprüfte, offene und doppelte Fälle. Entscheiden Sie gemeinsam über Reihenfolge und Zuständigkeit. Falls mehr als fünf weitere Fälle hinzukommen, müssen Sie zusätzliche Unterstützung anfragen. Eine Verlängerung der Arbeitszeit dürfen Sie nicht zusagen.",
    },
    tip: "Use the colleague's strengths without deciding their availability for them. Read back the plan and ask for a correction. Name the threshold for escalation exactly rather than saying ‘if too much happens’.",
    checks: [
      {
        prompt: "Which cases should receive first attention?",
        answer: "The three urgent cases",
        options: [
          "Only newly discovered cases",
          "The three urgent cases",
          "The easiest six regardless of urgency",
        ],
        why: "The brief identifies three urgent orders.",
      },
      {
        prompt: "What does IT promise by 14 Uhr?",
        answer: "A status report",
        options: ["A completed repair", "A status report", "Additional staff"],
        why: "The promise concerns information, not a completed fix.",
      },
      {
        prompt:
          "Complete: ___ mehr als fünf Fälle hinzukommen, fragen wir Unterstützung an.",
        answer: "Falls",
        why: "Falls introduces the contingency.",
      },
      {
        prompt:
          "By which hour does management need the overview? Write digits.",
        answer: "15",
        why: "The overview is due by 15 Uhr.",
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record a two-minute plan and invite a partner response. In a follow-up turn answer: Ich kann die Kunden erst ab 14 Uhr anrufen. Adapt the plan, preserve the escalation threshold and confirm the final responsibilities.",
      rubric,
    },
    reflection: "What changed after your partner introduced a constraint?",
  },
  {
    ...base,
    id: "C1-10-L01",
    title: "Give feedback about an observable event",
    de: "Beobachtung statt Unterstellung",
    objectives: [
      "Separate observation, impact and request.",
      "Avoid treating an inferred motive as a fact.",
    ],
    skills: ["feedback"],
    explanation:
      "Useful feedback begins with an observable event rather than a personality judgment. Der Bericht kam am Mittwoch statt am Montag can be checked; Ihnen ist die Planung egal attributes a motive. Explain the impact and make a specific request. Ich-Botschaften are not automatically respectful if they disguise blame: Ich finde, Sie sind unzuverlässig remains a broad accusation. Invite the other person's account, because your information may be incomplete. Keep the desired future behavior measurable and realistic. Polite language should not make the request impossible to identify. Choose a private, suitable context for a sensitive workplace exchange.",
    example: [
      "Der Entwurf kam zwei Tage später als vereinbart. Dadurch blieb wenig Zeit zur Prüfung. Können Sie Verzögerungen künftig frühzeitig melden?",
      "The draft arrived two days late, leaving little review time. Could you warn us earlier about delays?",
    ],
    table: {
      title: "Three parts",
      headers: ["Observation", "Impact", "Request"],
      rows: [
        ["Two days late", "Short review window", "Warn before the deadline"],
        [
          "Missing source note",
          "Verification takes longer",
          "Add the source field",
        ],
      ],
    },
    reading: {
      title: "A delayed report",
      body: "Ihr Kollege sollte den Monatsbericht am Montag schicken; er kam am Mittwoch. Dadurch konnte Ihr Team die Zahlen erst kurz vor der Besprechung prüfen. Sie wissen noch nicht, weshalb sich die Abgabe verzögert hat. Im letzten Monat wurde der Termin eingehalten. Eine Kollegin vermutet, der Bericht sei dem Kollegen nicht wichtig, nennt dafür aber keine weiteren Hinweise. Sie möchten eine verlässliche Vorwarnung bei künftigen Verzögerungen vereinbaren. Der Kollege soll Gelegenheit haben, die Ursache zu erklären und einzuschätzen, welcher Meldezeitpunkt realistisch ist. Eine pauschale Bewertung seiner Zuverlässigkeit ist aus diesem einzelnen Vorfall nicht begründet.",
    },
    tip: "Delete always and never unless the evidence truly warrants them. Give the other person one clear question before proposing a process change. Record the resulting agreement, not an assumed motive.",
    checks: [
      {
        prompt: "Which statement is an observation?",
        answer: "The report arrived on Wednesday rather than Monday.",
        options: [
          "The colleague does not care.",
          "The colleague is always unreliable.",
          "The report arrived on Wednesday rather than Monday.",
        ],
        why: "The arrival date is observable; the other claims generalize or infer motive.",
      },
      {
        prompt: "Was last month's deadline missed?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The previous month was on time.",
      },
      {
        prompt:
          "Complete: Dadurch ___ wenig Zeit für die Prüfung. Use bleiben in Präteritum.",
        answer: "blieb",
        why: "Blieb is the past singular form of bleiben.",
      },
      {
        prompt:
          "Complete: Können Sie uns künftig frühzeitig ___? Use informieren.",
        answer: "informieren",
        why: "The modal construction requires the infinitive.",
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record a 90-second feedback opening with observation, impact, request and a genuine question. Then respond to: Ich habe selbst erst am Dienstag die Zahlen bekommen.",
      rubric,
    },
    reflection:
      "Did the new explanation change the process you should improve?",
  },
  {
    ...base,
    id: "C1-10-L02",
    title: "Soften the delivery without weakening the request",
    de: "Vielleicht könnten wir …",
    objectives: [
      "Use politeness and modal particles appropriately.",
      "Make a request clear across Sie and du registers.",
    ],
    skills: ["register"],
    explanation:
      "Politeness comes from context, relationship and wording together. Konjunktiv II can soften a request while leaving its content precise: Könnten Sie die Rückmeldung bis morgen schicken? Vielleicht can invite discussion, but it can also make a required deadline sound optional. Modal particles such as doch, mal and eben depend on intonation and shared assumptions. Machen Sie das eben can sound dismissive in the wrong context. Begin with explicit neutral language, then interpret particles in a concrete exchange rather than adding them as ornaments. Keep Sie/du consistent with the relationship; informality does not justify vague or disrespectful wording.",
    example: [
      "Könnten Sie den fehlenden Anhang bitte bis 12 Uhr nachreichen?",
      "Could you please send the missing attachment by noon?",
    ],
    table: {
      title: "Tone and clarity",
      headers: ["Context", "Suitable starting point"],
      rows: [
        ["Formal request", "Könnten Sie bitte …?"],
        ["Known colleague", "Kannst du mir bitte … schicken?"],
        ["Joint suggestion", "Vielleicht könnten wir … ausprobieren."],
        ["Required condition", "Dafür benötigen wir … bis …"],
      ],
    },
    reading: {
      title: "Three messages to revise",
      body: "An eine neue Kundin wurde geschrieben: „Schicken Sie doch einfach die Datei.“ Einer langjährigen Kollegin schrieb jemand: „Hiermit fordere ich Sie auf, mir umgehend zu antworten“, obwohl beide sich normalerweise duzen. In einer dritten Nachricht hieß es: „Vielleicht wäre es eventuell möglich, die Freigabe irgendwann zu bekommen.“ Tatsächlich benötigt das Projekt die Freigabe bis Donnerstag um 12 Uhr, sonst kann die Bestellung nicht rechtzeitig ausgelöst werden. Ihre Aufgabe ist, alle drei Nachrichten angemessen zu formulieren. Sie dürfen die benötigte Information und die reale Frist nicht aus Höflichkeit verschweigen.",
    },
    tip: "Read the revised request once without the polite framing. Is the action still specific? Then read the framing aloud. Does it fit a new customer, familiar colleague or joint discussion? Intonation feedback needs actual audio.",
    checks: [
      {
        prompt: "Which request contains a usable deadline?",
        answer: "Bitte bis Donnerstag um 12 Uhr freigeben.",
        options: [
          "Irgendwann freigeben.",
          "Bitte bis Donnerstag um 12 Uhr freigeben.",
          "Vielleicht später.",
        ],
        why: "Only the second names a concrete time.",
      },
      {
        prompt: "Does du automatically make a message disrespectful?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Respect depends on the relationship and wording, not Sie/du alone.",
      },
      {
        prompt: "Complete: Könnten Sie den Anhang bitte ___? Use nachreichen.",
        answer: "nachreichen",
        why: "The modal is followed by the infinitive.",
      },
      {
        prompt: "What depends on timely approval?",
        answer: "die Bestellung",
        why: "The order cannot be placed on time without approval.",
      },
    ],
    task: {
      prompt:
        "Rewrite the three messages for their recipients, then explain in 100 words your choices of Sie/du, softening and deadline clarity. Keep required action distinguishable from an optional suggestion.",
      rubric,
    },
    reflection:
      "Which polite phrase accidentally made a required action sound optional?",
  },
  {
    ...base,
    id: "C1-10-L03",
    title: "Agree on a workable conflict repair",
    de: "Ein gemeinsamer nächster Schritt",
    objectives: [
      "Identify competing needs without choosing a villain.",
      "Write a follow-up that records the agreement fairly.",
    ],
    skills: ["conflict-resolution"],
    explanation:
      "Conflict repair looks for the needs behind incompatible positions. One colleague may need predictable deadlines while another needs timely source data. Summarize both before proposing a shared procedure. Do not claim complete agreement if one person accepted only a trial. An effective follow-up names the new behavior, each person's responsibility, the test period and review date. Use neutral verbs such as vereinbaren, melden, prüfen rather than admitted fault unless that is what actually happened. If a problem lies outside either person's authority, include escalation to the appropriate role. Agreement does not erase the original incident; it gives both people a practical next step.",
    example: [
      "Wir testen die neue Vorwarnung vier Wochen lang und prüfen anschließend gemeinsam, ob sie ausreicht.",
      "We will test the new early-warning process for four weeks and then assess it together.",
    ],
    steps: [
      { label: "Need A", detail: "Predictable review time" },
      { label: "Need B", detail: "Reliable source data" },
      { label: "Joint trial", detail: "Early warning and escalation" },
      { label: "Review", detail: "Four-week check" },
    ],
    reading: {
      title: "After the feedback conversation",
      body: "Der Berichtsersteller erklärt, dass die Eingangsdaten diesmal verspätet geliefert wurden. Das prüfende Team braucht dennoch mindestens einen Arbeitstag für die Kontrolle. Beide vereinbaren einen vierwöchigen Test: Fehlen am Donnerstag um 14 Uhr noch Daten für den Montagsbericht, meldet der Berichtsersteller dies sofort an das prüfende Team. Dieses priorisiert die verfügbaren Teile und nennt offene Prüfungen. Die verspätete Datenlieferung wird an die zuständige Bereichsleitung weitergegeben. Niemand sagt zu, künftig regelmäßig am Wochenende zu arbeiten. Nach vier Wochen besprechen beide, ob die Vorwarnung genügt oder eine andere Frist nötig ist.",
    },
    tip: "Record mutual responsibilities, not only the other person's promise. Preserve the trial status and the limit on weekend work. A neutral summary should be recognizable to both participants.",
    checks: [
      {
        prompt: "Is the new procedure permanent already?",
        answer: "No",
        options: ["Yes", "No"],
        why: "It is a four-week trial.",
      },
      {
        prompt:
          "When should missing data trigger a warning? Write the weekday in German.",
        answer: "Donnerstag",
        why: "The agreed threshold is Thursday at 14 Uhr.",
      },
      {
        prompt: "Is regular weekend work part of the agreement?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The source explicitly excludes that commitment.",
      },
      {
        prompt:
          "Complete: Nach vier Wochen prüfen wir, ___ die Vorwarnung ausreicht.",
        answer: "ob",
        why: "An indirect yes/no question uses ob.",
      },
    ],
    task: {
      prompt:
        "Write a 150–180-word follow-up to both colleagues. Record the cause reported by one party, mutual duties, escalation, four-week review and the limit on weekend work without assigning unsupported blame.",
      rubric,
    },
    reflection: "Would both people recognize their own needs in your summary?",
  },
];
export const c1Collaboration = data.map(authorLesson);
