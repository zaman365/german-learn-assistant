import { inspectWav } from "./wav";
export function pcm16(bytes: Buffer, targetRate = 16000) {
  const info = inspectWav(bytes);
  const parts: Buffer[] = [];
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const length = bytes.readUInt32LE(offset + 4);
    if (bytes.toString("ascii", offset, offset + 4) === "data")
      parts.push(bytes.subarray(offset + 8, offset + 8 + length));
    offset += 8 + length + (length % 2);
  }
  const raw = Buffer.concat(parts),
    length = Math.round(((raw.length / 2) * targetRate) / info.sampleRate),
    result = Buffer.alloc(length * 2);
  for (let i = 0; i < length; i++) {
    const position = (i * info.sampleRate) / targetRate,
      lower = Math.min(Math.floor(position), raw.length / 2 - 1),
      upper = Math.min(lower + 1, raw.length / 2 - 1),
      fraction = position - lower;
    result.writeInt16LE(
      Math.round(
        raw.readInt16LE(lower * 2) * (1 - fraction) +
          raw.readInt16LE(upper * 2) * fraction,
      ),
      i * 2,
    );
  }
  return result;
}
export function wavFromPcm(pcm: Buffer, rate = 16000) {
  const header = Buffer.alloc(44);
  header.write("RIFF");
  header.writeUInt32LE(pcm.length + 36, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}
export function composeTimeline(
  clips: { offset: number; bytes: Buffer }[],
  seconds: number,
) {
  const rate = 16000,
    body = Buffer.alloc(seconds * rate * 2);
  let end = 0;
  for (const clip of [...clips].sort((a, b) => a.offset - b.offset)) {
    const pcm = pcm16(clip.bytes),
      start = Math.round(clip.offset * rate) * 2;
    if (start < end || start + pcm.length > body.length)
      throw new Error(
        "Audio overlaps the next cue or exceeds the timeline. Adjust the authored timing before review.",
      );
    pcm.copy(body, start);
    end = start + pcm.length;
  }
  return wavFromPcm(body, rate);
}
