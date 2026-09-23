import { authorLesson, type LessonDraft } from "./authoring";
const rubric = [
  "Completes the requested spoken contrasts and new sentences.",
  "The recording is intelligible enough for the communicative task.",
  "Uses deliberate stress or rhythm appropriate to the intended meaning.",
  "Sound-dependent judgments use actual audio; unsupported dimensions stay unassessed.",
];
const base = {
  stage: "pronunciation" as const,
  references: ["pronunciation"],
  vocabulary: ["vertrag", "angebot", "termin"],
  skills: ["pronunciation"],
  minutes: 15,
};
const data: LessonDraft[] = [
  {
    ...base,
    id: "PR-01-L01",
    audioId: "audio-pronunciation-01",
    title: "Hear and produce vowel contrasts",
    de: "Bieten und bitten; schon und schön",
    objectives: [
      "Notice length and quality together.",
      "Use an umlaut contrast in a new sentence.",
    ],
    explanation:
      "German vowel contrasts often involve both duration and quality. Stretching a short vowel does not automatically produce the corresponding long vowel. Use a checked audio model to notice the difference, then record a meaningful sentence. Bieten and bitten contrast a long close vowel with a shorter more open one. Schon and schön differ in vowel quality, not merely in spelling. Umlaut dots are part of the word, not decorative marks. Lip rounding and tongue position work together for ö and ü. A written explanation can guide attention; it cannot establish how your recording actually sounds.",
    example: [
      "Könnten Sie mir bitte ein Angebot bieten? Das wäre schön.",
      "Could you please offer me a quotation? That would be nice. The wording is for deliberate sound practice.",
    ],
    table: {
      title: "Meaning contrasts",
      headers: ["Word", "Meaning", "Contrast"],
      rows: [
        ["bieten / bitten", "offer / ask", "long/short i quality"],
        ["schon / schön", "already / nice", "o/ö quality"],
        ["Bruder / Brüder", "brother / brothers", "u/ü with number change"],
      ],
    },
    reading: {
      title: "Your speaking brief",
      body: "Sie bitten eine Kollegin um ein Angebot. Danach erklären Sie, dass die Unterlagen schon vorliegen und der neue Besprechungsraum schön ist. Sprechen Sie zunächst die Kontrastwörter einzeln, danach vollständige Sätze mit Ihrer eigenen Bedeutung. Hören Sie Ihre Aufnahme an, ohne auf den Text zu schauen. Notieren Sie, welche Wörter Sie selbst eindeutig verstehen. Die reine Schreibweise eines automatisch erkannten Transkripts beweist noch nicht, dass jeder Laut sicher ausgesprochen wurde.",
    },
    tip: "Use several short attempts, then one new sentence without reading. Compare meaning and intelligibility rather than trying to achieve a made-up phoneme percentage. Recordings remain private to your account.",
    checks: [
      {
        prompt:
          "Does lengthening a vowel always reproduce the correct German vowel quality?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Length and quality interact; duration alone is not enough.",
      },
      {
        prompt: "Which spelling means nice?",
        answer: "schön",
        options: ["schon", "schön"],
        why: "Schön means nice; schon means already.",
      },
      {
        prompt: "Write the plural of Bruder without its article.",
        answer: "Brüder",
        why: "The plural has an umlaut.",
      },
    ],
    task: {
      type: "speaking",
      skill: "pronunciation",
      prompt:
        "Record bieten/bitten and schon/schön twice, then four original workplace sentences using the contrasts. End with one spontaneous request. Assessment must use the recording, not its typed script.",
      rubric,
    },
    reflection:
      "Which contrast changed meaning most clearly in your recording?",
  },
  {
    ...base,
    id: "PR-02-L01",
    audioId: "audio-pronunciation-02",
    title: "Keep consonant contrasts intelligible",
    de: "Ich, auch, Tag und Tage",
    objectives: [
      "Notice ich/ach contexts and final devoicing.",
      "Use an extended word form to compare consonants.",
    ],
    explanation:
      "The common ich and ach sounds occur in different vowel contexts, but borrowed words and regional varieties add exceptions. Avoid reducing every written ch to one sound. In many standard pronunciations, voiced written b, d and g become voiceless at a word's end: Tag ends differently from the g between vowels in Tage. A spelling change is not required. Compare a base form and an inflected form to hear the contrast. Do not infer poor pronunciation from a recognizer's spelling error, or correct a valid regional form automatically. The target is intelligible German in the task's context.",
    example: [
      "Ich brauche die Unterlagen auch am nächsten Tag. An anderen Tagen reicht eine Kopie.",
      "I also need the documents on the next day. On other days a copy is enough.",
    ],
    table: {
      title: "Listen in context",
      headers: ["Pair", "Attention"],
      rows: [
        ["ich / auch", "front versus back fricative"],
        ["Tag / Tage", "final consonant versus between vowels"],
        ["Rad / Räder", "devoicing plus vowel change"],
      ],
    },
    reading: {
      title: "A delivery explanation",
      body: "Sie erklären, an welchem Tag ein Paket ankommt und an welchen Tagen jemand vor Ort ist. Verwenden Sie ich und auch in einer natürlichen Aussage. Sprechen Sie Tag und Tage zuerst nebeneinander, dann innerhalb Ihrer Erklärung. Die verständliche Unterscheidung der Wörter ist wichtiger als eine künstlich überdeutliche Aussprache jedes Buchstabens. Eine spätere Aufnahme soll zeigen, ob das Muster auch in einem neuen Satz verfügbar ist.",
    },
    tip: "Record the pair and then the whole sentence. Listen for connected speech rather than judging only isolated words. If the audio is noisy or too quiet, improve the recording before drawing conclusions.",
    checks: [
      {
        prompt: "Does final devoicing require changing the written g in Tag?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The spelling remains Tag.",
      },
      {
        prompt: "Which form extends Tag with a vowel?",
        answer: "Tage",
        why: "Tage places g before the ending's vowel.",
      },
      {
        prompt: "Can a transcript alone establish your ich/ach pronunciation?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The actual audio is required.",
      },
    ],
    task: {
      type: "speaking",
      skill: "pronunciation",
      prompt:
        "Record ich/auch and Tag/Tage in pairs, then explain a two-day delivery plan in 45–60 seconds. Include at least three new sentences rather than only reading the example.",
      rubric,
    },
    reflection: "Did the contrast remain audible in connected speech?",
  },
  {
    ...base,
    id: "PR-03-L01",
    audioId: "audio-pronunciation-03",
    title: "Put stress where the word needs it",
    de: "ANrufen, verSTEHen",
    objectives: [
      "Notice stress in prefixes and compounds.",
      "Store stress alongside meaning and grammar.",
    ],
    explanation:
      "Stress can distinguish word structure and sometimes meaning. Many separable prefixes carry stress, while common inseparable prefixes do not: ANrufen versus verSTEHen. German noun compounds often emphasize the first component, with secondary stress possible in longer words. Borrowed words have lexical stress patterns that need checking rather than a universal first-syllable rule. Learn stress with the noun package or verb forms. Capitalized stress hints in the internal lexicon are learning cues, not standard German spelling. A stress pattern practised in one word should later be transferred to a new sentence at a natural pace.",
    example: [
      "Ich möchte Sie ANrufen, um den VerTRAG zu besprechen.",
      "I would like to call you to discuss the contract. Capitals mark learning stress cues only.",
    ],
    table: {
      title: "Useful stress cues",
      headers: ["Word", "Cue", "Limit"],
      rows: [
        ["anrufen", "ANrufen", "separable prefix"],
        ["verstehen", "verSTEHen", "inseparable prefix"],
        [
          "Liefertermin",
          "LIEfertermin",
          "compound with secondary stress possible",
        ],
        ["Termin", "TerMIN", "lexical stress"],
      ],
    },
    reading: {
      title: "A callback request",
      body: "Sie möchten einen Liefertermin bestätigen und einen Vertrag besprechen. Sagen Sie zunächst anrufen, verstehen, Vertrag und Termin einzeln. Danach formulieren Sie eine eigene Rückrufbitte mit den vier Wörtern. Vermeiden Sie, jede Silbe gleich stark zu betonen. Markieren Sie vor der Aufnahme die vermutete Hauptbetonung und vergleichen Sie danach Ihre tatsächliche Sprechweise. Ein richtig gesetztes Betonungszeichen im Text ist noch keine Aussage über den Klang Ihrer Aufnahme.",
    },
    tip: "Tap the stressed syllable once, then remove the tapping and speak naturally. Revisit the word in a different phrase tomorrow. Do not overgeneralize a prefix pattern to every borrowed word.",
    checks: [
      {
        prompt: "Which part is normally stressed in anrufen?",
        answer: "an",
        why: "The separable prefix an- carries stress.",
      },
      {
        prompt: "Is every German word stressed on its first syllable?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Termin and many other words provide counterexamples.",
      },
      {
        prompt: "Which syllable is stressed in Termin? Write the syllable.",
        answer: ["min", "MIN"],
        why: "The stress falls on the final syllable.",
      },
    ],
    task: {
      type: "speaking",
      skill: "pronunciation",
      prompt:
        "Record the four target words, a 45-second callback request and two spontaneous sentences with a new compound. Compare planned stress with actual audio evidence.",
      rubric,
    },
    reflection: "Which familiar word needed a lexical stress reminder?",
  },
  {
    ...base,
    id: "PR-04-L01",
    audioId: "audio-pronunciation-04",
    title: "Use sentence focus to express the contrast",
    de: "ICH schicke den Bericht",
    objectives: [
      "Change the intended focus with stress.",
      "Group a sentence into meaningful chunks.",
    ],
    explanation:
      "Sentence stress tells the listener what is new or contrasted. ICH schicke den Bericht contrasts the sender; ich schicke DEN BERICHT contrasts the item; ich schicke ihn MORGEN contrasts the date. These are not three different grammar rules, but different information choices. Pauses should group meaning rather than interrupt a noun phrase at random. In a long professional sentence, place a boundary after an introductory condition or before the important consequence. Intonation varies with context and speaker; do not reduce every question to a compulsory rising pattern. Plan the intended meaning, then judge the recording against that intention.",
    example: [
      "Nicht heute: Ich schicke den Bericht MORGEN.",
      "Not today: I will send the report TOMORROW.",
    ],
    table: {
      title: "One sentence, three meanings",
      headers: ["Focus", "Contrast"],
      rows: [
        ["ICH schicke den Bericht.", "I do it, not someone else."],
        ["Ich schicke DEN BERICHT.", "The report, not another item."],
        ["Ich schicke ihn MORGEN.", "Tomorrow, not today."],
      ],
    },
    reading: {
      title: "Three misunderstandings",
      body: "Eine Kollegin denkt, ein anderer Mitarbeiter werde den Bericht schicken. Danach glaubt sie, Sie würden nur eine kurze Nachricht senden. Schließlich versteht sie als Termin heute statt morgen. Korrigieren Sie jede Annahme mit fast demselben Satz, aber einem anderen Fokus. Ergänzen Sie jeweils einen kurzen Kontext, damit die beabsichtigte Bedeutung klar ist. Nehmen Sie anschließend eine längere Erklärung mit zwei sinnvollen Pausengruppen auf.",
    },
    tip: "State the misunderstanding first, then record the correction. This makes the intended contrast testable. A transcription may contain identical words for all three versions; audio is what distinguishes them.",
    checks: [
      {
        prompt:
          "Which word should carry the main contrast if the date is wrong?",
        answer: "morgen",
        why: "The correction contrasts the date.",
      },
      {
        prompt: "Can identical words express different focus through stress?",
        answer: "Yes",
        options: ["Yes", "No"],
        why: "The audio realization can highlight a different constituent.",
      },
      {
        prompt: "Should pauses split every word equally?",
        answer: "No",
        options: ["Yes", "No"],
        why: "Pauses should group meaning, not fragment it.",
      },
    ],
    task: {
      type: "speaking",
      skill: "pronunciation",
      prompt:
        "Record all three corrected meanings and a 60-second project update with planned chunks. State your intended focus before each version so the evaluator can compare intention with sound.",
      rubric,
    },
    reflection:
      "Could a listener identify the corrected assumption without seeing capitals?",
  },
  {
    ...base,
    id: "PR-05-L01",
    audioId: "audio-pronunciation-05",
    title: "Move from imitation to spontaneous fluency",
    de: "Nachsprechen, umformulieren, selbst erklären",
    objectives: [
      "Use a model for chunking without mistaking imitation for transfer.",
      "Explain a new situation at a manageable pace.",
    ],
    explanation:
      "Shadowing is a study technique: listen to a short model, notice chunks and stress, then speak alongside or just after it. It is useful preparation but not independent evidence because wording and timing are supplied. Follow it with a paraphrase and then a new task without the script. Fluency does not mean never pausing. Useful pauses organize thought; repeated restarts that obscure meaning may need a smaller planning chunk. Evaluate intelligibility, rhythm and task completion from actual audio. If a model clip is unavailable or unreviewed, do not pretend a printed passage was a listening or shadowing activity.",
    example: [
      "Nach der Prüfung erhalten Sie eine Rückmeldung. Falls Angaben fehlen, melden wir uns vorher.",
      "You will receive a response after the check. If information is missing, we will contact you sooner.",
    ],
    table: {
      title: "Three stages, different evidence",
      headers: ["Stage", "Support", "What it shows"],
      rows: [
        ["Shadow", "model audio and script", "supported imitation"],
        ["Paraphrase", "meaning notes", "controlled reformulation"],
        ["Transfer", "new brief only", "independent production"],
      ],
    },
    reading: {
      title: "A new explanation to transfer to",
      body: "Eine Kundin möchte wissen, wie ihr Antrag bearbeitet wird. Zunächst wird die Vollständigkeit geprüft. Bei fehlenden Angaben erhält sie eine gezielte Rückfrage. Erst danach beginnt die fachliche Bewertung. Einen festen Entscheidungstermin können Sie noch nicht nennen; eine erste Statusmeldung ist jedoch bis Freitag zugesagt. Erklären Sie diesen Ablauf in eigenen Worten und beantworten Sie anschließend die Nachfrage, ob die Statusmeldung bereits eine Zusage bedeutet. Nutzen Sie den Beispielsatz nur zur Vorbereitung, nicht als vollständige Antwort.",
    },
    tip: "Mark imitation as assisted. For transfer, close the script and change the situation. Use a short outline if needed, while recording that support honestly. Do not chase speed at the expense of accurate meaning.",
    checks: [
      {
        prompt: "Does shadowing alone establish independent transfer?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The model supplies language and timing.",
      },
      {
        prompt: "Does a status update mean the application is approved?",
        answer: "No",
        options: ["Yes", "No"],
        why: "The source promises information, not a positive decision.",
      },
      {
        prompt: "What comes before specialist review?",
        answer: "the completeness check",
        why: "The application is checked for completeness before substantive evaluation.",
      },
    ],
    task: {
      type: "speaking",
      skill: "pronunciation",
      prompt:
        "Record a 90-second explanation of the new application process and an unprepared answer to the approval question. Use your own words; the separate shadowing task is assisted practice.",
      rubric,
    },
    reflection:
      "Was your later explanation generated from meaning or recalled from the script?",
  },
];
export const pronunciationLessons = data.map(authorLesson).map((lesson) => {
  if (lesson.id !== "PR-05-L01") return lesson;
  const production = lesson.exercises[lesson.exercises.length - 1];
  lesson.exercises.splice(lesson.exercises.length - 1, 0, {
    ...production,
    id: "PR-05-L01-S01",
    prompt:
      "Listen to the reviewed model and shadow it once. Record your imitation. This supported task does not demonstrate independent transfer.",
    family: "supported-shadowing",
    transfer: false,
    exit: false,
    assistedByDesign: true,
  });
  return lesson;
});
