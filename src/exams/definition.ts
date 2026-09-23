export const examDefinition = {
  id: "dtb-c1-paper-reference",
  version: "paper-2022-reviewed-2026-09-23-v1",
  deliveryMode: "paper",
  effectiveFrom: null,
  effectiveTo: "2027-04-30",
  verifiedAt: "2026-09-23",
  verificationStatus: "partial",
  blocks: [
    { id: "reading", title: "Lesen und Schreiben", seconds: 65 * 60 },
    { id: "listening", title: "Hören und Schreiben", seconds: 25 * 60 },
    { id: "writing", title: "Sprachbausteine und Schreiben", seconds: 45 * 60 },
    { id: "speaking", title: "Sprechen", seconds: 16 * 60 },
  ],
  sources: {
    blocks: {
      url: "https://shop.telc.net/media/catalog/product/file/1/0/1011430_22020524_5016-b00-010102_web.pdf",
      pages: "44–46",
    },
    scoring: {
      url: "https://shop.telc.net/media/catalog/product/file/1/0/1011430_22020524_5016-b00-010102_web.pdf",
      pages: "40–43, 47–49",
    },
    transition: {
      url: "https://www.telc.net/sprachpruefungen/deutsch-tests-fuer-den-beruf-digital/",
    },
  },
  unresolved: [
    "Authoritative clarification of exact pass-boundary inclusivity",
    "Navigation and editing permissions in the applicable examination",
    "Digital examination details for dates from 1 May 2027",
  ],
} as const;

export type Band = "A" | "B" | "C" | "D";
export type LanguageBand = "upper_c1" | "middle_c1" | "b2" | "below_b2";
const task = (band: Band, values: readonly number[]) =>
  values[["A", "B", "C", "D"].indexOf(band)];
const language = (band: LanguageBand, values: readonly number[]) =>
  values[["upper_c1", "middle_c1", "b2", "below_b2"].indexOf(band)];
export type WritingRating = {
  email: Band;
  statement: Band;
  organization: LanguageBand;
  accuracy: LanguageBand;
  range: LanguageBand;
  note: {
    names: boolean;
    contact: boolean;
    information: boolean;
    action: boolean;
  };
};
export type SpeakingRating = {
  topic: Band;
  followup: Band;
  mediation: Band;
  conversation: Band;
  problem: Band;
  pronunciation: LanguageBand;
  accuracy: LanguageBand;
  range: LanguageBand;
};
// All arithmetic uses half-points: these arrays contain twice the published points.
export function writingHalfPoints(
  rating: WritingRating,
  languageItemsCorrect: number,
) {
  if (
    !Number.isInteger(languageItemsCorrect) ||
    languageItemsCorrect < 0 ||
    languageItemsCorrect > 12
  )
    throw new Error("Invalid language-element count.");
  return (
    task(rating.email, [14, 10, 6, 0]) +
    task(rating.statement, [28, 21, 11, 0]) +
    [rating.organization, rating.accuracy, rating.range].reduce(
      (sum, band) => sum + language(band, [18, 14, 7, 0]),
      0,
    ) +
    Number(rating.note.names) +
    Number(rating.note.contact) +
    Number(rating.note.information) * 8 +
    Number(rating.note.action) * 2 +
    languageItemsCorrect
  );
}
export function speakingHalfPoints(rating: SpeakingRating) {
  return (
    task(rating.topic, [10, 7, 4, 0]) +
    task(rating.followup, [10, 7, 4, 0]) +
    task(rating.mediation, [4, 3, 2, 0]) +
    task(rating.conversation, [16, 12, 6, 0]) +
    task(rating.problem, [20, 15, 8, 0]) +
    [rating.pronunciation, rating.accuracy, rating.range].reduce(
      (sum, band) => sum + language(band, [20, 15, 8, 0]),
      0,
    )
  );
}
export function readiness(
  attempts: {
    mockId: string;
    complete: boolean;
    unseen: boolean;
    valid: boolean;
    skills: (number | null)[];
  }[],
  recurringRepair = false,
) {
  const eligible = attempts.filter(
    (a) =>
      a.complete &&
      a.unseen &&
      a.valid &&
      a.skills.length === 4 &&
      a.skills.every((s) => s !== null),
  );
  const target = eligible.filter(
    (a) =>
      a.skills.every((s) => s! >= 36) &&
      a.skills.reduce<number>((n, s) => n + s!, 0) >= 156,
  );
  return {
    officialVerdict: "unresolved" as const,
    overall: "incomplete" as const,
    projectTargetMet:
      new Set(target.map((a) => a.mockId)).size >= 2 && !recurringRepair,
    eligibleMockIds: eligible.map((a) => a.mockId),
    reason:
      "Official pass rules are not fully verified. Project targets are coaching milestones, not a probability of passing.",
  };
}
