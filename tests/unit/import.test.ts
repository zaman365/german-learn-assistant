import { it, expect } from "vitest";
import { adaptLegacy } from "@/exports/legacy";
import { csvCell } from "@/exports/service";
it("preserves legacy claims without turning an empty template into assessment", () => {
  const result = adaptLegacy({
    _schema: { states: ["demonstrated"] },
    skills: { grammar: { state: "demonstrated", evidence: [] } },
    errors: [],
    mocks: [],
    custom_note: "retain me",
  });
  expect(result.verifiedAttempts).toBe(0);
  expect(result.mappedClaims.grammar).toMatchObject({
    state: "independently_demonstrated",
    verified: false,
  });
  expect(result.quarantine).toEqual({ custom_note: "retain me" });
  expect(
    adaptLegacy({
      _schema: "template",
      skills: {},
      modules: {},
      errors: [],
      writing_samples: [],
      mocks: [],
    }).verifiedAttempts,
  ).toBe(0);
});
it("rejects impossible historical totals and preserves German CSV content exactly", () => {
  expect(
    adaptLegacy({
      _schema: "legacy",
      mocks: [
        { reading: 60, listening: 60, writing: 60, speaking: 60, total: 300 },
      ],
    }).issues.length,
  ).toBeGreaterThan(0);
  expect(csvCell('die Größe, \"größer\"\nBeispiel')).toBe(
    '"die Größe, ""größer""\nBeispiel"',
  );
});
