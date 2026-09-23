import { getAuth } from "@/auth/server";
import { curriculumAudio } from "@/audio/curriculum";
import { AppError } from "@/learning/service";
export const runtime = "nodejs";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const identity = await getAuth().api.getSession({
      headers: request.headers,
    });
    if (!identity) throw new AppError(401, "Sign in to listen.");
    const { id } = await params,
      result = await curriculumAudio(id);
    return new Response(new Uint8Array(result.bytes), {
      headers: {
        "Content-Type": result.row.mime,
        "Content-Length": String(result.bytes.length),
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof AppError ? e.message : "Audio is unavailable." },
      { status: e instanceof AppError ? e.status : 503 },
    );
  }
}
