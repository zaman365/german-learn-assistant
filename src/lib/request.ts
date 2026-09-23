import { AppError } from "@/learning/service";

export function checkOrigin(request: Request) {
  const allowed = [
    process.env.APP_URL || "http://localhost:4173",
    ...(process.env.NODE_ENV === "production"
      ? []
      : ["http://terminal.local:4173", "http://localhost:4173"]),
  ];
  if (!allowed.includes(request.headers.get("origin") || ""))
    throw new AppError(403, "Request origin not allowed.");
}

// Bound streaming bodies too; Content-Length alone is not a size limit.
export async function boundedBody(
  request: Request,
  limit: number,
): Promise<Uint8Array> {
  if (Number(request.headers.get("content-length") || 0) > limit)
    throw new AppError(413, "The upload is too large.");
  const reader = request.body?.getReader();
  if (!reader) throw new AppError(400, "A request body is required.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new AppError(413, "The upload is too large.");
      }
      chunks.push(chunk.value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

export async function boundedJson(
  request: Request,
  limit = 100000,
): Promise<unknown> {
  try {
    return JSON.parse(
      new TextDecoder().decode(await boundedBody(request, limit)),
    );
  } catch (e) {
    if (e instanceof AppError) throw e;
    throw new AppError(400, "Invalid JSON.");
  }
}
