import { z } from "zod";
const record = z.record(z.string(), z.unknown()),
  notes = z.array(record).max(50000);
const legacyEntry = z
  .object({
    state: z.string().optional(),
    decision: z.string().optional(),
    lessons: z.unknown().optional(),
    next_review: z.string().nullable().optional(),
    flags: z.array(z.string()).optional(),
    evidence: z.array(z.unknown()).optional(),
  })
  .passthrough();
export const legacySchema = z
  .object({
    _schema: z.union([z.string(), record]).optional(),
    meta: record.optional(),
    profile: record.optional(),
    diagnostic: record.optional(),
    skills: z.record(z.string(), legacyEntry).optional(),
    modules: z.record(z.string(), legacyEntry).optional(),
    errors: notes.optional(),
    writing_samples: notes.optional(),
    mocks: notes.optional(),
    human_checks: notes.optional(),
    errors_archived: z.unknown().optional(),
    weekly: z.unknown().optional(),
    history: z.unknown().optional(),
    next: z.unknown().optional(),
  })
  .passthrough()
  .refine(
    (v) => "_schema" in v || "skills" in v || "modules" in v,
    "This is not a recognized learning_record.json record.",
  );
const known = new Set([
  "_schema",
  "meta",
  "profile",
  "diagnostic",
  "skills",
  "modules",
  "errors",
  "writing_samples",
  "mocks",
  "human_checks",
  "errors_archived",
  "weekly",
  "history",
  "next",
]);
export function adaptLegacy(input: unknown) {
  const original = legacySchema.parse(input);
  const mappedClaims = Object.fromEntries(
    Object.entries(original.skills || {}).map(([key, value]) => [
      key,
      {
        ...value,
        state:
          value.state === "demonstrated"
            ? "independently_demonstrated"
            : value.state,
        provenance: "legacy_reported_claim",
        verified: false,
      },
    ]),
  );
  const issues: string[] = [];
  for (const entry of original.mocks || []) {
    for (const [key, value] of Object.entries(entry)) {
      if (
        /^(reading|listening|writing|speaking|lesen|hoeren|hören|schreiben|sprechen)$/.test(
          key,
        ) &&
        typeof value === "number" &&
        (value < 0 || value > 60)
      )
        issues.push("A historical mock has an out-of-range skill score.");
      if (
        key === "total" &&
        typeof value === "number" &&
        (value < 0 || value > 240)
      )
        issues.push("A historical mock total is outside 0–240.");
    }
    const values = ["reading", "listening", "writing", "speaking"].map(
      (k) => entry[k],
    );
    if (
      values.every((v) => typeof v === "number") &&
      typeof entry.total === "number" &&
      values.reduce<number>((n, v) => n + (v as number), 0) !== entry.total
    )
      issues.push(
        "A historical mock total does not equal its four reported scores.",
      );
  }
  const quarantine = Object.fromEntries(
    Object.entries(original).filter(([key]) => !known.has(key)),
  );
  return {
    adapter: "learning_record-v1",
    original,
    mappedClaims,
    quarantine,
    issues,
    verifiedAttempts: 0,
    warnings: [
      "Historical labels, error counts, placement decisions, reviewer notes and mock totals remain reported history. No mastery or readiness is awarded without underlying evidence.",
      "The absent D5 listening round remains unassessed.",
      ...(Object.keys(quarantine).length
        ? ["Unknown fields are preserved in the import archive for review."]
        : []),
    ],
  };
}
