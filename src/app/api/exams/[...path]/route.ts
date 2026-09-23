import { z } from "zod";
import { getAuth } from "@/auth/server";
import { boundedBody, boundedJson, checkOrigin } from "@/lib/request";
import { AppError } from "@/learning/service";
import {
  examCatalog,
  startExam,
  getExam,
  saveExam,
  examAudio,
  recordExam,
  advanceExam,
  timelineAudio,
  markExamSupport,
} from "@/exams/service";
import { requestExamJob } from "@/exams/ai";
import { MAX_AUDIO_BYTES } from "@/audio/service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function handle(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const session = await getAuth().api.getSession({
      headers: request.headers,
    });
    if (!session) throw new AppError(401, "Sign in to open exam practice.");
    const { path } = await params,
      userId = session.user.id;
    if (request.method === "GET") {
      if (path[0] === "catalog")
        return Response.json(await examCatalog(userId));
      const id = z.string().uuid().parse(path[0]);
      if (path[1] === "timeline") {
        const bytes = await timelineAudio(userId, id);
        return new Response(new Uint8Array(bytes), {
          headers: {
            "Content-Type": "audio/wav",
            "Cache-Control": "private, no-store",
          },
        });
      }
      if (path[1] === "audio") {
        const bytes = await examAudio(userId, id, path[2]);
        return new Response(new Uint8Array(bytes), {
          headers: {
            "Content-Type": "audio/wav",
            "Cache-Control": "private, no-store",
          },
        });
      }
      return Response.json(await getExam(userId, id));
    }
    checkOrigin(request);
    if (path[0] === "start") {
      const input = z
        .object({
          id: z.string().uuid(),
          mockId: z.string().max(30),
          mode: z.enum(["practice", "timed_reference", "simulation"]),
          block: z.number().int().min(0).max(3).optional(),
        })
        .parse(await boundedJson(request));
      return Response.json(await startExam(userId, input));
    }
    const id = z.string().uuid().parse(path[0]);
    if (path[1] === "support") {
      const input = z
        .object({ kind: z.literal("partner-transcript") })
        .parse(await boundedJson(request));
      return Response.json(await markExamSupport(userId, id, input.kind));
    }
    if (path[1] === "advance") {
      const body = z
        .object({ block: z.number().int().min(0).max(3) })
        .parse(await boundedJson(request));
      return Response.json(await advanceExam(userId, id, body.block));
    }
    if (path[1] === "ai") {
      const body = z
        .object({
          operation: z.enum(["exam_partner", "exam_evaluate"]),
          taskId: z.string().max(80).optional(),
          recordingId: z
            .string()
            .regex(/^[a-f0-9]{64}$/)
            .optional(),
          initial: z.boolean().optional(),
        })
        .parse(await boundedJson(request));
      return Response.json(
        await requestExamJob(userId, body.operation, { ...body, examId: id }),
      );
    }
    if (path[1] === "recording") {
      const body = await boundedBody(request, MAX_AUDIO_BYTES + 100000),
        form = await new Response(body as BodyInit, {
          headers: {
            "Content-Type": request.headers.get("content-type") || "",
          },
        }).formData();
      const file = form.get("file");
      if (!(file instanceof File))
        throw new AppError(400, "A recording is required.");
      const task = z.string().max(80).parse(form.get("exerciseId")),
        key = z.string().uuid().parse(form.get("attemptKey"));
      return Response.json(
        await recordExam(
          userId,
          id,
          task,
          key,
          Buffer.from(await file.arrayBuffer()),
        ),
      );
    }
    const input = z
      .object({
        sequence: z.number().int().nonnegative(),
        answers: z
          .record(z.string().max(80), z.string().max(12000))
          .refine((v) => Object.keys(v).length <= 80),
        submit: z.boolean().optional(),
      })
      .parse(await boundedJson(request, 500000));
    return Response.json(await saveExam(userId, id, input));
  } catch (e) {
    if (e instanceof AppError)
      return Response.json({ error: e.message }, { status: e.status });
    if (e instanceof z.ZodError)
      return Response.json(
        { error: "Check the exam request." },
        { status: 400 },
      );
    console.error(
      "Exam request failed",
      e instanceof Error ? e.name : "unknown",
    );
    return Response.json(
      {
        error:
          "Exam practice is temporarily unavailable. Your last saved work is retained.",
      },
      { status: 503 },
    );
  }
}
export const GET = handle;
export const POST = handle;
