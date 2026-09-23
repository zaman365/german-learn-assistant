import { describe, it, expect } from "vitest";
import { encodeWav } from "@/audio/encode";
import { inspectWav } from "@/audio/wav";
describe("recorded audio integrity", () => {
  it("encodes a real sample buffer as bounded mono PCM", async () => {
    const samples = Float32Array.from(
      { length: 48000 },
      (_, i) => Math.sin(i / 20) * 0.25,
    );
    const blob = encodeWav([samples], 48000),
      bytes = Buffer.from(await blob.arrayBuffer());
    expect(inspectWav(bytes)).toMatchObject({
      duration: 1,
      sampleRate: 16000,
      channels: 1,
      bits: 16,
    });
  });
  it("rejects renamed text, truncated chunks and clips outside the duration limits", async () => {
    expect(() => inspectWav(Buffer.from("this is not audio"))).toThrow();
    const bytes = Buffer.from(
      await encodeWav([new Float32Array(16000)], 16000).arrayBuffer(),
    );
    expect(() => inspectWav(bytes.subarray(0, 100))).toThrow();
    const short = Buffer.from(
      await encodeWav([new Float32Array(100)], 16000).arrayBuffer(),
    );
    expect(() => inspectWav(short)).toThrow();
  });
  it("clips overflowing samples rather than wrapping their PCM values", async () => {
    const bytes = Buffer.from(
      await encodeWav(
        [Float32Array.from({ length: 16000 }, (_, i) => (i % 2 ? 2 : -2))],
        16000,
      ).arrayBuffer(),
    );
    expect(bytes.readInt16LE(44)).toBe(-32768);
    expect(bytes.readInt16LE(46)).toBe(32767);
  });
});
