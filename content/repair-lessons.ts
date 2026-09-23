import { authorLesson } from "./authoring";
import { lessonSchema } from "../src/content/types";
const first = authorLesson({
  id: "ART-05-L02",
  stage: "article",
  title: "Repair a whole noun phrase",
  de: "Genus, Kasus und Endungen getrennt prüfen",
  minutes: 20,
  objectives: [
    "Diagnose gender and case with separate questions.",
    "Apply quantifiers and noun endings in an original handover.",
  ],
  prerequisites: [],
  skills: ["case", "noun-endings", "adjective-endings"],
  references: ["articles", "noun-endings", "quantifiers", "negation"],
  vocabulary: [
    "vertrag",
    "kunde",
    "team",
    "name",
    "leiter-manager",
    "leiter-ladder",
    "datum",
    "zentrum",
  ],
  explanation:
    "A wrong article does not reveal why it was chosen. For mit der Vertrag, first ask for the dictionary form (der Vertrag), then the case required by mit (dative). Only those answers can distinguish a gender gap from a case gap. A correct probe does not erase the original error; it may have been a slip, and new independent use is still needed. Work in four steps: identify meaning and gender, choose case from the construction, choose determiner/adjective forms, and finally check the noun ending. Compare mit dem Kunden (weak singular) and mit den Teams (plural in -s, no extra -n). After alle, use alle neuen Verträge; after viele, use viele neue Verträge. The words do not have identical declension behavior.",
  example: [
    "Wir sprechen mit dem neuen Kunden über die Bedingungen des Vertrags.",
    "We speak with the new customer about the terms of the contract. Mit takes dative; sprechen über takes accusative; des Vertrags expresses the relation to the contract.",
  ],
  steps: [
    { label: "Meaning", detail: "der Leiter = manager; die Leiter = ladder" },
    { label: "Case", detail: "mit + Dativ; für + Akkusativ" },
    { label: "Agreement", detail: "mit dem neuen Kunden" },
    { label: "Noun", detail: "mit den Teams; des Namens" },
  ],
  table: {
    title: "Check the final noun form",
    headers: ["Package", "In context", "Reason"],
    rows: [
      ["der Kunde · Kunden", "mit dem Kunden", "Weak singular noun"],
      ["der Name · Namen", "die Schreibweise des Namens", "Mixed genitive"],
      ["das Team · Teams", "mit den Teams", "No extra dative -n after -s"],
      ["das Datum · Daten", "an beiden Daten", "Learn the plural stem"],
    ],
  },
  reading: {
    title: "Übergabe vor einem Kundenbesuch",
    body: "Zwei Teams bereiten den Besuch eines neuen Kunden vor. Der Vertrag ist noch nicht unterschrieben; nur die technischen Fragen sind geklärt. Die Kollegin am Empfang prüft die Schreibweise des Namens und die beiden möglichen Daten. Im Lager steht eine Leiter vor dem Schrank mit den Unterlagen. Der Leiter des Serviceteams bittet darum, den Zugang freizuhalten. Eine Kollegin meint, alle neuen Verträge seien bereits freigegeben. Tatsächlich gilt die Freigabe nur für einige Verträge. Vor dem Besuch muss das Team diese Einschränkung deutlich weitergeben.",
  },
  tip: "In your own response, choose new sentences instead of copying the example. If you have seen the solution, label that repetition as assisted and use a different task on a later day for evidence.",
  checks: [
    {
      prompt: "Write the complete phrase: mit + das Team (plural).",
      answer: "mit den Teams",
      why: "Mit requires dative. Teams already ends in -s, so there is no additional -n.",
      skill: "noun-endings",
      tag: "NOUN",
    },
    {
      prompt: "Complete: die Schreibweise ___ (der Name, genitive).",
      answer: "des Namens",
      why: "Name belongs to the mixed group: genitive des Namens.",
      skill: "noun-endings",
      tag: "NOUN",
    },
    {
      prompt:
        "Complete the whole phrase: mit ___ (alle + neu + Vertrag, plural).",
      answer: "allen neuen Verträgen",
      why: "Dative allen; weak adjective neuen; dative plural Verträgen.",
      skill: "adjective-endings",
      tag: "ADJ",
    },
    {
      prompt: "Which statement preserves the limit of approval?",
      options: [
        "Alle Verträge sind freigegeben.",
        "Nicht alle Verträge sind freigegeben.",
        "Kein Vertrag ist freigegeben.",
      ],
      answer: "Nicht alle Verträge sind freigegeben.",
      why: "Some approvals exist, but not all contracts are approved. Keine would go beyond the evidence.",
      skill: "reading",
      tag: "LEX",
    },
  ],
  task: {
    skill: "case",
    prompt:
      "Write six original handover sentences about a visit to a different workplace. Include a nominative subject, an accusative object, mit + dative, für + accusative, a genitive relationship and a plural dative. Underline each target phrase with brackets, then explain why its case is needed. Use the supplied noun packages, but invent a different visit and do not copy the reading.",
    rubric: [
      "Six original sentences cover all six requested constructions, with clear meaning.",
      "Every marked phrase uses the case required by its own construction; gender and case are explained separately.",
      "Determiner, adjective where used, and noun endings agree; accepted alternative word orders preserve meaning.",
    ],
  },
  reflection:
    "Which decision caused your difficulty: lexical gender, case selection, or the ending after those choices?",
});
first.exercises.at(-1)!.errorTag = "CASE";
const second = authorLesson({
  id: "ART-05-L03",
  stage: "article",
  title: "Transfer your repair to a new setting",
  de: "Neue Situation, selbstständige Entscheidung",
  minutes: 20,
  objectives: [
    "Use noun phrases in a new context without copying a correction.",
    "Distinguish lexical senses and preserve a factual restriction.",
  ],
  prerequisites: [],
  skills: ["case", "gender", "noun-endings"],
  references: ["gender", "articles", "noun-endings", "quantifiers"],
  vocabulary: [
    "zentrum",
    "thema",
    "datum",
    "band-volume",
    "band-ribbon",
    "gehalt-salary",
    "gehalt-content",
    "kunde",
  ],
  explanation:
    "A retest should change the communicative situation, not just the name in an old answer. Here you are organizing a small exhibition. The same spelling can represent different nouns: der Band is a book volume, das Band a ribbon; das Gehalt is salary, der Gehalt the content or substance of something. Choose the meaning before applying case. Plural changes can involve the stem: Zentren, Themen, Daten. In mit den Zentren, no extra -n follows the existing -n. For recall, close the word list before composing. If you need to reopen the explanation or ask for a hint, that is useful learning, but it remains assisted evidence.",
  example: [
    "Die Ausstellung zeigt einen alten Band neben einem roten Band.",
    "The exhibition shows an old book volume beside a red ribbon. Identical spelling does not imply identical gender or plural.",
  ],
  table: {
    title: "Sense before form",
    headers: ["Meaning", "Package", "Context"],
    rows: [
      ["Book volume", "der Band · Bände", "im zweiten Band"],
      ["Ribbon", "das Band · Bänder", "mit einem roten Band"],
      ["Salary", "das Gehalt · Gehälter", "die Höhe des Gehalts"],
      [
        "Informative content",
        "der Gehalt · usually singular here",
        "der informative Gehalt einer Aussage",
      ],
    ],
  },
  reading: {
    title: "Eine Ausstellung gemeinsam planen",
    body: "Zwei Bildungszentren planen eine Ausstellung über Berufe. Ein alter Band aus der Bibliothek soll in einer Vitrine liegen. Ein farbiges Band markiert den Weg zum Raum. Für einen Kunden ist ein zusätzlicher Besuch vorgesehen, doch der Termin steht noch nicht fest. Die Organisatorin sammelt drei Themenvorschläge. Nicht alle Vorschläge passen zum verfügbaren Platz. Sie möchte mit den beteiligten Teams zunächst die Auswahl besprechen. In einer Texttafel geht es um den Unterschied zwischen dem Gehalt eines Beschäftigten und den Einnahmen eines selbstständigen Betriebs; beide Zahlen sind ohne weitere Angaben nicht direkt vergleichbar.",
  },
  tip: "This is a separate transfer family. Complete it on a later local study day after the first clinic if you want it to contribute to separate-day evidence. Passing does not establish seven-day retention by itself.",
  checks: [
    {
      prompt:
        "Write the noun package, article and plural, for Band meaning a book volume. Format: article + noun; plural.",
      answer: "der Band; Bände",
      why: "The book-volume sense is masculine and has plural Bände.",
      skill: "gender",
      tag: "GEN",
    },
    {
      prompt: "Write the complete phrase: mit + zwei + Zentrum (plural).",
      answer: "mit zwei Zentren",
      why: "Zentrum has plural Zentren. It already ends in -n.",
      skill: "noun-endings",
      tag: "NOUN",
    },
    {
      prompt: "Write: für + der Kunde. Include the preposition.",
      answer: "für den Kunden",
      why: "Für requires accusative; weak Kunde also takes -n in this singular case.",
      skill: "case",
      tag: "CASE",
    },
    {
      prompt: "Does the text confirm a date for the additional visit?",
      answer: "No",
      options: ["Yes", "No"],
      why: "The visit is envisaged, but its date is not confirmed.",
      skill: "reading",
      tag: "LEX",
    },
  ],
  task: {
    skill: "case",
    prompt:
      "Create a six-sentence invitation and handover for a new exhibition of your own. Include: who organizes it (nominative), what they show (accusative), whom they work with (mit + dative), who receives extra information (für + accusative), whose materials are used (genitive), and which teams must reply (plural dative). Explain the case of every target phrase. Add a seventh sentence distinguishing a proposed visit from a confirmed date.",
    rubric: [
      "All six functions appear in original sentences, plus an accurate distinction between proposal and confirmation.",
      "Every target case is correctly selected and justified independently of lexical gender.",
      "Complete noun phrases have appropriate article and noun endings; valid alternative wording is accepted.",
    ],
  },
  reflection:
    "Can you explain your new choices without referring back to the original correction?",
});
second.exercises.at(-1)!.errorTag = "CASE";
export const repairLessons = [first, second].map((lesson) =>
  lessonSchema.parse(lesson),
);
