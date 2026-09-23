export function encodeWav(chunks: Float32Array[], sourceRate: number): Blob {
  const length = chunks.reduce((n, c) => n + c.length, 0),
    input = new Float32Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    input.set(chunk, offset);
    offset += chunk.length;
  }
  const rate = 16000,
    frames = Math.floor((length * rate) / sourceRate),
    buffer = new ArrayBuffer(44 + frames * 2),
    view = new DataView(buffer);
  const ascii = (at: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(at + i, s.charCodeAt(i));
  };
  ascii(0, "RIFF");
  view.setUint32(4, 36 + frames * 2, true);
  ascii(8, "WAVE");
  ascii(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  ascii(36, "data");
  view.setUint32(40, frames * 2, true);
  for (let i = 0; i < frames; i++) {
    const start = Math.floor((i * sourceRate) / rate),
      end = Math.max(start + 1, Math.floor(((i + 1) * sourceRate) / rate));
    let sample = 0;
    for (let j = start; j < Math.min(end, input.length); j++)
      sample += input[j];
    sample = Math.max(-1, Math.min(1, sample / (end - start)));
    view.setInt16(
      44 + i * 2,
      sample < 0 ? sample * 32768 : sample * 32767,
      true,
    );
  }
  return new Blob([buffer], { type: "audio/wav" });
}
