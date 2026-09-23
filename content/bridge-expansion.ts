import { authorLesson, type LessonDraft } from "./authoring";
const writing = [
  "Address every requested point accurately.",
  "Organize the information in a clear sequence.",
  "Use the target structures accurately without copying the model.",
  "Use a suitable professional register.",
];
const drafts: LessonDraft[] = [
  {
    id: "B2-04-L01",
    stage: "bridge",
    title: "Tell the story of an incident",
    de: "Was war vorher passiert?",
    objectives: [
      "Distinguish an event from an earlier event.",
      "Use separable, modal and reflexive verbs in a report.",
    ],
    prerequisites: ["B2-01-L01"],
    skills: ["verb-forms"],
    references: ["verbs", "word-order"],
    vocabulary: ["kollege", "termin", "problem", "prufen"],
    explanation:
      "A useful incident account answers when, what happened, what had already happened, and what happened next. In conversation, use Perfekt for many completed events: Die Anlage ist ausgefallen. A written report often uses Präteritum: Die Anlage fiel aus. Forms such as war, hatte and musste are natural in both contexts. Plusquamperfekt moves one step further into the past: Wir hatten die Anlage geprüft, bevor sie ausfiel. Do not choose a tense just because a sentence is longer. Choose it from the event relationship. Separable verbs put ge inside the participle: einschalten → eingeschaltet. Inseparable prefixes do not take ge: überprüfen → überprüft. With a second infinitive, modals use the substitute infinitive: Wir haben länger arbeiten müssen.",
    example: [
      "Nachdem wir den Fehler gefunden hatten, konnten wir die Anlage wieder einschalten.",
      "After we had found the fault, we were able to switch the system on again.",
    ],
    table: {
      title: "Useful verb packages",
      headers: ["Infinitive", "Past forms", "Construction"],
      rows: [
        ["ausfallen", "fiel aus · ist ausgefallen", "Die Anlage fällt aus."],
        ["überprüfen", "überprüfte · hat überprüft", "etwas überprüfen"],
        [
          "sich erinnern",
          "erinnerte sich · hat sich erinnert",
          "sich an etwas erinnern",
        ],
        ["müssen", "musste · hat … müssen", "hat arbeiten müssen"],
      ],
    },
    reading: {
      title: "A shift report",
      body: "Am Dienstag um 8.15 Uhr fiel der Scanner im Wareneingang aus. Die Frühschicht hatte bereits zwölf Pakete erfasst. Eine Kollegin überprüfte zuerst die Stromversorgung; dabei stellte sie keinen Fehler fest. Anschließend erinnerte sie sich an ein ähnliches Problem im Mai. Damals hatte ein lockeres Kabel den Ausfall verursacht. Diesmal saß das Kabel jedoch fest. Die IT musste den Scanner neu starten. Um 8.40 Uhr funktionierte er wieder. Während der Unterbrechung notierte das Team die Paketnummern auf Papier und übertrug sie danach in das System. Kein Paket ging verloren. Die Ursache ist noch nicht abschließend geklärt.",
    },
    tip: "Create a four-point timeline before writing. The earlier event is not automatically the first sentence. Check every sein/haben choice against the verb package, then check whether each separable prefix has returned to its verb. Unknown causes stay unknown; grammatical sophistication is no reason to invent a technical explanation.",
    checks: [
      {
        prompt: "Complete: Die Anlage ist gestern ___ (ausfallen).",
        answer: "ausgefallen",
        why: "Ausfallen forms its participle with inserted ge and uses sein.",
      },
      {
        prompt: "Complete: Wir hatten zwölf Pakete ___ (erfassen).",
        answer: "erfasst",
        why: "Erfassen has inseparable er- and therefore no ge-.",
      },
      {
        prompt: "Which cause is established in Tuesday's report?",
        answer: "The cause is still unclear.",
        options: [
          "A loose cable",
          "A lost package",
          "The cause is still unclear.",
        ],
        why: "The loose cable belongs to the May incident, not Tuesday.",
      },
      {
        prompt: "Complete: Wir haben länger arbeiten ___ (müssen).",
        answer: "müssen",
        why: "With arbeiten, the modal uses an Ersatzinfinitiv, not gemusst.",
        exit: true,
      },
    ],
    task: {
      prompt:
        "Write a 140–160-word incident report. Include the twelve packages, the checks, the restart, the recovery of the paper notes and the unresolved cause. Use one Plusquamperfekt clause and a clear time sequence.",
      rubric: writing,
    },
    reflection: "Can a reader reconstruct the order without guessing?",
  },
  {
    id: "B2-05-L01",
    stage: "bridge",
    title: "Explain a process and propose a change",
    de: "Es wird geprüft – es ließe sich verbessern",
    objectives: [
      "Form active and passive process descriptions.",
      "Make a polite request and a hypothetical proposal.",
    ],
    prerequisites: ["B2-04-L01"],
    skills: ["passive", "konjunktiv"],
    references: ["passive", "verbs"],
    vocabulary: ["rechnung", "kunde", "prufen", "bestatigen"],
    explanation:
      "Choose active when the responsible person matters: Die Buchhaltung prüft die Rechnung. Choose werden-passive when the process matters: Die Rechnung wird geprüft. The active accusative object becomes the passive subject. With a modal, the end is infinitive passive: Die Rechnung muss geprüft werden. Sein + participle describes a resulting state: Die Rechnung ist geprüft. These are different messages. Konjunktiv II can soften a request, express a hypothetical alternative or describe an unreal past. Könnten Sie die Rechnung prüfen? is a request, not a claim about ability. Wenn wir früher geprüft hätten, hätten wir den Fehler entdeckt is an unreal past. Use forms according to meaning, not as decorative politeness everywhere.",
    example: [
      "Die Rechnung muss vor der Freigabe geprüft werden. Könnten Sie die Prüfung übernehmen?",
      "The invoice must be checked before approval. Could you take care of the check?",
    ],
    steps: [
      { label: "Actor", detail: "Buchhaltung prüft die Rechnung" },
      { label: "Process", detail: "Die Rechnung wird geprüft" },
      { label: "Obligation", detail: "Sie muss geprüft werden" },
      { label: "Result", detail: "Sie ist geprüft" },
    ],
    reading: {
      title: "A proposed invoice workflow",
      body: "Bisher prüft die Buchhaltung Rechnungen erst am Freitagnachmittag. Danach gibt die Teamleitung die Zahlungen frei. Bei Rückfragen wird die Rechnung bis zur nächsten Woche zurückgestellt. Eine Mitarbeiterin schlägt vor, eingehende Rechnungen täglich zu erfassen und unklare Angaben sofort an die zuständige Person weiterzuleiten. Die Prüfung müsste weiterhin vor der Freigabe erfolgen. Ein automatischer Zahlungslauf ohne Kontrolle ist nicht vorgesehen. Die Leitung bittet um einen vierwöchigen Test und um eine Liste der aufgetretenen Rückfragen. Erst danach soll über eine dauerhafte Änderung entschieden werden.",
    },
    tip: "Replace only the grammar needed for the communicative move. A polite request still needs a responsible person and a deadline. For passive with a modal, build from right to left: geprüft → geprüft werden → muss geprüft werden. For an unreal past, ask whether the event actually happened before selecting hätte/wäre + participle.",
    checks: [
      {
        prompt: "Complete the process passive: Die Rechnung ___ geprüft.",
        answer: "wird",
        why: "Werden + participle describes the process.",
      },
      {
        prompt: "Complete: Die Rechnungen müssen geprüft ___.",
        answer: "werden",
        why: "After müssen, the passive has the infinitive werden.",
      },
      {
        prompt: "Does the proposal remove the pre-payment check?",
        answer: "No, the check remains necessary.",
        options: [
          "Yes, all payments become automatic.",
          "No, the check remains necessary.",
          "Only during the test.",
        ],
        why: "The proposal explicitly preserves the check before approval.",
      },
      {
        prompt:
          "Complete a polite request: ___ Sie mir die Rückfragen schicken? Use können in Konjunktiv II.",
        answer: "Könnten",
        why: "Könnten is the polite Konjunktiv II form; it begins the sentence.",
        exit: true,
      },
    ],
    task: {
      prompt:
        "Explain the proposed workflow in 100–130 words. Include two passive clauses, three polite requests to named roles and two hypothetical improvements. Keep the four-week trial and later decision explicit.",
      rubric: writing,
    },
    reflection:
      "Which sentence describes a process, and which describes its completed result?",
  },
  {
    id: "B2-07-L01",
    stage: "bridge",
    title: "Connect ideas without changing the logic",
    de: "Obwohl, deshalb, damit",
    objectives: [
      "Distinguish cause, concession and purpose.",
      "Use relative and infinitive clauses with clear reference.",
    ],
    prerequisites: ["B2-01-L01"],
    skills: ["connectors"],
    references: ["connectors", "clauses"],
    vocabulary: ["termin", "team", "projekt", "lieferung"],
    explanation:
      "A connector is a logical instruction. Weil gives a reason; obwohl introduces something that would normally lead to a different result. Deshalb signals a consequence and occupies a position in a main clause, so the finite verb follows it. Damit expresses a purpose and allows a different subject. Um … zu normally uses the same understood subject as the main clause. Relative clauses add information about a noun. The noun supplies the relative pronoun's gender and number; the pronoun's role inside the relative clause supplies its case. In der Kunde, dem wir schreiben, Kunde is masculine but schreiben gives the pronoun dative. Put commas around the subordinate clause. An advanced sentence remains useful only if its reference and logic are clear.",
    example: [
      "Obwohl die Lieferung verspätet ist, können wir beginnen. Wir haben Ersatzmaterial bestellt, damit das Team weiterarbeiten kann.",
      "Although the delivery is late, we can begin. We ordered replacement material so that the team can continue working.",
    ],
    table: {
      title: "Three different sentence patterns",
      headers: ["Meaning", "Pattern", "Example"],
      rows: [
        ["Cause", "weil + verb final", "…, weil Material fehlt."],
        [
          "Consequence",
          "deshalb + finite verb",
          "Deshalb verschieben wir den Termin.",
        ],
        [
          "Purpose",
          "um … zu + infinitive",
          "Wir prüfen, um Fehler zu vermeiden.",
        ],
      ],
    },
    reading: {
      title: "A project update",
      body: "Die neue Schulung soll am Montag beginnen. Obwohl die bestellten Handbücher erst am Mittwoch eintreffen, bleibt der Termin bestehen. Die Trainerin hat eine digitale Fassung erstellt, damit alle Teilnehmenden Zugang zu den Übungen haben. Die Kollegin, der die Raumplanung übertragen wurde, hat zusätzlich einen kleineren Raum reserviert. Er dient als Ausweichraum, falls die Technik im Hauptsaal ausfällt. Das Team prüft die Geräte am Freitag, um technische Probleme frühzeitig zu erkennen. Sollte die Prüfung scheitern, informiert die Trainerin die Teilnehmenden bis 15 Uhr. Die fehlenden Bücher allein führen also nicht zu einer Verschiebung.",
    },
    tip: "Before inserting a connector, say the relationship in plain English. Then choose main-clause or subordinate-clause word order. For relatives, replace the relative pronoun with the noun inside the small clause: Wir schreiben dem Kunden → dem. A connector exercise is also a meaning exercise.",
    checks: [
      {
        prompt:
          "Complete: Die Bücher fehlen. ___ findet die Schulung statt. Choose the concessive main-clause connector.",
        answer: "Trotzdem",
        options: ["Deshalb", "Trotzdem", "Damit"],
        why: "The training happens despite the missing books; it is not caused by their absence.",
      },
      {
        prompt:
          "Complete: die Kollegin, ___ die Raumplanung übertragen wurde. Write the pronoun.",
        answer: "der",
        why: "Etwas wird jemandem übertragen; feminine dative is der.",
      },
      {
        prompt:
          "Complete with one word: Wir prüfen die Technik, ___ Probleme zu erkennen.",
        answer: "um",
        why: "The same team performs both actions, so um … zu is possible.",
      },
      {
        prompt: "What triggers notification by 15 Uhr?",
        answer: "A failed equipment check",
        options: [
          "Late handbooks",
          "A failed equipment check",
          "The smaller room",
        ],
        why: "The notification is conditional on the equipment check failing.",
        exit: true,
      },
    ],
    task: {
      prompt:
        "Write a 110–140-word update about a delayed training event. Use one cause, one concession, one condition, one purpose, one relative clause and one infinitive clause. Keep the relationships factually consistent.",
      rubric: writing,
    },
    reflection: "Could swapping weil for obwohl reverse your message?",
  },
  {
    id: "B2-09-L01",
    stage: "bridge",
    title: "Keep a phone call on track",
    de: "Habe ich Sie richtig verstanden?",
    objectives: [
      "Clarify names, numbers and responsibilities.",
      "Repair a misunderstanding and confirm the next action.",
    ],
    prerequisites: ["B2-01-L01"],
    skills: ["speaking", "interaction"],
    references: ["conversation", "numbers"],
    vocabulary: ["termin", "kunde", "anrufen", "bestatigen"],
    explanation:
      "A successful call is a shared record of the next action. Open with your name and purpose, divide information into short chunks, and verify information that could cause a practical error. Do not simply repeat Wie bitte? Use targeted requests: Meinen Sie den vierzehnten oder den vierzigsten? Ask for a name to be spelled and read back the date, time and responsibility. Repair does not require blame: Dann habe ich Sie missverstanden. Ich korrigiere das. If you cannot promise a result, promise a realistic next communication instead. When spelling, use clear letter names or an agreed spelling alphabet; do not invent a universal German alphabet and assume the other person shares it.",
    example: [
      "Nur damit ich es richtig notiere: Sie benötigen zwölf Geräte bis Donnerstag, den 14. Mai. Ist das korrekt?",
      "Just so I note it correctly: you need twelve devices by Thursday, 14 May. Is that right?",
    ],
    table: {
      title: "Four useful repair moves",
      headers: ["Purpose", "Phrase"],
      rows: [
        ["Check a contrast", "Meinen Sie vierzehn oder vierzig?"],
        ["Clarify a name", "Könnten Sie den Nachnamen bitte buchstabieren?"],
        ["Confirm action", "Ich kläre das und melde mich bis 16 Uhr."],
        [
          "Repair your error",
          "Entschuldigung, ich hatte Dienstag notiert. Richtig ist Donnerstag.",
        ],
      ],
    },
    reading: {
      title: "Your call brief",
      body: "Sie arbeiten im Kundenservice. Herr Voss hat zwölf Geräte bestellt. In Ihrer Notiz steht als Lieferdatum Dienstag, der 12. Mai. In seiner Bestätigung steht Donnerstag, der 14. Mai. Er benötigt die Geräte jedoch spätestens Mittwochabend für eine Schulung. Sie dürfen keine frühere Lieferung garantieren. Sie können beim Lager nachfragen und ihm bis heute 16 Uhr eine verbindliche Rückmeldung geben. Klären Sie zunächst, welches Datum dokumentiert ist und welches Datum er benötigt. Wiederholen Sie die Stückzahl. Fragen Sie nach einer geeigneten Rückrufnummer. Beenden Sie das Gespräch mit einer Zusammenfassung, nicht mit einer unklaren Zusage.",
    },
    tip: "Prepare facts, not a memorized speech. During practice, introduce one unexpected change and ask a genuine follow-up. Record the spontaneous response. A typed dialogue can practise phrases, but it cannot show your pronunciation, listening or real-time fluency.",
    checks: [
      {
        prompt: "Which action are you authorized to promise?",
        answer: "A response by 16 Uhr",
        options: [
          "Delivery on Tuesday",
          "A response by 16 Uhr",
          "Free replacement devices",
        ],
        why: "The brief allows an inquiry and a response, not an earlier guaranteed delivery.",
      },
      {
        prompt: "Complete: Habe ich Sie richtig ___?",
        answer: "verstanden",
        why: "Verstehen forms verstanden without ge-.",
      },
      {
        prompt:
          "Complete: Ich melde mich ___ 16 Uhr. Use the deadline preposition.",
        answer: "bis",
        why: "Bis gives the latest time; um would state an exact time.",
      },
      {
        prompt: "What number of devices must you confirm? Write it as digits.",
        answer: "12",
        why: "The customer ordered twelve devices.",
        exit: true,
      },
    ],
    task: {
      type: "speaking",
      prompt:
        "Record a two-minute call opening and clarification based on the brief. Correct the date misunderstanding, verify the quantity and promise only the permitted next action. Then answer spontaneously: Was machen Sie, wenn das Lager bis 15 Uhr nicht antwortet?",
      rubric: [
        "Correctly distinguishes the documented and required dates.",
        "Uses targeted clarification and a repair.",
        "States who will do what by when.",
        "Spoken intelligibility and fluency require the recording.",
      ],
    },
    reflection:
      "Did your closing promise a delivery, or only the callback you can actually make?",
  },
  {
    id: "B2-10-L01",
    version: 2,
    stage: "bridge",
    title: "Summarize for the person who needs it",
    de: "Das Wesentliche weitergeben",
    objectives: [
      "Select relevant information without inventing facts.",
      "Paraphrase causes and recommendations for an audience.",
    ],
    prerequisites: ["B2-07-L01"],
    skills: ["mediation", "reading"],
    references: ["mediation", "connectors"],
    vocabulary: ["team", "projekt", "ergebnis", "empfehlen"],
    explanation:
      "A summary is not a shorter copy of every sentence. Decide what the recipient needs to do, select the facts that support that action, and preserve qualifications. Separate observation, explanation and proposal. A report may show that waiting time increased without proving why. Keep statements such as vermutlich, im Test and nach Angaben des Teams when they affect certainty. Paraphrase by changing both sentence structure and wording: Das Team führt eine Prüfung durch → Das Team prüft. Do not replace precise numbers with a vague improvement if the numbers matter. Conversely, omit background details that cannot influence the recipient's decision. Finish by checking every sentence against the source.",
    example: [
      "Der Bericht empfiehlt einen befristeten Test; eine dauerhafte Einführung wurde noch nicht beschlossen.",
      "The report recommends a limited trial; permanent introduction has not yet been decided.",
    ],
    steps: [
      { label: "Audience", detail: "What does this colleague need?" },
      { label: "Facts", detail: "Keep conditions, dates and quantities" },
      { label: "Paraphrase", detail: "Change structure; preserve meaning" },
      { label: "Audit", detail: "Can every claim be traced?" },
    ],
    reading: {
      title: "Internal review of the service desk",
      body: "In einem vierwöchigen Test beantwortete der Servicebereich einfache Anfragen über einen gemeinsamen Posteingang. Zuvor wurden diese Nachrichten an einzelne Beschäftigte geschickt. Die durchschnittliche erste Reaktionszeit sank im Test von zwei Arbeitstagen auf einen Arbeitstag. Bei komplexen Fällen zeigte sich dagegen keine erkennbare Veränderung. Zwei Teammitglieder berichten, dass die gemeinsame Ablage die Vertretung erleichtert habe. Diese Einschätzung wurde nicht durch eine gesonderte Befragung überprüft. Gleichzeitig gingen drei Anfragen vorübergehend an zwei Bearbeitende, weil die Zuständigkeit nicht sofort sichtbar war. Alle drei Fälle wurden am selben Tag geklärt. Die Arbeitsgruppe schlägt vor, eine verbindliche Kennzeichnung der zuständigen Person einzuführen und den Test um vier Wochen zu verlängern. Zusätzliche Stellen sind nicht vorgesehen. Eine Entscheidung über die dauerhafte Nutzung soll erst nach dem zweiten Testabschnitt fallen. Die Auswertung beruht auf 240 einfachen und 60 komplexen Anfragen. Erfasst wurde jeweils die Zeit bis zur ersten inhaltlichen Antwort, nicht bis zur vollständigen Lösung. Automatische Eingangsbestätigungen zählten dabei nicht als Antwort. Da im Vergleichsmonat mehrere Feiertage lagen und die Zusammensetzung der Anfragen abwich, lässt sich aus dem Zeitvergleich allein noch keine verlässliche Wirkung des gemeinsamen Posteingangs ableiten. Die Arbeitsgruppe empfiehlt deshalb, im nächsten Abschnitt zusätzlich die Fallart und die tatsächlichen Arbeitstage zu dokumentieren. Für die Teamleitung ist außerdem wichtig, dass die neue Ablage keine automatische Zugriffsberechtigung für alle Beschäftigten schafft. Nachrichten mit personenbezogenen Angaben sollen weiterhin nur den zuständigen Bearbeitenden zugänglich sein. Vor einer Ausweitung prüft die Datenschutzbeauftragte, ob die vorgesehenen Rollen ausreichen. Ihre Zustimmung liegt noch nicht vor. Eine Schulung zur Kennzeichnung kann dagegen bereits vorbereitet werden, weil diese auch im bisherigen Verfahren hilfreich wäre. Die vorgeschlagene Regel ist einfach: Wer einen Fall übernimmt, trägt den eigenen Namen und den Zeitpunkt ein. Bei einer Übergabe wird die neue zuständige Person ausdrücklich genannt. Eine bloße Markierung als gelesen genügt nicht. Die drei Doppelbearbeitungen zeigen, warum diese Unterscheidung nötig ist; sie belegen jedoch nicht, dass das gesamte Verfahren ungeeignet wäre. Für den zusätzlichen Testabschnitt werden keine neuen Stellen beantragt. Die Teams sollen zunächst prüfen, ob sich die Pflege der Liste in die vorhandenen Übergaben einbauen lässt. Sollte dadurch regelmäßig Mehrarbeit entstehen, muss die Leitung vor einer dauerhaften Einführung erneut entscheiden. Ein verbindliches Einsparziel ist bisher nicht festgelegt. Der nächste Zwischenbericht soll der Teamleitung am Ende der zweiten Testwoche vorliegen. Er soll die offenen Fälle, mögliche Doppelbearbeitungen und den Aufwand für die Kennzeichnung getrennt ausweisen. Erst danach wird entschieden, ob weitere Bereiche einbezogen werden. Beschäftigte können bis dahin über ihre Teamleitung konkrete Verbesserungsvorschläge einreichen; eine allgemeine Zufriedenheitsbefragung ist für diese Phase nicht vorgesehen.",
    },
    tip: "Highlight facts in one color and proposals in another, with labels as well as colors. Draft from your notes instead of looking at each source sentence. Then audit quantities and certainty. The phrase laut Bericht identifies a source; it does not make unsupported conclusions true.",
    checks: [
      {
        prompt: "Which cases showed a shorter first response time?",
        answer: "Simple inquiries",
        options: ["All cases", "Simple inquiries", "Only complex cases"],
        why: "The reduction was reported for simple inquiries; complex cases showed no clear change.",
      },
      {
        prompt:
          "Write the new average response time in German: ___ Arbeitstag.",
        answer: "ein",
        why: "It fell from two working days to one working day.",
      },
      {
        prompt: "Is permanent use already decided?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The decision is postponed until after the second trial period.",
      },
      {
        prompt: "Complete: Der Bericht schlägt ___, den Test zu verlängern.",
        answer: "vor",
        why: "Vorschlagen is separable; the finite main clause places vor at the end.",
        exit: true,
      },
    ],
    task: {
      skill: "mediation",
      prompt:
        "Write a 90–110-word summary for a colleague covering response time, the responsibility problem, the proposed change and the undecided permanent rollout. Attribute the unverified staff impression accurately.",
      rubric: [
        "Preserves the relevant findings and numbers.",
        "Distinguishes findings, reported impressions and proposals.",
        "Does not invent a cause, staffing change or decision.",
        "Uses a coherent paraphrase suitable for a colleague.",
      ],
    },
    reflection:
      "Which word in your summary preserves the source's uncertainty?",
  },
  {
    id: "B2-11-L01",
    stage: "bridge",
    title: "Read for the decision, then for the evidence",
    de: "Überblick, Details, Schlussfolgerung",
    objectives: [
      "Separate gist, detail and supported inference.",
      "Find exceptions and deadlines in a workplace notice.",
    ],
    skills: ["reading"],
    references: ["comprehension", "numbers"],
    vocabulary: ["termin", "mitarbeiter", "antrag", "frist"],
    explanation:
      "Read a workplace text in three passes. First identify its purpose and audience. Next identify the question you need to answer; search for the relevant passage rather than translating every word. Finally verify the exact condition, negation, exception or deadline. A supported inference follows from the text; a plausible workplace habit does not. Words such as nur, spätestens, sofern and ausgenommen often decide an answer. For a date change, distinguish application date, effective date and deadline. If two options are partly true, choose the one whose complete claim is supported. Keep reading and listening evidence separate: a printed transcript is a reading task even when it resembles a call.",
    example: [
      "Anträge, die nach dem 15. eingehen, werden erst im Folgemonat berücksichtigt.",
      "Applications received after the 15th are not considered until the following month.",
    ],
    table: {
      title: "Three question types",
      headers: ["Question", "Evidence to find"],
      rows: [
        ["What is the notice for?", "Main communicative purpose"],
        ["Which date applies?", "Exact condition and deadline"],
        [
          "What can we conclude?",
          "A necessary implication, not outside knowledge",
        ],
      ],
    },
    reading: {
      title: "Training applications",
      body: "Ab Oktober werden interne Fortbildungen über ein neues Formular beantragt. Beschäftigte reichen den Antrag bei ihrer Teamleitung ein. Für Veranstaltungen im November muss er spätestens am 15. Oktober vollständig vorliegen. Unvollständige Anträge gelten erst dann als eingegangen, wenn die fehlenden Angaben ergänzt wurden. Fachlich notwendige Pflichtschulungen sind von dieser monatlichen Frist ausgenommen; sie müssen dennoch mit der Teamleitung abgestimmt werden. Eine automatische Zusage ist mit der Abgabe nicht verbunden. Über die Kostenübernahme informiert die Personalabteilung schriftlich. Bereits vor dem 1. Oktober genehmigte Veranstaltungen müssen nicht erneut beantragt werden. Bei technischen Schwierigkeiten kann das Formular als PDF per interner E-Mail geschickt werden. Eine telefonische Anmeldung ersetzt den Antrag nicht.",
    },
    tip: "Underline the exact words that would make the wrong option wrong. If an answer depends on a rule from your own workplace, ask whether that rule appears in this text. Work efficiently, but do not confuse skimming with skipping qualifiers.",
    checks: [
      {
        prompt:
          "An application is submitted on 14 October but completed on 16 October. Is the regular November deadline met?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Only a complete application counts as received; 16 October is after the deadline.",
      },
      {
        prompt: "What kind of training is exempt from the monthly deadline?",
        answer: "Mandatory job-related training",
        options: [
          "All free training",
          "Mandatory job-related training",
          "All online training",
        ],
        why: "Fachlich notwendige Pflichtschulungen are exempt, but still need coordination.",
      },
      {
        prompt:
          "Complete with the source word: Der Antrag muss ___ am 15. Oktober vorliegen.",
        answer: "spätestens",
        why: "Spätestens means no later than and includes 15 October.",
      },
      {
        prompt: "Who communicates the cost decision?",
        answer: "Personalabteilung",
        why: "The notice explicitly assigns the written cost decision to HR.",
        exit: true,
      },
    ],
    task: {
      skill: "reading",
      prompt:
        "A colleague says: ‘I phoned on the 14th, so my course is approved.’ Explain in 80–100 words the two unsupported assumptions and a usable next step. Quote at most two short phrases; otherwise paraphrase.",
      rubric: [
        "Identifies that a telephone call does not replace the application.",
        "Identifies that submission does not guarantee approval.",
        "Gives an accurate practical next step without promising approval.",
      ],
    },
    reflection: "Which answer did an exception change?",
  },
  {
    id: "B2-12-L01",
    stage: "bridge",
    title: "Make the move toward C1",
    de: "Präziser, klarer, flexibler",
    objectives: [
      "Improve precision without unnecessary complexity.",
      "Use a checkpoint to identify remaining repairs.",
    ],
    skills: ["checkpoint", "register"],
    references: ["editing", "connectors", "email"],
    vocabulary: ["problem", "ergebnis", "projekt", "empfehlen"],
    explanation:
      "The transition to C1 is not a collection of impressive words. It is more control over meaning, structure and audience. Replace vague reference with a precise noun when the reader might misunderstand it. Distinguish a cause from a possible explanation, and a recommendation from a decision. Use varied structures when they express those distinctions clearly. Nominal style can compact familiar information but can also obscure who acts. Compare Es erfolgt die Durchführung einer Überprüfung with Die IT prüft den Zugang. The second may be the better professional sentence. A useful checkpoint combines form checks with an original response. Passing a few gaps cannot certify your entire level, and strong reading does not supply missing spoken evidence.",
    example: [
      "Die Daten deuten auf längere Wartezeiten hin. Bevor wir zusätzliche Stellen beantragen, sollten wir die Ursachen genauer prüfen.",
      "The data suggest longer waiting times. Before requesting additional posts, we should investigate the causes more closely.",
    ],
    table: {
      title: "B2 idea → more controlled C1 version",
      headers: ["Initial message", "Refinement", "Purpose"],
      rows: [
        [
          "Das ist schlecht.",
          "Die Verzögerung gefährdet den vereinbarten Termin.",
          "Specific consequence",
        ],
        [
          "Wir machen das sicher.",
          "Wir können die Umsetzung nach der technischen Prüfung zusagen.",
          "Qualified commitment",
        ],
        [
          "Man muss etwas ändern.",
          "Ich empfehle, die Zuständigkeit vor Beginn festzulegen.",
          "Actionable recommendation",
        ],
      ],
    },
    reading: {
      title: "A rough update to revise",
      body: "Bei unserem Projekt gab es Probleme. Einige Sachen waren zu spät, und die Leute wussten nicht immer, wer das machen muss. Wir hatten drei Rückfragen von Kunden. Zwei betrafen fehlende Bestätigungen; bei der dritten ging es um eine falsche Lieferadresse. Ob die Verzögerungen durch das neue System entstanden sind, wissen wir noch nicht. Wir wollen nächste Woche eine gemeinsame Liste mit Verantwortlichen ausprobieren. Die Leitung hat den Test für zwei Wochen erlaubt. Danach prüfen wir die Ergebnisse. Wenn es gut läuft, könnte die Liste dauerhaft genutzt werden. Eine Entscheidung darüber gibt es noch nicht.",
    },
    tip: "Revise in three passes: meaning and completeness, reader guidance, then grammar. Keep a short record of your changes and why they help. Carry unresolved article, case or word-order errors into your next bridge practice; moving into C1 does not erase them.",
    checks: [
      {
        prompt: "Which conclusion about the new system is justified?",
        answer: "Its role in the delays is unknown.",
        options: [
          "It caused every delay.",
          "It had no effect.",
          "Its role in the delays is unknown.",
        ],
        why: "The source explicitly leaves causation unresolved.",
      },
      {
        prompt: "Complete: Wir sprechen mit den ___ (Verantwortliche, plural).",
        answer: "Verantwortlichen",
        why: "After den in dative plural, the nominalized adjective takes -en.",
        tag: "ADJ",
      },
      {
        prompt:
          "Complete: Bevor wir entscheiden, ___ wir die Ergebnisse. Use prüfen.",
        answer: "prüfen",
        why: "The subordinate clause occupies first position; the main finite verb follows it.",
        tag: "VPOS",
      },
      {
        prompt:
          "How many customer inquiries concerned missing confirmations? Write digits.",
        answer: "2",
        why: "Two of the three inquiries concerned confirmations; the third concerned an address.",
        exit: true,
      },
    ],
    task: {
      skill: "checkpoint",
      prompt:
        "Revise the update into a 140–170-word professional report. Preserve all three inquiries, uncertainty, responsibility-list trial and later decision. Explain three editing choices afterwards and identify one foundation you still need to practise.",
      rubric: [
        "Preserves facts and uncertainty without invented causes.",
        "Clarifies responsibility, trial duration and decision status.",
        "Uses cohesive paragraphs and accurate target structures.",
        "Justifies revisions by communicative benefit rather than complexity.",
      ],
    },
    reflection: "What became more precise, and what simply became longer?",
  },
];
export const expandedBridge = drafts.map(authorLesson);
