export type Evidence = {
  id: string;
  family: string;
  date: string;
  correct: boolean;
  assisted: boolean;
  transfer: boolean;
  modality: string;
};
export type Mastery = {
  state:
    | "not_assessed"
    | "introduced"
    | "practising"
    | "independently_demonstrated"
    | "retained";
  needsRepair: boolean;
  evidenceCount: number;
  demonstratedAt: string | null;
};
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30] as const;

export function localDate(now: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function addDays(date: string, days: number): string {
  const parsed = new Date(`${date}T12:00:00Z`);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}
export function mastery(evidence: Evidence[], introduced = false): Mastery {
  const unique = [...new Map(evidence.map((e) => [e.id, e])).values()].sort(
    (a, b) => a.date.localeCompare(b.date),
  );
  const independent = unique.filter(
    (e) => !e.assisted && e.transfer && e.modality !== "recognition",
  );
  const recent = independent.slice(-3);
  const needsRepair = recent.filter((e) => !e.correct).length >= 2;
  let demonstratedAt: string | null = null;
  const successes = independent.filter((e) => e.correct);
  for (let i = 0; i < successes.length; i++) {
    if (
      successes
        .slice(0, i)
        .some(
          (p) =>
            p.date !== successes[i].date && p.family !== successes[i].family,
        )
    ) {
      demonstratedAt = successes[i].date;
      break;
    }
  }
  const retained =
    demonstratedAt !== null &&
    successes.some((e) => e.date >= addDays(demonstratedAt!, 7));
  const state = needsRepair
    ? "practising"
    : retained
      ? "retained"
      : demonstratedAt
        ? "independently_demonstrated"
        : unique.length
          ? "practising"
          : introduced
            ? "introduced"
            : "not_assessed";
  return { state, needsRepair, evidenceCount: unique.length, demonstratedAt };
}
export function scheduleReview(
  current:
    | { step: number; dueDate: string; lastDate: string | null }
    | undefined,
  result: { correct: boolean; assisted: boolean },
  today: string,
) {
  if (!current) return { step: 0, dueDate: addDays(today, 1), lastDate: today };
  if (!result.correct || result.assisted)
    return {
      step: result.correct ? current.step : 0,
      dueDate: addDays(today, 1),
      lastDate: today,
    };
  if (current.lastDate === today || current.dueDate > today) return current;
  const step = Math.min(current.step + 1, REVIEW_INTERVALS.length - 1);
  return {
    step,
    dueDate: addDays(today, REVIEW_INTERVALS[step]),
    lastDate: today,
  };
}
export function placementRoute(
  checks: {
    correct: boolean;
    productive: boolean;
    assisted: boolean;
    id: string;
  }[],
) {
  const valid = checks.filter((x) => !x.assisted);
  if (valid.length < 2)
    return {
      route: "check",
      rationale:
        "There is not enough independent evidence yet. A short transfer check will clarify this area.",
    };
  const ratio = valid.filter((x) => x.correct).length / valid.length;
  if (
    ratio >= 0.9 &&
    valid.filter((x) => x.productive && x.correct).length >= 2
  )
    return {
      route: "skip",
      rationale:
        "The diagnostic supports skipping repeated instruction. Later checks will still verify retention.",
    };
  if (ratio >= 0.65)
    return {
      route: "repair",
      rationale:
        "Some foundations are secure. A focused repair will address the remaining errors.",
    };
  return {
    route: "full",
    rationale:
      "Several target forms need attention. Work through this module with guided practice.",
  };
}
