export function inspectWav(bytes: Buffer) {
  if (
    bytes.length < 44 ||
    bytes.toString("ascii", 0, 4) !== "RIFF" ||
    bytes.toString("ascii", 8, 12) !== "WAVE"
  )
    throw new Error("Please use a WAV recording produced by the recorder.");
  let offset = 12,
    format = 0,
    channels = 0,
    rate = 0,
    bits = 0,
    dataBytes = 0;
  while (offset + 8 <= bytes.length) {
    const type = bytes.toString("ascii", offset, offset + 4),
      length = bytes.readUInt32LE(offset + 4),
      start = offset + 8;
    if (start + length > bytes.length)
      throw new Error("The recording is incomplete.");
    if (type === "fmt ") {
      if (length < 16) throw new Error("Invalid audio format.");
      format = bytes.readUInt16LE(start);
      channels = bytes.readUInt16LE(start + 2);
      rate = bytes.readUInt32LE(start + 4);
      bits = bytes.readUInt16LE(start + 14);
    }
    if (type === "data") dataBytes += length;
    offset = start + length + (length % 2);
  }
  if (
    format !== 1 ||
    channels !== 1 ||
    bits !== 16 ||
    rate < 8000 ||
    rate > 48000 ||
    !dataBytes ||
    dataBytes % 2
  )
    throw new Error("Use mono 16-bit PCM audio between 8 and 48 kHz.");
  const duration = dataBytes / (rate * channels * (bits / 8));
  if (duration < 0.5 || duration > 300.1)
    throw new Error("Record between half a second and five minutes.");
  return { duration, sampleRate: rate, channels, bits };
}
