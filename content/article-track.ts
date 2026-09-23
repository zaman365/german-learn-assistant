import { authorLesson, type LessonDraft } from "./authoring";
const rubric = [
  "Uses the requested noun meanings, genders and plurals correctly.",
  "Selects case from the sentence construction, not the visible article alone.",
  "Uses adjective and noun endings accurately.",
  "Explains the distinction between a reliable pattern and a lookup decision.",
];
const base = {
  stage: "article" as const,
  references: ["gender", "articles", "noun-endings", "gender-patterns"],
  vocabulary: ["kunde", "vertrag", "angebot", "entscheidung"],
  skills: ["gender", "case"],
};
const data: LessonDraft[] = [
  {
    ...base,
    id: "ART-01-L01",
    title: "Keep gender and case in separate boxes",
    de: "Die Firma bleibt feminin",
    objectives: [
      "Retrieve dictionary gender before applying a case.",
      "Recognize article forms with several grammatical uses.",
    ],
    explanation:
      "Der does not always mean masculine. It can be feminine dative or genitive, and plural genitive. Die can be feminine singular or plural. Read the whole phrase and its construction. First retrieve the noun package, then identify number and case, then choose determiner, adjective and noun endings. A phrase such as der Leitung without a surrounding sentence may leave dative versus genitive unresolved. Say that honestly instead of guessing. Learning a noun with a workplace example helps connect lexical recall to use, but the example does not replace its dictionary gender. Color may help memory only when a written gender label remains available.",
    example: [
      "die Leitung → mit der Leitung → die Entscheidung der Leitung",
      "The noun remains feminine; mit requires dative, and the final phrase contains a genitive relation.",
    ],
    steps: [
      { label: "Noun package", detail: "die Leitung · die Leitungen" },
      { label: "Construction", detail: "mit + Dativ" },
      { label: "Number", detail: "Singular" },
      { label: "Ending", detail: "mit der Leitung" },
    ],
    reading: {
      title: "One article, different jobs",
      body: "Die Leitung informiert die Beschäftigten. Anschließend spricht ein Kollege mit der Leitung. Die Entscheidung der Leitung wird am Freitag bekannt gegeben. Die Beschäftigten stellen ihre Fragen schriftlich. Bei der Auswertung der Fragen hilft das Team. In diesen Sätzen erfüllen ähnliche Artikel unterschiedliche Aufgaben. Die Form allein reicht nicht immer aus, um den Kasus zu erkennen. Besonders wichtig ist, welches Verb oder welche Präposition die Wortgruppe bestimmt und welches Nomen durch ein Attribut näher beschrieben wird.",
    },
    tip: "Cover the full phrase. Retrieve the dictionary package, then reconstruct the case form. If only an isolated phrase is given and two analyses remain possible, keep both rather than inventing context.",
    checks: [
      {
        prompt: "What is Leitung's dictionary article?",
        answer: "die",
        why: "Leitung is feminine, including when its surface article is der.",
      },
      {
        prompt: "Which case follows mit?",
        answer: "Dativ",
        why: "Mit governs dative.",
      },
      {
        prompt:
          "Does isolated der Leitung determine dative versus genitive uniquely?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Both feminine dative and feminine genitive use der.",
      },
      {
        prompt: "Write the article in mit ___ Angeboten.",
        answer: "den",
        why: "Mit takes dative; plural definite article is den.",
      },
    ],
    task: {
      prompt:
        "Write six original workplace sentences using Leitung, Kunde and Angebot across all four cases. Explain gender and case separately for four phrases and identify one form that would be ambiguous without context.",
      rubric,
    },
    reflection: "Which article form used to make you guess the wrong gender?",
  },
  {
    ...base,
    id: "ART-02-L01",
    title: "Use real suffixes, not look-alike letters",
    de: "Die Lieferung, aber der Sprung",
    objectives: [
      "Apply reliable derivational patterns within their scope.",
      "Recognize words that only share final letters.",
    ],
    explanation:
      "A productive suffix is a word-building unit, not just the final spelling. Feminine -ung formations often derive from verbs: liefern → die Lieferung. Sprung and Schwung do not contain that derivational suffix. True -heit and -keit formations are feminine; diminutives in -chen and -lein are neuter. An infinitive used as a noun is neuter: das Prüfen. Do not apply the diminutive rule to every word ending in the letters chen: der Kuchen is not a diminutive formed with -chen. Always keep the noun's lexical form when a word is outside the rule's scope. Reliable patterns save lookup work only when identified correctly.",
    example: [
      "liefern → die Lieferung; springen → der Sprung",
      "Lieferung contains the productive suffix -ung; Sprung is a different formation.",
    ],
    table: {
      title: "Scope matters",
      headers: ["Pattern", "Valid example", "Look-alike limit"],
      rows: [
        ["-ung derivation", "die Lieferung", "der Sprung"],
        ["-chen diminutive", "das Häuschen", "der Kuchen"],
        ["-heit/-keit", "die Sicherheit", "not every matching letter string"],
        [
          "nominalized infinitive",
          "das Lernen",
          "learn lexical nouns separately",
        ],
      ],
    },
    reading: {
      title: "A word-family note",
      body: "Bei der Prüfung einer Lieferung entsteht eine Rückfrage. Das Prüfen der Angaben dauert wenige Minuten. Die Sicherheit der Entscheidung hängt von vollständigen Unterlagen ab. Ein Mitarbeiter nennt die neue Ablage scherzhaft sein kleines Büchlein. Daneben liegt ein Kuchen für die Pause. Nicht jedes Wort mit ähnlichen Endbuchstaben gehört zur selben Wortbildungsregel. Ordnen Sie die Wörter nach ihrer tatsächlichen Struktur und prüfen Sie den Artikel eines unklaren Grundwortes im internen Wortschatz.",
    },
    tip: "Ask which base and suffix you can identify. If you cannot justify the segmentation, call it a lookup case. Do not give a made-up percentage of reliability to a guess.",
    checks: [
      {
        prompt: "Write the article: ___ Sicherheit.",
        answer: "die",
        why: "The -heit formation is feminine.",
      },
      {
        prompt: "Write the article: ___ Häuschen.",
        answer: "das",
        why: "A diminutive with -chen is neuter.",
      },
      {
        prompt: "Is Kuchen covered by the diminutive -chen rule?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Kuchen is not formed with diminutive -chen.",
      },
      {
        prompt: "Write the dictionary package: article + Sprung.",
        answer: "der Sprung",
        why: "The final letters do not make Sprung a feminine -ung derivation.",
      },
    ],
    task: {
      prompt:
        "Build a ten-item rule sheet with true -ung, -heit/-keit, -chen/-lein and nominalized-infinitive examples. Add Sprung and Kuchen as scope warnings, then use six of your nouns in original case-marked sentences.",
      rubric,
    },
    reflection: "Which spelling shortcut needed a word-formation check?",
  },
  {
    ...base,
    id: "ART-03-L01",
    title: "Know when a clue is only a tendency",
    de: "Hinweis oder Regel?",
    objectives: [
      "Classify gender clues by certainty and scope.",
      "Retrieve exceptions instead of hiding them.",
    ],
    explanation:
      "Many useful gender clues are tendencies. A large number of nouns ending in -e are feminine, but der Kunde, der Name and das Ende are frequent exceptions. Meaning groups also have limits: days and months are normally masculine, but a larger compound follows its final noun. Occupational nouns refer to people, yet the grammatical form still matters: die Führungskraft can refer to people of any gender. Do not turn a learner's likely guess into a claimed rule. A good memory record labels a clue reliable pattern, tendency or lexical lookup and stores an exception beside a tendency. The aim is faster accurate retrieval, not never opening an internal entry.",
    example: [
      "die Aufgabe · der Kunde · das Ende",
      "The -e ending is a useful clue in some words, not a universal rule.",
    ],
    table: {
      title: "Three certainty labels",
      headers: ["Label", "Meaning", "Example"],
      rows: [
        ["reliable within scope", "known grammatical formation", "das Lernen"],
        [
          "tendency",
          "helpful but exception-prone",
          "many -e nouns are feminine",
        ],
        ["lookup", "lexical form required", "der Kunde · das Ende"],
      ],
    },
    reading: {
      title: "Two misleading shortcuts",
      body: "Ein Lernender notiert: „Alle Wörter auf -e sind feminin; alle Wörter für Männer sind maskulin.“ In seinem nächsten Text schreibt er deshalb die Kunde und der Führungskraft. Beide Entscheidungen verwechseln einen Hinweis mit einer festen Regel. Kunde ist ein maskulines Nomen; Führungskraft ist grammatisch feminin, unabhängig davon, welche Person gemeint ist. Für die Wiederholung braucht er zwei vollständige Nomenpakete und neue Sätze, in denen die Kasusformen ebenfalls geprüft werden. Eine bloße Korrektur der Farbe auf der Karte reicht nicht aus.",
    },
    tip: "When an exception surprises you, add a contrasting pair. Retrieve both, then use them after the same preposition. This tests lexical gender separately from the construction's shared case.",
    checks: [
      {
        prompt: "Write the dictionary article of Ende.",
        answer: "das",
        why: "Das Ende is an exception to the common feminine -e tendency.",
      },
      {
        prompt:
          "Does Führungskraft become grammatically masculine when the manager is a man?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The lexical noun remains feminine.",
      },
      {
        prompt: "Write the full phrase: mit + die Führungskraft.",
        answer: "mit der Führungskraft",
        why: "Mit requires feminine dative der.",
      },
      {
        prompt: "Classify the claim '-e always means feminine'.",
        answer: "An overgeneralization",
        options: ["A reliable rule", "An overgeneralization", "A plural rule"],
        why: "Common masculine and neuter counterexamples disprove the universal claim.",
      },
    ],
    task: {
      prompt:
        "Create six reliable-pattern examples, six tendency/exception pairs and four lookup-needed cases. Use Kunde, Name, Ende and Führungskraft in original sentences and explain the case independently.",
      rubric,
    },
    reflection:
      "Can you name the certainty and scope of your favorite memory trick?",
  },
  {
    ...base,
    id: "ART-04-L01",
    title: "Find the head of a compound",
    de: "Das Besprechungsprotokoll",
    objectives: [
      "Use the final noun to determine compound gender.",
      "Keep sense-dependent noun packages separate.",
    ],
    explanation:
      "In an ordinary German noun compound, the final noun is the grammatical head: die Besprechung + das Protokoll → das Besprechungsprotokoll. Linking elements such as -s- do not create a new gender rule. The head also guides plural formation. Meaning still needs attention: der Leiter can mean a male leader, while die Leiter means a ladder; these are different lexical senses. Das Band can mean a ribbon, der Band a volume of a book, and die Band a musical group. Store sense and plural together rather than forcing one article onto every spelling. Do not confuse a compound head with the final letters of a simplex noun.",
    example: [
      "die Lieferung + der Termin → der Liefertermin · die Liefertermine",
      "The compound inherits the head Termin's gender and plural pattern.",
    ],
    table: {
      title: "Sense belongs in the package",
      headers: ["Package", "Meaning", "Plural"],
      rows: [
        ["der Leiter", "male leader", "Leiter"],
        ["die Leiter", "ladder", "Leitern"],
        ["der Band", "book volume", "Bände"],
        ["das Band", "ribbon; strip", "Bänder"],
        ["die Band", "music group", "Bands"],
      ],
    },
    reading: {
      title: "A note with compounds",
      body: "Im Besprechungsprotokoll steht der neue Liefertermin. Die Projektleitung prüft außerdem die Zugriffsberechtigung für den gemeinsamen Ordner. Im Lager liegt eine Leiter neben dem Regalsystem. Der Leiter des Teams bittet darum, den Bereich freizuhalten. Für die Dokumentation wird ein zusätzlicher Aktenordner benötigt. Die ähnlichen Wortformen bestimmen ihren Artikel nicht durch die Situation allein: Entscheidend sind beim Kompositum das Grundwort und bei gleich geschriebenen Einzelwörtern die gemeinte lexikalische Bedeutung.",
    },
    tip: "Underline the final noun, retrieve its package, then reassemble the compound. For homographs, draw two distinct scenes and keep both plurals visible. A spelling-only flashcard cannot distinguish senses.",
    checks: [
      {
        prompt: "Write the article of Besprechungsprotokoll.",
        answer: "das",
        why: "The head is das Protokoll.",
      },
      {
        prompt: "Write the article of Zugriffsberechtigung.",
        answer: "die",
        why: "The head is die Berechtigung.",
      },
      {
        prompt: "Write article + plural of Band when it means a book volume.",
        answer: "die Bände",
        why: "Der Band has plural die Bände in the book-volume sense.",
      },
      {
        prompt: "Write article + noun for a ladder in the singular.",
        answer: "die Leiter",
        why: "The ladder sense is feminine, unlike the male-leader noun.",
      },
    ],
    task: {
      prompt:
        "Analyze ten workplace compounds by head, article and plural. Then write six sentences distinguishing Leiter and Band senses, with enough context to make the intended noun package clear.",
      rubric,
    },
    reflection: "Did a change of meaning also require a different plural?",
  },
  {
    ...base,
    id: "ART-05-L01",
    title: "Turn your own mistakes into retrieval practice",
    de: "Erkennen, abrufen, übertragen",
    objectives: [
      "Separate recognition from active recall.",
      "Use delayed new-context checks to test retention.",
    ],
    explanation:
      "Recognition and production are different tasks. Choosing die from three options is easier than retrieving die Entscheidung, die Entscheidungen and using mit einer schwierigen Entscheidung. A useful personal queue begins with a confirmed error, not with every noun you see. Record the complete noun package and a brief explanation of the actual mistake. Ambiguous gender/case errors need a probe: ask for dictionary gender and the construction's case separately. Review after a delay, cover the answer, and use a new context. A same-session repaired answer is valuable but not retained mastery. The app schedules retrieval by local calendar days and keeps assistance separate from independent work.",
    example: [
      "die Entscheidung → die Entscheidungen → mit einer schwierigen Entscheidung",
      "A package connects lexical recall, number, case and adjective agreement.",
    ],
    steps: [
      { label: "Confirm", detail: "What was actually wrong?" },
      { label: "Retrieve", detail: "Article + noun + plural" },
      { label: "Use", detail: "New workplace sentence" },
      { label: "Delay", detail: "Check on another day" },
    ],
    reading: {
      title: "A small error record",
      body: "Im ersten Versuch steht „mit ein neuer Vertrag“. Der Lernende nennt auf Nachfrage korrekt der Vertrag und weiß, dass mit den Dativ verlangt. Die Ursache liegt hier also nicht zwingend im gespeicherten Genus, sondern in der Umsetzung von Artikel- und Adjektivendungen. Nach der Erklärung schreibt er mit einem neuen Vertrag. Diese unmittelbare Reparatur wird gespeichert. Für den nächsten Tag erhält er einen anderen Satz mit Angebot; später folgt ein weiterer Kontext mit Vertrag. Erst unabhängige neue Anwendungen über mehrere Tage tragen eine Aussage über sichere Beherrschung.",
    },
    tip: "Use the error notebook to choose one high-impact pattern, not ten unrelated rules. Retrieve before revealing. If you need help, take it; the record can be honest and still guide useful learning.",
    checks: [
      {
        prompt: "Correct the phrase: mit ein neuer Vertrag.",
        answer: "mit einem neuen Vertrag",
        why: "Mit requires dative; masculine ein becomes einem and the adjective takes -en.",
      },
      {
        prompt: "Does an immediate copied correction demonstrate retention?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Retention requires delayed independent transfer.",
      },
      {
        prompt: "Write article + plural of Angebot.",
        answer: "die Angebote",
        why: "Das Angebot has plural die Angebote.",
      },
      {
        prompt: "Complete: mit einem ___ Angebot (neu).",
        answer: "neuen",
        why: "After inflected einem, the adjective uses mixed-pattern -en.",
      },
    ],
    task: {
      prompt:
        "Choose five nouns from your confirmed errors or this lesson. Record their packages, classify the actual error, create a new sentence for each and write a plan for a delayed unaided check. Do not label today's repaired repetitions retained.",
      rubric,
    },
    reflection:
      "Which error needs a gender probe rather than an assumed explanation?",
  },
];
export const articleLessons = data.map(authorLesson);
