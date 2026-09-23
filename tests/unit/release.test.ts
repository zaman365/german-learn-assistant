import { it, expect } from "vitest";
import {
  isReviewedClip,
  isReviewedTimeline,
  scriptHash,
  timelineSourceHash,
} from "@/audio/readiness";
import { reconcileSession } from "@/planning/session";
import { createPlan } from "@/planning/planner";
it("rejects deleted, unreviewed and obsolete audio even when the media ID is unchanged", () => {
  const source = { script: "Guten Tag.", version: 1 };
  const asset = {
    state: "ready",
    kind: "curriculum_audio",
    userId: null,
    deletedAt: null,
    metadata: {
      scriptVersion: 1,
      scriptHash: scriptHash(source.script),
      reviewedAt: "2026-09-23",
    },
  };
  expect(isReviewedClip(asset, source)).toBe(true);
  expect(isReviewedClip(asset, { ...source, script: "Guten Morgen." })).toBe(
    false,
  );
  expect(isReviewedClip({ ...asset, deletedAt: new Date() }, source)).toBe(
    false,
  );
  expect(isReviewedClip({ ...asset, state: "pending_review" }, source)).toBe(
    false,
  );
  const mock = {
    id: "MOCK-01",
    version: 1,
    audio: [{ id: "a", script: source.script, offset: 45 }],
  };
  const timeline = {
    ...asset,
    kind: "exam_timeline",
    metadata: {
      sourceHash: timelineSourceHash(mock),
      reviewedAt: "2026-09-23",
    },
  };
  expect(isReviewedTimeline(timeline, mock)).toBe(true);
  expect(
    isReviewedTimeline(timeline, {
      ...mock,
      audio: [{ ...mock.audio[0], offset: 46 }],
    }),
  ).toBe(false);
});
it("retains completed segment evidence across replanning without treating old or unrelated practice as completion", () => {
  const assigned = new Date("2026-09-23T10:00:00Z"),
    now = new Date("2026-09-23T11:00:00Z");
  const tasks = createPlan({
    minutes: 20,
    diagnosticDone: true,
    dueCount: 1,
    dueTargets: ["gender"],
    repairs: [],
    nextLesson: {
      id: "L1",
      version: 1,
      title: "Lesson",
      minutes: 15,
      skills: ["writing"],
    },
  });
  const attempt = {
    id: "a1",
    lessonId: "L1",
    skill: "writing",
    createdAt: new Date("2026-09-23T10:05:00Z"),
    assisted: false,
    assessed: true,
  };
  expect(
    reconcileSession(
      tasks,
      [{ ...attempt, createdAt: new Date("2026-09-22") }],
      assigned,
      now,
    ).some((task) => task.completedAt),
  ).toBe(false);
  const updated = reconcileSession(tasks, [attempt], assigned, now);
  expect(
    updated.find((task) => task.kind === "review")?.completedAt,
  ).toBeUndefined();
  expect(updated.find((task) => task.activityId === "L1")?.evidenceIds).toEqual(
    ["a1"],
  );
  expect(reconcileSession(updated, [], now, now)).toEqual(updated);
  expect(
    createPlan({
      minutes: 0,
      diagnosticDone: false,
      dueCount: 0,
      repairs: [],
      nextLesson: null,
    }),
  ).toEqual([]);
});
