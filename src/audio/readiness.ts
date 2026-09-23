import { createHash } from "node:crypto";

type Asset = {
  state: string;
  kind: string;
  userId: string | null;
  deletedAt: Date | null;
  metadata: unknown;
};
type Script = { script: string; version?: number };
type TimelineSource = {
  id: string;
  version: number;
  audio: { id: string; script: string; offset: number }[];
};
export const scriptHash = (text: string) =>
  createHash("sha256").update(text).digest("hex");
export const timelineSourceHash = (mock: TimelineSource) =>
  scriptHash(
    JSON.stringify({ id: mock.id, version: mock.version, audio: mock.audio }),
  );
export function isReviewedClip(asset: Asset | undefined, script: Script) {
  if (
    !asset ||
    asset.state !== "ready" ||
    asset.kind !== "curriculum_audio" ||
    asset.userId ||
    asset.deletedAt
  )
    return false;
  const meta = asset.metadata as Record<string, unknown>;
  return (
    meta?.scriptHash === scriptHash(script.script) &&
    meta?.scriptVersion === (script.version ?? 1) &&
    typeof meta?.reviewedAt === "string"
  );
}
export function isReviewedTimeline(
  asset: Asset | undefined,
  mock: TimelineSource,
) {
  if (
    !asset ||
    asset.state !== "ready" ||
    asset.kind !== "exam_timeline" ||
    asset.userId ||
    asset.deletedAt
  )
    return false;
  const meta = asset.metadata as Record<string, unknown>;
  return (
    meta?.sourceHash === timelineSourceHash(mock) &&
    typeof meta?.reviewedAt === "string"
  );
}
