import { authorLesson, type LessonDraft } from "./authoring";
const rubric = [
  "Addresses the task with accurate facts and explicit limits.",
  "Develops reasons and responds to the other position.",
  "Uses conditional, concessive or hedging structures accurately.",
  "Ends with a feasible proposal or justified conclusion.",
];
const base = {
  references: ["clauses", "conversation", "editing"],
  vocabulary: ["angebot", "termin", "entscheidung", "empfehlen"],
};
const data: LessonDraft[] = [
  {
    ...base,
    id: "C1-07-L01",
    title: "Trade conditions explicitly",
    de: "Wenn Sie …, könnten wir …",
    objectives: [
      "Make conditional offers without promising unconditionally.",
      "Separate priorities from negotiable preferences.",
    ],
    skills: ["negotiation"],
    explanation:
      "A negotiation offer links one action to another. Wenn Sie die Menge bestätigen, könnten wir den Preis halten is not an unconditional price guarantee. State what you need, what you can offer and where your authority ends. Provided that conditions can be expressed with vorausgesetzt, dass or unter der Voraussetzung, dass. An unreal hypothetical uses Konjunktiv II; a feasible condition need not. Avoid ambiguous wenn sentences whose consequence is far away. Distinguish a request for a concession from an accepted trade. Confirm the whole package before treating one favorable term as settled.",
    example: [
      "Vorausgesetzt, dass Sie bis Mittwoch bestellen, könnten wir die Versandkosten übernehmen.",
      "Provided that you order by Wednesday, we could cover shipping.",
    ],
    table: {
      title: "Your negotiation brief",
      headers: ["Fixed", "Flexible", "Needs approval"],
      rows: [
        ["20 units", "delivery in two batches", "discount above 3%"],
        ["test by 18 June", "induction date", "additional free services"],
      ],
    },
    reading: {
      title: "Supplier discussion",
      body: "Der Lieferant bietet zwanzig Geräte zu einem festen Stückpreis an. Sie dürfen einen Nachlass von höchstens drei Prozent akzeptieren oder statt des Nachlasses kostenfreien Versand vereinbaren; beides zusammen ist nicht freigegeben. Eine Teilung der Lieferung ist möglich, sofern bis zum 18. Juni zehn Geräte für den Test eintreffen. Die übrigen zehn können eine Woche später folgen. Der Lieferant verlangt eine Bestätigung bis Mittwoch. Sie müssen noch prüfen, ob die interne Freigabe rechtzeitig vorliegt. Ein höherer Nachlass und zusätzliche kostenlose Schulungen bedürfen einer neuen Genehmigung.",
    },
    tip: "Write the offer as a pair of linked conditions. State the alternative between discount and free shipping explicitly. Do not use a polite conditional to conceal a decision that still needs approval.",
    checks: [
      {
        prompt:
          "Can you accept both discount and free shipping under this brief?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Only one of these concessions is authorized.",
      },
      {
        prompt:
          "Complete: unter der ___, dass zehn Geräte rechtzeitig eintreffen.",
        answer: "Voraussetzung",
        why: "Unter der Voraussetzung, dass introduces a condition.",
      },
      {
        prompt: "How many units must arrive by 18 June? Write digits.",
        answer: "10",
        why: "Ten units are required for the initial test.",
      },
      {
        prompt:
          "Complete: Ein höherer Nachlass ___ einer Genehmigung. Use bedürfen.",
        answer: "bedarf",
        why: "Bedürfen uses genitive and the singular form bedarf.",
      },
    ],
    task: {
      prompt:
        "Write a 150-word negotiation email offering two authorized alternatives. Preserve the split-delivery minimum and internal-approval condition. Ask the supplier to confirm the chosen package.",
      rubric,
    },
    reflection:
      "Could the other side accept a benefit while ignoring its condition?",
  },
  {
    ...base,
    id: "C1-07-L02",
    title: "Concede a point without surrendering the argument",
    de: "Zwar …, aber …",
    objectives: [
      "Use concessions to acknowledge a real benefit.",
      "Keep paired connectors grammatically parallel.",
    ],
    skills: ["concession"],
    explanation:
      "A concession acknowledges a point that does not determine your conclusion. Zwar ist die Lösung günstiger, aber sie erfüllt die Frist nicht recognizes price while prioritizing timing. Obwohl introduces a subordinate clause; trotzdem connects a main-clause consequence against expectation. Weder … noch excludes both items, whereas nicht nur … sondern auch adds a second. Parallel form matters: link nouns with nouns or clauses with clauses. Avoid acknowledging a benefit merely to dismiss it with an unrelated objection. Show the decision criterion that makes the limitation important. A fair concession strengthens an argument because the reader can see you considered the competing benefit.",
    example: [
      "Zwar sinken die laufenden Kosten, doch die Umstellung bindet zunächst zusätzliche Arbeitszeit.",
      "Running costs fall, but the change initially ties up additional staff time.",
    ],
    table: {
      title: "Choose the relation",
      headers: ["Relation", "Pattern"],
      rows: [
        ["concede then restrict", "zwar … aber/doch"],
        ["add two benefits", "sowohl … als auch"],
        ["exclude two options", "weder … noch"],
        ["alternative", "entweder … oder"],
      ],
    },
    reading: {
      title: "A lower-cost service plan",
      body: "Ein Dienstleister schlägt einen günstigeren Jahrestarif vor. Die monatliche Grundgebühr würde sinken, allerdings entfiele der telefonische Support am Wochenende. Das Team nutzt diesen Support selten, benötigt ihn aber bei Veranstaltungen, die überwiegend samstags stattfinden. Ein zusätzlicher Bereitschaftsdienst wäre gegen Aufpreis möglich; dessen Preis liegt noch nicht vor. Die Leitung möchte die Kosten reduzieren, ohne die Betreuung der Veranstaltungen ungesichert zu lassen. Ein vollständiger Anbieterwechsel wird ebenfalls diskutiert, ist jedoch vor der nächsten Veranstaltung nicht realistisch. Die Entscheidung soll sowohl Einsparung als auch Betriebsfähigkeit berücksichtigen.",
    },
    tip: "Name the strongest genuine advantage before the limitation. Do not label an unpriced add-on cheap or expensive. Your conclusion may be conditional: consider the tariff after receiving the standby-service price.",
    checks: [
      {
        prompt: "What benefit does the new tariff offer?",
        answer: "A lower monthly base fee",
        options: [
          "Free weekend support",
          "A lower monthly base fee",
          "An immediate provider change",
        ],
        why: "The base fee falls; weekend support is excluded.",
      },
      {
        prompt:
          "Complete: ___ der Tarif günstiger ist, fehlt der Wochenendsupport. Use a concessive subordinating connector.",
        answer: "Obwohl",
        why: "Obwohl introduces concession with verb-final order.",
      },
      {
        prompt: "Complete: sowohl die Kosten ___ auch die Betriebsfähigkeit.",
        answer: "als",
        why: "The pair is sowohl … als auch.",
      },
      {
        prompt: "Is the standby-service price known?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The text explicitly says the price is missing.",
      },
    ],
    task: {
      prompt:
        "Write a 160-word assessment using a fair concession, two paired connectors and a conditional recommendation. Explain why rare use does not automatically mean weekend support is unnecessary.",
      rubric,
    },
    reflection:
      "Did your concession change the reader's understanding of the trade-off?",
  },
  {
    ...base,
    id: "C1-07-L03",
    title: "Record a compromise precisely",
    de: "Einigung mit offenen Punkten",
    objectives: [
      "Distinguish a package agreement from unresolved details.",
      "Confirm quantities, dates and dependencies.",
    ],
    skills: ["agreement-writing"],
    explanation:
      "A compromise needs a written record because each side may remember the favorable part. State agreed services, price conditions, timing and outstanding checks together. A residual issue is not automatically a reason to call the whole discussion unsuccessful; identify whether it blocks execution. Use vorbehaltlich only for the term actually conditional. Avoid the vague phrase alles wie besprochen when several alternatives were discussed. Confirm who resolves each remaining point and by when. If a party has only offered to ask internally, report that action rather than saying they approved the request. A short accurate confirmation is more useful than a confident but incomplete one.",
    example: [
      "Vereinbart ist die Teillieferung; die Freigabe der Zusatzkosten steht noch aus.",
      "The split delivery is agreed; approval of the extra costs is still pending.",
    ],
    steps: [
      { label: "Package", detail: "Agreed terms together" },
      { label: "Reservation", detail: "Exact condition" },
      { label: "Open action", detail: "Owner and deadline" },
    ],
    reading: {
      title: "The final negotiation notes",
      body: "Beide Seiten einigen sich auf zehn Geräte bis zum 18. Juni und zehn weitere bis zum 25. Juni. Der Stückpreis bleibt unverändert. Der Lieferant übernimmt den regulären Versand; ein Expressversand wurde nicht vereinbart. Die Einweisung findet online statt, ihr Termin wird bis Freitag von Frau Lang abgestimmt. Der Kunde bestätigt die technische Kompatibilität bis Mittwoch. Sollte diese Prüfung negativ ausfallen, muss die Vereinbarung erneut besprochen werden. Eine Erweiterung um fünf zusätzliche Geräte wird angefragt, ist aber nicht Bestandteil der jetzigen Einigung. Die Anbieterin prüft dafür bis Montag ein separates Angebot.",
    },
    tip: "Use one paragraph for confirmed terms and one for dependencies and open items. Match every statement to a note. Do not merge the possible five extra devices into the confirmed quantity.",
    checks: [
      {
        prompt: "How many devices are confirmed in total? Write digits.",
        answer: "20",
        why: "The two confirmed batches contain ten each.",
      },
      {
        prompt: "Is express shipping included?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Only regular shipping is agreed.",
      },
      {
        prompt:
          "Complete: Die Erweiterung ist nicht ___ der jetzigen Einigung.",
        answer: "Bestandteil",
        why: "Bestandteil means an included component.",
      },
      {
        prompt: "Which check can require renegotiation?",
        answer: "technical compatibility",
        why: "A negative compatibility test triggers renewed discussion.",
      },
    ],
    task: {
      prompt:
        "Write a 160-word confirmation recording the full compromise, technical condition, induction scheduling and separate five-device inquiry. Make each remaining action's owner and date visible.",
      rubric,
    },
    reflection:
      "Is every agreed quantity distinguishable from a requested expansion?",
  },
  {
    ...base,
    id: "C1-08-L01",
    title: "Build an argument with a visible chain",
    de: "These, Begründung, Beispiel, Folgerung",
    objectives: [
      "Connect claims to reasons and evidence.",
      "Avoid using an example as proof of a universal claim.",
    ],
    skills: ["argumentation"],
    explanation:
      "A useful argument lets the reader follow the chain from claim to reason to evidence to implication. A claim states what you support. A reason explains why it matters. An example illustrates it, while evidence supports its scope. One successful team does not prove an approach works everywhere. Qualify your conclusion accordingly. Use daher only when the preceding reason actually supports the proposed action. A paragraph should develop one central argument rather than list disconnected advantages. Anticipate the reader's criterion: cost, reliability, fairness or service quality may lead to different priorities. State the criterion so disagreement can become a useful discussion.",
    example: [
      "Eine feste Übergabezeit könnte Rückfragen verringern, weil offene Punkte gemeinsam geklärt würden.",
      "A fixed handover period could reduce follow-up questions because open points would be clarified together.",
    ],
    table: {
      title: "One argument",
      headers: ["Part", "Example"],
      rows: [
        ["Claim", "Pilot a fixed handover"],
        ["Reason", "Open issues get a responsible owner"],
        ["Evidence limit", "One team reports fewer questions"],
        ["Conclusion", "Test rather than mandate immediately"],
      ],
    },
    reading: {
      title: "A proposal for handovers",
      body: "Eine Abteilung hat zwei Wochen lang täglich zehn Minuten für eine strukturierte Schichtübergabe reserviert. Nach eigener Einschätzung musste das Team danach seltener nachfragen. Eine systematische Zählung fand nicht statt. Andere Abteilungen befürchten, dass eine feste Zeit bei wechselnden Kundenkontakten schwer einzuhalten sei. Die Personalplanung weist darauf hin, dass zehn Minuten pro Schicht in der Arbeitszeit berücksichtigt werden müssen. Die Leitung bittet um eine Empfehlung: sofortige Einführung überall, ein breiterer Test oder Beibehaltung des bisherigen Verfahrens. Ein realistischer Vorschlag soll sowohl Informationsqualität als auch organisatorischen Aufwand behandeln.",
    },
    tip: "Label your draft's claim, reason, evidence and conclusion. If the evidence is only a reported impression, say so. Choose a recommendation proportionate to what is known.",
    checks: [
      {
        prompt: "Was the reduction in questions systematically counted?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The source reports an impression without systematic counting.",
      },
      {
        prompt: "Complete: Dies spricht ___, den Ansatz zu testen.",
        answer: "dafür",
        why: "Für etwas sprechen becomes dafür before an infinitive reference.",
      },
      {
        prompt: "Which cost must be considered?",
        answer: "Working time for the handover",
        options: [
          "A new building",
          "Working time for the handover",
          "A mandatory software license",
        ],
        why: "The personnel note highlights ten minutes per shift.",
      },
      {
        prompt:
          "Complete: Der Vorschlag muss sowohl Nutzen ___ auch Aufwand berücksichtigen.",
        answer: "als",
        why: "Sowohl … als auch connects both considerations.",
      },
    ],
    task: {
      prompt:
        "Write a 230–270-word position with a clear claim, two developed arguments, a limitation, a counterargument and a proportionate recommendation. Do not treat the team's impression as measured proof.",
      rubric,
    },
    reflection: "Which sentence connects your evidence to your recommendation?",
  },
  {
    ...base,
    id: "C1-08-L02",
    title: "Use the right degree of certainty",
    de: "Möglicherweise – dürfte – nachweislich",
    objectives: [
      "Distinguish possibility, inference and established fact.",
      "Use modal assumptions without overstating evidence.",
    ],
    skills: ["hedging"],
    explanation:
      "Hedging expresses the strength of a claim, not a lack of language skill. Möglicherweise marks a possibility. Dürfte often conveys a tentative or plausible assumption; müsste can suggest a stronger inference depending on context. Muss in an epistemic statement expresses a strong conclusion, not an obligation. Er muss noch im Büro sein differs from Er muss im Büro bleiben. Supposed reported information with sollen or wollen also needs care: Er soll … can report a claim; Er will … can report the subject's own assertion. There is no universal numeric probability attached to these forms. Choose wording from the evidence and context, and keep the source explicit.",
    example: [
      "Die erhöhte Nachfrage dürfte zu den längeren Wartezeiten beigetragen haben.",
      "Increased demand probably contributed to the longer waits; this is an inference.",
    ],
    table: {
      title: "Match wording to evidence",
      headers: ["Status", "Useful phrase"],
      rows: [
        ["possible", "möglicherweise / könnte"],
        ["tentative inference", "dürfte / spricht dafür"],
        ["reported claim", "nach Angaben von …"],
        ["established within data", "die Auswertung zeigt …"],
      ],
    },
    reading: {
      title: "Explaining a rise in waiting time",
      body: "Die durchschnittliche Wartezeit stieg im August von sechs auf neun Minuten. Gleichzeitig erhöhte sich die Zahl der Anfragen um zwanzig Prozent. Zwei Beschäftigte waren zeitweise abwesend, und ein Softwareupdate wurde installiert. Die vorhandenen Daten trennen den Einfluss dieser Faktoren nicht. Ein Kollege vermutet, das Update sei allein verantwortlich; dafür legt er keine Messung vor. Die Teamleitung möchte eine erste Einordnung und Vorschläge für die weitere Untersuchung. Die Wartezeitänderung ist gemessen. Ihre Ursachen sind bisher nur mögliche Erklärungen, und die spätere Untersuchung kann mehrere gleichzeitig wirksame Faktoren ergeben.",
    },
    tip: "Split your report into what is measured and what is inferred. Replace every obviously, certainly or beweist with a check of its source. Do not assign percentages to modal verbs as though they were calibrated probabilities.",
    checks: [
      {
        prompt: "Which fact is directly measured?",
        answer: "Waiting time rose from six to nine minutes.",
        options: [
          "The update caused everything.",
          "Waiting time rose from six to nine minutes.",
          "Absence had no effect.",
        ],
        why: "The waiting-time change is measured; causal contributions are not isolated.",
      },
      {
        prompt:
          "Complete: Die Nachfrage ___ dazu beigetragen haben. Use dürfen in Konjunktiv II.",
        answer: "dürfte",
        why: "Dürfte can convey a qualified inference.",
      },
      {
        prompt: "Does Er muss im Büro sein necessarily express an obligation?",
        answer: "No",
        options: ["Yes", "No"],
        why: "It can express a strong inference about location.",
      },
      {
        prompt:
          "Complete: ___ Angaben der Leitung werden weitere Daten erhoben.",
        answer: "Nach",
        why: "Nach Angaben attributes the information to its source.",
      },
    ],
    task: {
      prompt:
        "Write a 170-word first assessment that distinguishes the measured trend, three possible contributors and the unsupported single-cause claim. Propose a focused way to collect better evidence.",
      rubric,
    },
    reflection: "Could a reader tell which of your statements is an inference?",
  },
  {
    ...base,
    id: "C1-08-L03",
    title: "Answer a strong objection",
    de: "Der Einwand ist berechtigt; daraus folgt jedoch …",
    objectives: [
      "Represent an objection fairly before responding.",
      "Revise a proposal when the objection exposes a real limit.",
    ],
    skills: ["counterargument"],
    explanation:
      "A strong response begins by accurately stating the objection. Do not weaken it into an easy target. Then decide whether it challenges your goal, your evidence or your implementation. You may rebut it with evidence, limit your claim or revise the proposal. A concession can be substantive: Der Einwand ist berechtigt; deshalb schlage ich zunächst … vor. This is stronger than repeating the original position more forcefully. Use einerseits/andererseits to organize tensions only if both sides receive meaningful analysis. Finish with the condition under which you would change your mind. Flexible argumentation is compatible with a clear conclusion.",
    example: [
      "Der Aufwand ist ein berechtigter Einwand. Deshalb sollte der Test auf zwei Teams begrenzt werden.",
      "The workload is a valid objection, so the trial should be limited to two teams.",
    ],
    steps: [
      { label: "Restate", detail: "Strongest fair objection" },
      { label: "Evaluate", detail: "Goal, evidence or implementation?" },
      { label: "Respond", detail: "Rebut, qualify or revise" },
      { label: "Criterion", detail: "What would change your view?" },
    ],
    reading: {
      title: "The objection to a shared inbox",
      body: "Sie befürworten einen gemeinsamen Posteingang, weil Vertretungen dadurch leichter werden könnten. Eine Kollegin wendet ein, dass persönliche Zuständigkeiten verloren gingen und Nachrichten doppelt bearbeitet werden könnten. In einem früheren Test geschah dies bei drei von hundert Anfragen. Alle Fälle wurden am selben Tag geklärt, verursachten aber zusätzliche Arbeit. Sie schlägt vor, beim bisherigen Verfahren zu bleiben. Sie möchten die Vertretung weiterhin verbessern, erkennen das Problem jedoch an. Eine Kennzeichnung der zuständigen Person wäre technisch möglich. Ob sie im Alltag zuverlässig genutzt wird, wurde bisher nicht geprüft.",
    },
    tip: "Use the three duplicate cases honestly. They neither prove total failure nor disappear because they were corrected. A revised test can retain your goal while taking the objection seriously.",
    checks: [
      {
        prompt:
          "How many duplicated cases occurred per hundred inquiries? Write digits.",
        answer: "3",
        why: "The earlier test recorded three out of one hundred.",
      },
      {
        prompt: "Has the ownership label already proved reliable?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Its everyday use has not been tested.",
      },
      {
        prompt:
          "Complete: Der Einwand richtet sich ___ die Umsetzung, nicht gegen das Ziel.",
        answer: "gegen",
        why: "Sich gegen etwas richten uses accusative.",
      },
      {
        prompt: "Which response is evidence-proportionate?",
        answer: "Test explicit ownership labels and monitor duplicates.",
        options: [
          "Ignore the three cases.",
          "Claim labels will definitely solve everything.",
          "Test explicit ownership labels and monitor duplicates.",
        ],
        why: "A monitored test addresses the risk without inventing certainty.",
      },
    ],
    task: {
      prompt:
        "Write a 230–270-word response that presents the objection fairly, acknowledges its evidence, proposes a modified trial and specifies when you would abandon or expand it.",
      rubric,
    },
    reflection:
      "What changed in your proposal because you took the objection seriously?",
  },
];
export const c1Negotiation = data.map(authorLesson);
