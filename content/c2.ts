import { authorLesson, type LessonDraft } from "./authoring";
const rubric = [
  "Synthesizes the supplied material without flattening disagreement or inventing evidence.",
  "Uses precise, nuanced and audience-appropriate German.",
  "Engages with a strong alternative interpretation.",
  "Explains limits and justifies a flexible conclusion.",
];
const base = {
  stage: "c2" as const,
  references: ["mediation", "editing", "conversation"],
  vocabulary: ["schlussfolgerung", "einschrankung", "einwand", "entscheidung"],
  minutes: 35,
};
const data: LessonDraft[] = [
  {
    ...base,
    id: "C2-01-L01",
    title: "Synthesize sources that disagree",
    de: "Widerspruch erklären statt glätten",
    objectives: [
      "Distinguish incompatible claims from different measures.",
      "Build a synthesis that retains evidence limits.",
    ],
    skills: ["source-synthesis"],
    explanation:
      "Advanced synthesis explains why sources differ instead of choosing the one that sounds more confident. Compare their question, sample, timeframe and definition of success. Two sources can both be accurate while measuring different outcomes. A positive staff impression does not contradict an unchanged processing-time measure unless either source claims they are the same thing. Attribute each claim at the point where it matters. Organize the synthesis around the decision, not source A followed by source B. Avoid a false balance when evidence strengths differ. Your conclusion should identify what is established, what remains contested and what additional information would resolve the decision.",
    example: [
      "Die Befunde widersprechen sich nur dann, wenn subjektive Entlastung mit messbarer Zeitersparnis gleichgesetzt wird.",
      "The findings conflict only if perceived relief is equated with measured time savings.",
    ],
    table: {
      title: "Compare the questions",
      headers: ["Source", "Measure", "Limit"],
      rows: [
        ["A", "perceived clarity", "small self-report sample"],
        ["B", "average handling time", "short observation period"],
      ],
    },
    reading: {
      title: "Two evaluations of a shared inbox",
      body: "Quelle A: Nach vier Wochen berichten acht von zehn befragten Beschäftigten, die Vertretung sei durch den gemeinsamen Eingang übersichtlicher geworden. Die Befragung war freiwillig. Zwei Beschäftigte nennen zusätzliche Arbeit durch die Kennzeichnung der Zuständigkeit. Die Autorin empfiehlt eine Ausweitung, bezeichnet die Rückmeldungen aber ausdrücklich als subjektive Einschätzungen.\nQuelle B: Eine Auswertung von 400 Fällen zeigt keine erkennbare Verkürzung der durchschnittlichen Bearbeitungszeit. Komplexe Fälle sind in beiden Vergleichsmonaten unterschiedlich häufig. Die Untersuchung erfasst weder Vertretungssituationen noch die empfundene Belastung. Der Autor hält eine Aussage zur Effizienz derzeit für verfrüht.\nDie Leitung fragt, ob A und B unvereinbar seien und ob der Test beendet werden solle.",
    },
    tip: "Create a measure–claim matrix before drafting. Use a concessive structure only where there is a real tension. Preserve the sources' own caution instead of making either author more absolute.",
    checks: [
      {
        prompt: "Do both sources measure the same outcome?",
        answer: "No",
        options: ["Yes", "No"],
        why: "A measures perceptions of clarity; B measures average processing time.",
      },
      {
        prompt: "Does source B assess cover situations?",
        answer: "No",
        options: ["Yes", "No"],
        why: "B explicitly excludes that dimension.",
      },
      {
        prompt:
          "Complete: Subjektive Entlastung darf nicht ___ Zeitersparnis gleichgesetzt werden.",
        answer: "mit",
        why: "Etwas mit etwas gleichsetzen takes mit plus dative.",
      },
    ],
    task: {
      skill: "source-synthesis",
      prompt:
        "Write a 300–350-word synthesis for management. Explain the apparent disagreement, compare evidence strength, make a conditional recommendation and specify a further study that could change it. Attribute claims precisely.",
      rubric,
    },
    reflection:
      "Which disagreement disappeared once the measures were separated?",
  },
  {
    ...base,
    id: "C2-02-L01",
    title: "Reframe a sensitive message for two audiences",
    de: "Präzise sein, ohne unnötig zu verletzen",
    objectives: [
      "Control implication and interpersonal effect.",
      "Preserve responsibility while adapting register.",
    ],
    skills: ["pragmatic-nuance"],
    explanation:
      "Nuance includes what a sentence implies without explicitly stating. Leider mussten wir erneut nachfragen can imply a pattern and blame even when it reports an event. If only one delay is known, erneut invents recurrence. Passive may tactfully focus on a process, but it can also erase responsibility when accountability matters. Choose the degree of directness according to the relationship and purpose. An internal risk note and a customer update can share facts while differing in detail and emphasis. Do not use euphemism to obscure a material limitation. Explain your choices in terms of likely interpretation, not a rule that formal is always better.",
    example: [
      "Die Freigabe liegt noch nicht vor. → Für eine verbindliche Zusage benötigen wir noch die ausstehende Freigabe.",
      "The second version connects the missing approval to the recipient's practical expectation.",
    ],
    table: {
      title: "Same fact, different communicative purpose",
      headers: ["Audience", "Needs"],
      rows: [
        ["Internal lead", "responsibility, risk, decision"],
        ["Customer", "current status, impact, next contact"],
        ["Colleague", "specific request and feasible deadline"],
      ],
    },
    reading: {
      title: "A delayed approval",
      body: "Eine Kundin erwartet heute eine verbindliche Lieferzusage. Die Fachabteilung hat die technische Prüfung abgeschlossen, die Bereichsleitung hat die finale Freigabe jedoch noch nicht erteilt. Der Grund für die Verzögerung ist unbekannt. Es ist der erste dokumentierte Fall dieser Art. Der Vertrieb hat der Kundin eine Rückmeldung heute zugesagt, nicht zwingend eine positive Lieferbestätigung. Intern muss geklärt werden, wer die ausstehende Entscheidung nachverfolgt. Die Kundin braucht eine ehrliche Statusmeldung und einen klaren nächsten Kontakt. Sie soll nicht mit internen Vermutungen über einzelne Personen belastet werden.",
    },
    tip: "Read each draft as its recipient. What blame, guarantee or recurrence might they infer? Keep supported responsibility explicit internally while making the customer message useful and honest.",
    checks: [
      {
        prompt: "Is wiederholt delayed approval supported by the facts?",
        answer: "No",
        options: ["Yes", "No"],
        why: "This is the first documented incident.",
      },
      {
        prompt: "Was a positive delivery confirmation promised today?",
        answer: "No",
        options: ["Yes", "No"],
        why: "A response was promised, not necessarily approval.",
      },
      {
        prompt: "Complete: Der Grund ___ die Verzögerung ist unbekannt.",
        answer: "für",
        why: "Der Grund für etwas uses für plus accusative.",
      },
    ],
    task: {
      skill: "pragmatic-nuance",
      prompt:
        "Write a 150-word internal escalation and a 120-word customer update. Then explain in 100 words how your choices change implication, directness and detail without changing facts.",
      rubric,
    },
    reflection:
      "Which apparently neutral word risked implying unsupported blame?",
  },
  {
    ...base,
    id: "C2-03-L01",
    title: "Defend a proposal and revise its limits",
    de: "Eine starke Position bleibt überprüfbar",
    objectives: [
      "Engage with the strongest opposing argument.",
      "State conditions under which you would revise your conclusion.",
    ],
    skills: ["advanced-argument"],
    explanation:
      "An advanced argument separates the goal from the chosen means and the evidence supporting them. You can retain a goal while abandoning an ineffective implementation. Identify the strongest objection, including any value conflict it reveals. Cost and fairness, for example, may not be reducible to one number. Avoid both absolute certainty and an indecisive list of perspectives. State your decision criterion, defend a proportionate proposal and name a falsifying or revision condition. Counterfactual reasoning can test a principle: would you support the same rule if another team carried the cost? A reasoned change of position is evidence of flexibility, not defeat.",
    example: [
      "Der Einwand widerlegt das Ziel nicht, begrenzt aber die Bedingungen, unter denen der vorgeschlagene Weg vertretbar wäre.",
      "The objection does not refute the goal, but limits when the proposed method would be defensible.",
    ],
    table: {
      title: "Expose the reasoning",
      headers: ["Element", "Question"],
      rows: [
        ["Goal", "What remains worth achieving?"],
        ["Means", "Why this intervention?"],
        ["Value conflict", "Who bears the cost?"],
        ["Revision condition", "What evidence would change the choice?"],
      ],
    },
    reading: {
      title: "Mandatory common office days",
      body: "Die Leitung schlägt zwei feste gemeinsame Bürotage vor, um spontane Abstimmung zu erleichtern. Eine Arbeitsgruppe berichtet, dass neue Beschäftigte bei räumlicher Nähe schneller Hilfe finden. Diese Beobachtung beruht auf fünf Interviews, nicht auf einer vergleichenden Studie. Eine andere Gruppe verweist auf lange Anfahrtswege, Betreuungspflichten und Aufgaben, die konzentrierte Einzelarbeit erfordern. Sie bestreitet den Wert persönlicher Zusammenarbeit nicht, hält feste Tage aber für ein zu grobes Instrument. Ein begrenzter Test mit teambezogenen Ausnahmen wäre organisatorisch möglich. Unklar ist, wie Nutzen, Belastung und ungleiche Auswirkungen gemeinsam bewertet werden sollen.",
    },
    tip: "Define the criterion before defending a preferred outcome. Take unequal burden seriously rather than treating it as mere resistance. Explain what a bounded trial could reveal and what it could not settle.",
    checks: [
      {
        prompt:
          "Does the opposing group deny all value in in-person cooperation?",
        answer: "No",
        options: ["Yes", "No"],
        why: "It challenges the fixed-day instrument, not the goal itself.",
      },
      {
        prompt: "How many interviews support the observation? Write digits.",
        answer: "5",
        why: "The brief mentions five interviews.",
      },
      {
        prompt:
          "Complete: Unter welchen Bedingungen wäre der Vorschlag ___? Use vertretbar.",
        answer: "vertretbar",
        why: "The predicative adjective stays uninflected.",
      },
    ],
    task: {
      skill: "advanced-argument",
      prompt:
        "Write a 350-word position with an explicit criterion, a strong objection, a justified revised proposal and two revision conditions. Discuss unequal burdens without inventing legal conclusions.",
      rubric,
    },
    reflection:
      "What evidence would genuinely make you change your recommendation?",
  },
  {
    ...base,
    id: "C2-04-L01",
    title: "Interpret an implied reservation in speech",
    de: "Was wird angedeutet, was tatsächlich zugesagt?",
    objectives: [
      "Distinguish implication from literal commitment.",
      "Respond to a nuanced spoken objection without overstating certainty.",
    ],
    skills: ["complex-listening", "speaking"],
    audioId: "audio-c2-01",
    explanation:
      "Advanced listening includes stance and implication. A speaker may make a reservation through understatement, contrast or a carefully chosen hypothetical. Interpret tone together with the words and context; do not label irony from punctuation in a transcript. Separate what is literally said from your inference about attitude. Offer the inference as such when uncertainty remains. A good response acknowledges the underlying concern and asks a clarifying question where the commitment boundary is unclear. Your own spontaneous reply should adapt to the speaker's conditions, not merely repeat a prepared position. This task becomes available only when its original audio has been prepared and reviewed.",
    example: [
      "Wenn ich Sie richtig verstehe, richtet sich Ihr Einwand vor allem gegen die ungeklärte Zuständigkeit, nicht gegen die Einführung an sich.",
      "If I understand correctly, your objection concerns unresolved responsibility rather than introduction itself.",
    ],
    table: {
      title: "Keep three levels distinct",
      headers: ["Level", "Evidence"],
      rows: [
        ["Literal statement", "words explicitly spoken"],
        ["Inferred stance", "tone, contrast and context"],
        ["Commitment", "conditions under which the speaker agrees"],
      ],
    },
    reading: {
      title: "Before listening",
      body: "Eine Arbeitsgruppe diskutiert, ob ein neues Ablagesystem sofort eingeführt werden soll. Hören Sie den Beitrag einer Kollegin. Achten Sie darauf, ob sie das Ziel grundsätzlich ablehnt, welche offene Frage sie hervorhebt und unter welcher Bedingung sie einen früheren Start akzeptieren würde. Notieren Sie zuerst die wörtlich belegbaren Punkte. Beschreiben Sie erst danach eine mögliche Haltung und kennzeichnen Sie diese als Interpretation. Eine gedruckte Erklärung oder ein fehlgeschlagener Audioplayer ersetzt diese Hörleistung nicht.",
    },
    tip: "Replay in study mode to locate the evidence for your interpretation. In the response, distinguish ‘Sie sagen’ from ‘Ich habe den Eindruck’. The follow-up should resolve the exact condition rather than ask generally what the speaker thinks.",
    checks: [
      {
        prompt:
          "Does an inferred attitude have the same status as an explicit promise?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Stance inference and literal commitment are distinct evidence claims.",
      },
      {
        prompt:
          "Can this listening task be completed from an unavailable recording?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Actual accessible audio is required.",
      },
      {
        prompt:
          "Complete: Mein Eindruck beruht ___ dem Kontrast zwischen beiden Aussagen.",
        answer: "auf",
        why: "Beruhen auf governs dative.",
      },
    ],
    task: {
      type: "speaking",
      skill: "complex-listening",
      prompt:
        "After listening, record a two-minute response distinguishing the literal reservation, your qualified interpretation of tone and the condition for an earlier start. Ask two clarifying questions and propose a next step.",
      rubric,
    },
    reflection:
      "Which interpretation was plausible but less certain than the literal words?",
  },
];
export const c2Lessons = data.map(authorLesson);
