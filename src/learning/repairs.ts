import type { LexicalEntry } from "@/content/types";

export const correctionSkills: Record<string, string> = {
  GEN: "gender",
  CASE: "case",
  NOUN: "noun-endings",
  ADJ: "adjective-endings",
  VPOS: "word-order",
  VFORM: "verb-forms",
  PREP: "prepositions",
  CONN: "connectors",
  REG: "register",
  ORTH: "orthography",
};

export type RepairCheck = {
  id: string;
  family: string;
  date: string;
  createdAt: Date;
  correct: boolean;
  assisted: boolean;
  transfer: boolean;
  modality: string;
  tag?: string;
  skill: string;
};

/** Narrow pattern recovery is separate from broad mastery and retention. */
export function repairState(
  pattern: { skill: string; tag: string; rootCause: string; updatedAt: Date },
  checks: RepairCheck[],
) {
  if (pattern.rootCause.includes("needs_probe"))
    return { status: "needs_probe", resolutionEvidence: [] as string[] };
  const candidates = [...new Map(checks.map((c) => [c.id, c])).values()]
    .filter(
      (c) =>
        c.createdAt > pattern.updatedAt &&
        !c.assisted &&
        c.transfer &&
        c.modality !== "recognition" &&
        c.tag === pattern.tag &&
        c.skill === pattern.skill,
    )
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  const lastFailure = candidates.findLastIndex((c) => !c.correct);
  const successes = candidates.slice(lastFailure + 1);
  for (let i = 1; i < successes.length; i++) {
    const earlier = successes
      .slice(0, i)
      .find(
        (c) => c.date !== successes[i].date && c.family !== successes[i].family,
      );
    if (earlier)
      return {
        status: "resolved",
        resolutionEvidence: [earlier.id, successes[i].id],
      };
  }
  return {
    status: successes.length ? "retesting" : "open",
    resolutionEvidence: [] as string[],
  };
}

// Only diagnose a known singular noun after an unambiguous fixed preposition.
// Syncretic articles, two-way prepositions and unknown senses stay unresolved.
export function articleProbe(correction: string, vocabulary: LexicalEntry[]) {
  const match = correction
    .trim()
    .match(
      /^(mit|bei|aus|von|zu|für|ohne|durch|gegen)\s+(?:dem|der|den|das|die|einem|einer|einen)\s+([\p{L}]+)[.!?]?$/u,
    );
  if (!match) return null;
  const entries = vocabulary.filter(
    (entry) =>
      entry.type === "noun" && entry.word === match[2] && entry.article,
  );
  if (entries.length !== 1) return null;
  return {
    noun: entries[0].word,
    article: entries[0].article!,
    grammaticalCase: ["für", "ohne", "durch", "gegen"].includes(match[1])
      ? "accusative"
      : "dative",
    preposition: match[1],
  };
}
