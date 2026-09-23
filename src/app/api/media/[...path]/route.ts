import { z } from "zod";
import { boundedBody } from "@/lib/request";
import { getAuth } from "@/auth/server";
import { AppError } from "@/learning/service";
import {
  uploadRecording,
  mediaUrl,
  getSignedMedia,
  deleteRecording,
  MAX_AUDIO_BYTES,
} from "@/audio/service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ path: string[] }> };
async function handle(request: Request, { params }: Context) {
  try {
    const identity = await getAuth().api.getSession({
      headers: request.headers,
    });
    if (!identity) throw new AppError(401, "Sign in to access recordings.");
    const userId = identity.user.id,
      { path } = await params;
    if (request.method === "GET") {
      const id = z
        .string()
        .regex(/^[a-f0-9]{64}$/)
        .parse(path[0]);
      if (path[1] === "link")
        return Response.json({ url: await mediaUrl(userId, id) });
      if (path.length !== 1) throw new AppError(404, "Not found.");
      const url = new URL(request.url),
        result = await getSignedMedia(
          userId,
          id,
          url.searchParams.get("expires"),
          url.searchParams.get("signature"),
        );
      return new Response(new Uint8Array(result.bytes), {
        headers: {
          "Content-Type": result.row.mime,
          "Content-Length": String(result.bytes.length),
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
    const allowed = [
      process.env.APP_URL || "http://localhost:4173",
      ...(process.env.NODE_ENV === "production"
        ? []
        : ["http://terminal.local:4173", "http://localhost:4173"]),
    ];
    if (!allowed.includes(request.headers.get("origin") || ""))
      throw new AppError(403, "Request origin not allowed.");
    if (request.method === "DELETE")
      return Response.json(
        await deleteRecording(
          userId,
          z
            .string()
            .regex(/^[a-f0-9]{64}$/)
            .parse(path[0]),
        ),
      );
    if (path.join("/") !== "upload") throw new AppError(404, "Not found.");
    if (
      Number(request.headers.get("content-length") || 0) >
      MAX_AUDIO_BYTES + 100000
    )
      throw new AppError(413, "The recording is too large.");
    const bytes = await boundedBody(request, MAX_AUDIO_BYTES + 100000);
    const form = await new Response(bytes as BodyInit, {
        headers: { "Content-Type": request.headers.get("content-type") || "" },
      }).formData(),
      file = form.get("file");
    if (!(file instanceof File) || file.size > MAX_AUDIO_BYTES)
      throw new AppError(400, "Provide a recording of at most 20 MB.");
    const input = z
      .object({
        lessonId: z.string().max(60),
        exerciseId: z.string().max(80),
        attemptKey: z.string().uuid(),
      })
      .parse(
        Object.fromEntries(
          ["lessonId", "exerciseId", "attemptKey"].map((k) => [k, form.get(k)]),
        ),
      );
    return Response.json(
      await uploadRecording(
        userId,
        Buffer.from(await file.arrayBuffer()),
        input,
      ),
    );
  } catch (e) {
    if (e instanceof AppError)
      return Response.json({ error: e.message }, { status: e.status });
    if (e instanceof z.ZodError)
      return Response.json(
        { error: "Invalid recording request." },
        { status: 400 },
      );
    console.error(
      "Recording operation failed",
      e instanceof Error ? e.name : "unknown",
    );
    return Response.json(
      {
        error:
          "The recording could not be processed. Keep your local take and try again.",
      },
      { status: 503 },
    );
  }
}
export const GET = handle;
export const POST = handle;
export const DELETE = handle;
