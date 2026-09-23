import { authorLesson, type LessonDraft } from "./authoring";
const rubric = [
  "Addresses the stated audience and task with supported details.",
  "Uses clear structure, appropriate register and precise target forms.",
  "Preserves limits, conditions and uncertainty.",
  "Supports conclusions with concrete examples rather than broad claims.",
];
const base = {
  references: ["verbs", "clauses", "editing"],
  vocabulary: ["erfahrung", "projekt", "entscheidung", "verantwortung"],
};
const data: LessonDraft[] = [
  {
    ...base,
    id: "C1-13-L01",
    title: "Explain a career decision with evidence",
    de: "Erfahrung, Entscheidung, Entwicklung",
    objectives: [
      "Connect past experience to a current professional goal.",
      "Use temporal clauses and narrative tenses consistently.",
    ],
    skills: ["career-narrative"],
    explanation:
      "A professional biography should explain the relevance of selected experience, not recite every date. Connect a situation, your role, action and result, then say what you learned. Distinguish the team's achievement from your individual contribution. Use als for a single past period or event and wenn for repeated or conditional situations. Nachdem makes an earlier event explicit; seitdem links a starting point to an ongoing development. In an interview, Perfekt is natural for many experiences while war, hatte and modals often appear in Präteritum. Avoid inventing metrics to sound convincing. A concrete qualitative result is better than an unsupported percentage.",
    example: [
      "Nachdem ich die Übergaben koordiniert hatte, übernahm ich die Einarbeitung neuer Kolleginnen und Kollegen.",
      "After coordinating handovers, I took responsibility for onboarding new colleagues.",
    ],
    table: {
      title: "Select relevant evidence",
      headers: ["Situation", "Contribution", "Result", "Learning"],
      rows: [
        [
          "Unclear handovers",
          "introduced ownership list",
          "fewer unresolved handovers reported",
          "clear responsibility matters",
        ],
      ],
    },
    reading: {
      title: "A fictional career profile",
      body: "Mira arbeitete zunächst drei Jahre im Kundenservice. Während eines Vertretungsprojekts koordinierte sie die Übergabe offener Fälle. Das Team führte auf ihren Vorschlag eine gemeinsame Zuständigkeitsliste ein. Die Rückmeldungen waren positiv; eine genaue Zeitersparnis wurde nicht gemessen. Später unterstützte sie die Einarbeitung neuer Beschäftigter und merkte, dass ihr das Erklären komplexer Abläufe liegt. Sie bewirbt sich nun für eine Stelle in der internen Schulungskoordination. Sie hat bisher keine ganze Abteilung geleitet und soll das auch nicht behaupten. Ihre Stärke ist die Verbindung von praktischer Serviceerfahrung und verständlicher Prozessvermittlung.",
    },
    tip: "Choose two experiences that explain the move to training. Name what the candidate did personally and where the result is only a team impression. Do not transform supporting onboarding into managing a department.",
    checks: [
      {
        prompt:
          "Which connector fits a single past period: ___ Mira im Kundenservice arbeitete, koordinierte sie Vertretungen.",
        answer: "Als",
        why: "Als refers to a single past period here.",
      },
      {
        prompt: "Has a precise time saving been measured?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The profile reports positive feedback without measurement.",
      },
      {
        prompt:
          "Complete: Seitdem ___ sie sich für Schulungsarbeit. Use interessieren reflexively; write the missing verb.",
        answer: "interessiert",
        why: "With seitdem in first position, the finite verb follows, then the supplied subject sie and reflexive sich.",
      },
      {
        prompt: "Did Mira lead an entire department?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The profile explicitly excludes that experience.",
      },
    ],
    task: {
      prompt:
        "Write a 170-word career explanation for Mira. Connect two concrete experiences to the new role, use als/nachdem/seitdem accurately and distinguish individual contribution from team results.",
      rubric,
    },
    reflection: "Which experience explains the direction of the career move?",
  },
  {
    ...base,
    id: "C1-13-L02",
    title: "Respond to interview follow-ups",
    de: "Können Sie ein konkretes Beispiel nennen?",
    objectives: [
      "Adapt a prepared example to an unexpected question.",
      "Describe a limitation and a credible learning response.",
    ],
    skills: ["interview"],
    explanation:
      "Follow-up questions test how you develop and qualify an example. If asked what you would do differently, do not repeat the achievement paragraph. Identify a specific decision, explain the limitation and describe a revised approach. A weakness answer should show awareness without manufacturing a disguised compliment. Use Konjunktiv II for a hypothetical change and past forms for the actual event. Listen for the question's focus: your role, evidence, conflict, learning or transfer to the new job. A clear answer can be concise. Ask for clarification if a question combines several different issues, and avoid claiming authority you did not have.",
    example: [
      "Rückblickend hätte ich früher festgelegt, woran wir den Erfolg des Tests messen.",
      "In retrospect, I would have defined the trial's success measures earlier.",
    ],
    table: {
      title: "Follow-up focus",
      headers: ["Question", "Answer needs"],
      rows: [
        ["What was your role?", "personal action"],
        ["How did you know it worked?", "evidence and limit"],
        ["What would you change?", "specific learning"],
        ["How does it transfer?", "new-role relevance"],
      ],
    },
    reading: {
      title: "Interview brief",
      body: "Sie vertreten Mira aus der vorherigen Fallstudie. Im Übergabeprojekt führte sie eine Zuständigkeitsliste ein, sammelte jedoch nur informelle Rückmeldungen. Eine Kollegin fand das zusätzliche Eintragen zunächst aufwendig. Mira erklärte den Zweck und vereinbarte einen begrenzten Test. Später wurde die Liste weitergenutzt, ohne dass eine genaue Erfolgskennzahl festgelegt worden war. Im Vorstellungsgespräch fragt die Personalverantwortliche nach Widerstand, messbarem Erfolg und einem Fehler, aus dem Mira gelernt habe. Die Antworten müssen zur tatsächlichen Erfahrung passen. Es ist zulässig, fehlende Messdaten offen zu benennen und einen besseren künftigen Prüfplan zu beschreiben.",
    },
    tip: "Prepare facts rather than complete answers. Answer four follow-ups in a shuffled order. If you notice a missing measurement, explain how you would address it rather than inventing a historical result.",
    checks: [
      {
        prompt:
          "Was the early resistance about the project goal or the extra recording work?",
        answer: "The extra recording work",
        options: [
          "The extra recording work",
          "A proven pay cut",
          "A refused promotion",
        ],
        why: "The colleague objected to the additional entries.",
      },
      {
        prompt:
          "Complete: Ich ___ früher Kriterien festgelegt. Use haben in Konjunktiv II.",
        answer: "hätte",
        why: "Unreal past uses hätte plus participle.",
      },
      {
        prompt: "Can Mira claim a measured productivity increase?",
        answer: "No",
        options: ["Yes", "No"],
        why: "No such metric was collected.",
      },
      {
        prompt: "Complete: Daraus habe ich ___. Use lernen.",
        answer: "gelernt",
        why: "Lernen forms the regular participle gelernt.",
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record answers to eight interview questions: role, motivation, action, colleague's objection, your response, evidence, what you would change and relevance to training coordination. Keep each answer 30–45 seconds and respond from the facts rather than a script.",
      rubric,
    },
    reflection:
      "Which question required you to qualify your strongest example?",
  },
  {
    ...base,
    id: "C1-14-L01",
    title: "Find the head of a dense rule",
    de: "Die Einhaltung der vereinbarten Fristen",
    objectives: [
      "Parse nested genitive and participial phrases.",
      "Identify who is affected and what condition applies.",
    ],
    skills: ["dense-reading"],
    explanation:
      "A dense rule often hides its main relation inside several noun phrases. Find the finite verb, then the main subject or obligation. Identify the head noun of each phrase before decoding its attributes. Die Einhaltung der vereinbarten Fristen concerns compliance, not the deadlines as acting subjects. A genitive chain can indicate possession, responsibility or a relation between events; context determines which. Expand one phrase at a time into clauses, keeping exceptions attached to the right rule. Do not infer general law from a fictional internal policy. Here the task is accurate language comprehension and mediation of the supplied text.",
    example: [
      "Die Prüfung der von der Fachabteilung eingereichten Nachweise erfolgt vor der Freigabe.",
      "The documents submitted by the specialist department are checked before approval.",
    ],
    table: {
      title: "Decode from the head noun",
      headers: ["Phrase", "Head", "Expansion"],
      rows: [
        ["die Prüfung der Nachweise", "Prüfung", "jemand prüft Nachweise"],
        [
          "die von der Leitung genehmigte Abweichung",
          "Abweichung",
          "die Leitung hat sie genehmigt",
        ],
        ["die Einhaltung der Frist", "Einhaltung", "jemand hält die Frist ein"],
      ],
    },
    reading: {
      title: "A fictional internal expense rule",
      body: "Die Erstattung der im Rahmen einer genehmigten Dienstreise entstandenen Kosten setzt die Vorlage vollständiger Belege voraus. Nachträglich eingereichte Unterlagen werden berücksichtigt, sofern die verspätete Abgabe vor Ablauf der internen Frist angekündigt wurde. Die Anerkennung einer Ausnahme von der Belegpflicht obliegt ausschließlich der zuständigen Fachleitung. Eine von der reisenden Person selbst verfasste Erläuterung ersetzt einen fehlenden Beleg nicht automatisch. Für bereits vor Reisebeginn schriftlich genehmigte Pauschalen gelten die in der Genehmigung genannten Bedingungen. Die Prüfung der Unterlagen erfolgt unabhängig von der Frage, ob für spätere Reisen erneut eine Freigabe erforderlich ist.",
    },
    tip: "Mark conditions before paraphrasing. A statement that a self-written explanation does not automatically replace a receipt does not mean every exception is impossible; the policy assigns exception authority to a specific role.",
    checks: [
      {
        prompt:
          "What is the head noun in die Erstattung der entstandenen Kosten?",
        answer: "Erstattung",
        why: "Erstattung is the central noun; Kosten is its complement.",
      },
      {
        prompt: "Does a personal explanation automatically replace a receipt?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The rule explicitly denies automatic replacement.",
      },
      {
        prompt:
          "Complete: Die Anerkennung einer Ausnahme ___ der Fachleitung. Use obliegen.",
        answer: "obliegt",
        why: "Obliegen uses dative for the responsible role.",
      },
      {
        prompt: "Which word introduces the late-document condition?",
        answer: "sofern",
        why: "Sofern limits consideration to the stated prior-notification condition.",
      },
    ],
    task: {
      prompt:
        "Write a 150-word plain-language explanation of the fictional rule. Preserve complete receipts, the late-submission condition, exception authority and separately approved allowances. Do not add legal claims.",
      rubric,
    },
    reflection: "Which condition was hidden inside a long noun phrase?",
  },
  {
    ...base,
    id: "C1-14-L02",
    title: "Explain exceptions without broadening them",
    de: "Gilt das auch für meinen Fall?",
    objectives: [
      "Apply a supplied rule to a concrete scenario.",
      "Separate a supported answer from a question needing clarification.",
    ],
    skills: ["rule-mediation"],
    explanation:
      "When a colleague asks whether a rule applies, first identify the relevant condition and what facts are known about their case. A missing fact is not permission to assume eligibility. Explain the ordinary rule, the relevant exception and the remaining check. Use soweit aus der Regelung hervorgeht to limit the scope of your explanation when helpful. Avoid copying the entire policy; answer the actual case. A recommendation to ask the responsible role is useful when tied to a precise unresolved question. Distinguish ‘not automatically accepted’ from ‘always rejected’ and ‘may be considered’ from ‘is approved’.",
    example: [
      "Die verspätete Abgabe kann berücksichtigt werden, sofern sie rechtzeitig angekündigt wurde; eine Erstattung ist damit noch nicht zugesagt.",
      "Late documents may be considered if delay was announced in time; reimbursement is not yet promised.",
    ],
    steps: [
      { label: "Case facts", detail: "What is known?" },
      { label: "Rule condition", detail: "What must be true?" },
      { label: "Open fact", detail: "What needs checking?" },
      { label: "Next action", detail: "Ask the responsible role" },
    ],
    reading: {
      title: "A colleague's question",
      body: "Ein Kollege kehrt von einer genehmigten Dienstreise zurück. Ein Beleg fehlt; er möchte stattdessen eine eigene Erklärung einreichen. Außerdem kann er die übrigen Unterlagen erst nach der internen Frist abgeben. Er hat die Verzögerung bisher nur einer Kollegin im Gespräch erwähnt. Die Regel verlangt eine Ankündigung vor Fristablauf, sagt in diesem Auszug jedoch nicht, in welcher Form und bei wem sie erfolgen muss. Nur die Fachleitung darf eine Ausnahme von der Belegpflicht anerkennen. Der Kollege fragt Sie, ob seine Erklärung ausreiche und ob die verspätete Einreichung sicher akzeptiert werde.",
    },
    tip: "Do not transform an unspecified notification channel into either guaranteed acceptance or definite rejection. State the gap and formulate the exact clarification needed. This is accurate mediation, not failure to answer.",
    checks: [
      {
        prompt:
          "Can you guarantee that the personal explanation is sufficient?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Only the responsible lead can recognize a receipt exception.",
      },
      {
        prompt:
          "Is the required notification channel specified in the excerpt?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The excerpt leaves the form and recipient open.",
      },
      {
        prompt:
          "Complete: Eine Erstattung ist damit noch nicht ___. Use zusagen.",
        answer: "zugesagt",
        why: "The participle is zugesagt.",
      },
      {
        prompt: "Who decides the receipt exception?",
        answer: "die Fachleitung",
        why: "The rule assigns exclusive authority to that role.",
      },
    ],
    task: {
      skill: "mediation",
      prompt:
        "Write a 140–170-word reply addressing both questions. Distinguish known rules from the notification-channel gap and give precise next steps without guaranteeing the outcome.",
      rubric,
    },
    reflection: "Where did you preserve uncertainty rather than fill a gap?",
  },
  {
    ...base,
    id: "C1-15-L01",
    title: "Discuss digital change with concrete trade-offs",
    de: "Vereinfachung oder Zusatzaufwand?",
    objectives: [
      "Explain benefits and transition costs separately.",
      "Decode word formation without assuming every compound's meaning.",
    ],
    skills: ["change-management"],
    explanation:
      "A change proposal should distinguish the intended steady-state benefit from the effort of getting there. Digitalisierung names a broad process; say which actual task changes. Compounds compress information: Zugriffsberechtigung combines access with authorization, while Datenübertragung names a transfer process. The final noun determines grammatical gender, but meaning may require context. Suffixes can identify word classes: -ung often forms a feminine event/result noun; -bar often indicates possibility. These are tools for decoding, not a license to invent meanings. Explain a technical term in ordinary language before using it as a reason for change.",
    example: [
      "Die zentrale Ablage könnte Vertretungen erleichtern; zunächst müssten jedoch Zugriffsrechte und Zuständigkeiten geklärt werden.",
      "Central storage could ease cover, but access rights and responsibilities must first be clarified.",
    ],
    table: {
      title: "Decode useful terms",
      headers: ["Term", "Meaning in this task", "Head"],
      rows: [
        [
          "Zugriffsberechtigung",
          "permission to access files",
          "die Berechtigung",
        ],
        ["Datenübertragung", "transfer of data", "die Übertragung"],
        [
          "nachvollziehbar",
          "possible to follow or verify",
          "adjective in -bar",
        ],
      ],
    },
    reading: {
      title: "A proposed shared document system",
      body: "Die Abteilung möchte Unterlagen künftig zentral ablegen. Vertretungen könnten dadurch leichter auf aktuelle Fassungen zugreifen. Bisher speichern einige Beschäftigte Dateien in persönlichen Ordnern. Vor einer Einführung müssten Zugriffsrechte, Benennungsregeln und die Verantwortung für Aktualisierungen festgelegt werden. Die vorhandenen Dateien sind teilweise doppelt oder veraltet. Eine automatische Übernahme ohne Prüfung würde diese Probleme mitnehmen. Das Team schlägt einen Test mit einem klar abgegrenzten Dokumenttyp vor. Der Aufwand für die Bereinigung soll dokumentiert werden. Eine vollständige Umstellung zum Monatsanfang ist bisher nur ein Wunsch, keine genehmigte Zusage.",
    },
    tip: "Replace every abstract benefit with an observable task improvement. State the migration work separately. A compound's correct gender does not prove that you understood its operational meaning.",
    checks: [
      {
        prompt: "What determines the gender of Zugriffsberechtigung?",
        answer: "Berechtigung",
        why: "The compound's final noun is the grammatical head.",
      },
      {
        prompt: "Does automatic transfer resolve outdated files by itself?",
        answer: "No",
        options: ["Yes", "No"],
        why: "It would carry existing problems into the new system.",
      },
      {
        prompt: "Complete: Die Zuständigkeiten müssen ___ werden. Use klären.",
        answer: "geklärt",
        why: "Modal passive uses geklärt werden.",
      },
      {
        prompt: "Is a complete start-of-month rollout approved?",
        answer: "No",
        options: ["Yes", "No"],
        why: "It is a wish, not a confirmed commitment.",
      },
    ],
    task: {
      prompt:
        "Write a 180-word recommendation covering benefits, cleanup, access responsibilities, a bounded test and evidence needed before full rollout. Define two technical compounds in plain German.",
      rubric,
    },
    reflection:
      "Which transition cost was easy to hide behind the word digitalization?",
  },
  {
    ...base,
    id: "C1-15-L02",
    title: "Make a sustainability proposal that can be checked",
    de: "Wirkung, Aufwand, Nebenfolgen",
    objectives: [
      "Support an environmental workplace proposal with measurable criteria.",
      "Distinguish expected benefits from demonstrated outcomes.",
    ],
    skills: ["sustainability-argument"],
    explanation:
      "A sustainability proposal needs a concrete mechanism: what resource use changes, how it will be measured and which trade-offs matter. Weniger Papier is measurable; umweltfreundlicher in every respect is a broader claim requiring more evidence. Consider rebound or displacement effects, such as additional printing elsewhere or increased travel to collect reusable items. Use infolgedessen for a supported consequence and könnte for an expected one. A trial can compare a defined period or baseline, but changes in workload may affect the result. State both environmental and operational criteria without pretending that one automatically settles the other.",
    example: [
      "Der Papierverbrauch könnte sinken; ob zusätzliche Arbeitszeit entsteht, sollten wir während des Tests erfassen.",
      "Paper use could fall; any additional work should be recorded during the trial.",
    ],
    table: {
      title: "A measurable proposal",
      headers: ["Goal", "Measure", "Limit"],
      rows: [
        ["less printing", "pages per completed case", "case mix"],
        [
          "usable digital access",
          "failed access attempts",
          "support availability",
        ],
        ["manageable workload", "staff time", "temporary learning period"],
      ],
    },
    reading: {
      title: "Replacing printed meeting packs",
      body: "Das Team druckt bisher für jede wöchentliche Sitzung Unterlagen für zwölf Personen aus. Ein Vorschlag sieht vor, die Unterlagen digital bereitzustellen und Ausdrucke nur auf Anfrage zu erstellen. Einige Beschäftigte arbeiten bevorzugt auf Papier; zwei benötigen eine barrierearme Darstellungsform. Nicht alle Sitzungsräume verfügen über geeignete Geräte. Die Verwaltung kann während eines vierwöchigen Tests die Zahl gedruckter Seiten und technische Zugriffsprobleme dokumentieren. Eine umfassende Umweltbilanz liegt nicht vor. Sie sollen einen Vorschlag formulieren, der weniger Druck anstrebt, Zugang und individuelle Anforderungen berücksichtigt und überprüfbare Erfolgskriterien nennt.",
    },
    tip: "Do not frame accessibility needs as resistance to sustainability. Design the trial so everyone can participate. Limit the claimed result to what you actually measure rather than announcing a complete environmental assessment.",
    checks: [
      {
        prompt: "Is a comprehensive environmental assessment available?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The source explicitly says it is absent.",
      },
      {
        prompt: "How many weeks is the proposed trial? Write digits.",
        answer: "4",
        why: "The trial runs for four weeks.",
      },
      {
        prompt: "Complete: Ausdrucke werden nur ___ Anfrage erstellt.",
        answer: "auf",
        why: "Auf Anfrage is the conventional expression.",
      },
      {
        prompt: "Which measure directly tracks reduced printing?",
        answer: "Number of printed pages",
        options: [
          "General enthusiasm",
          "Number of printed pages",
          "An assumed carbon total",
        ],
        why: "Page count is observable in the planned trial.",
      },
    ],
    task: {
      prompt:
        "Write a 180–210-word recommendation balancing printing reduction, access, accommodations and technical capacity. Include three success criteria, one limitation and a response to a fair objection.",
      rubric,
    },
    reflection:
      "What can your trial establish, and what would remain unmeasured?",
  },
];
export const c1CareerChange = data.map(authorLesson);
