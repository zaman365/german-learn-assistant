import { z } from "zod";
import { profileSchema } from "@/exports/contracts";
import { boundedJson } from "@/lib/request";
import { sql } from "drizzle-orm";
import { getAuth } from "@/auth/server";
import { getDb } from "@/db";
import { usageLimits } from "@/db/schema";
import {
  AppError,
  dashboard,
  learnerLesson,
  profileFor,
  saveProfile,
  saveDraft,
  submitAttempt,
  reveal,
} from "@/learning/service";
import { vocabulary, getReferences } from "@/content/catalog";
import { capabilities } from "@/ai/provider";
import { getJob, requestJob, retryJob } from "@/ai/service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const baseAttempt = z.object({
  lessonId: z.string().max(60),
  exerciseId: z.string().max(80),
  version: z.number().int().positive(),
  attemptKey: z.string().uuid(),
});
type Context = { params: Promise<{ path: string[] }> };
async function handle(request: Request, context: Context) {
  try {
    const identity = await getAuth().api.getSession({
      headers: request.headers,
    });
    if (!identity) throw new AppError(401, "Please sign in to continue.");
    const userId = identity.user.id;
    const { path } = await context.params;
    const action = path.join("/");
    if (request.method === "GET") {
      if (action === "dashboard") return Response.json(await dashboard(userId));
      if (path[0] === "lesson" && path.length === 2)
        return Response.json(await learnerLesson(userId, path[1]));
      if (action === "profile")
        return Response.json(await profileFor(userId, identity.user.name));
      if (action === "vocabulary") return Response.json(vocabulary);
      if (action === "references") return Response.json(getReferences());
      if (action === "capabilities") return Response.json(capabilities());
      if (path[0] === "job" && path.length === 2)
        return Response.json(await getJob(userId, path[1]));
      throw new AppError(404, "Not found.");
    }
    const origin = request.headers.get("origin");
    const allowed = [
      process.env.APP_URL || "http://localhost:4173",
      ...(process.env.NODE_ENV === "production"
        ? []
        : ["http://terminal.local:4173", "http://localhost:4173"]),
    ];
    if (!origin || !allowed.includes(origin))
      throw new AppError(403, "The request origin is not allowed.");
    const minute = Math.floor(Date.now() / 60000);
    const key = `api:${userId}:${minute}`;
    const usage = (
      await getDb()
        .insert(usageLimits)
        .values({ key, count: 1, expiresAt: new Date(Date.now() + 120000) })
        .onConflictDoUpdate({
          target: usageLimits.key,
          set: { count: sql`${usageLimits.count}+1` },
        })
        .returning()
    )[0];
    if (usage.count > 120)
      throw new AppError(
        429,
        "Too many requests. Wait a moment and try again.",
      );
    const input = await boundedJson(request);
    if (action === "profile")
      return Response.json(
        await saveProfile(userId, profileSchema.parse(input)),
      );
    if (action === "draft")
      return Response.json(
        await saveDraft(
          userId,
          z
            .object({
              lessonId: z.string().max(60),
              exerciseId: z.string().max(80),
              response: z.string().max(12000),
              attemptKey: z.string().uuid(),
              sequence: z.number().int().nonnegative(),
              step: z.number().int().nonnegative().optional(),
            })
            .parse(input),
        ),
      );
    if (action === "attempt")
      return Response.json(
        await submitAttempt(
          userId,
          baseAttempt
            .extend({
              response: z.string().trim().min(1).max(12000),
              reviewId: z.string().uuid().optional(),
            })
            .parse(input),
        ),
      );
    if (action === "reveal")
      return Response.json(
        await reveal(
          userId,
          baseAttempt
            .extend({ kind: z.enum(["hint", "solution", "transcript"]) })
            .parse(input),
        ),
      );
    if (action === "ai-retry") {
      const body = z
        .object({ id: z.string().regex(/^[a-f0-9]{64}$/) })
        .parse(input);
      return Response.json(await retryJob(userId, body.id));
    }
    if (action === "ai") {
      const body = z
        .object({
          operation: z.enum(["evaluate", "explain", "roleplay", "audio"]),
          key: z.string().uuid(),
          attemptId: z.string().uuid().optional(),
          lessonId: z.string().max(60).optional(),
          exerciseId: z.string().max(80).optional(),
          attemptKey: z.string().uuid().optional(),
          question: z.string().trim().max(4000).optional(),
          parentId: z.string().max(64).optional(),
        })
        .parse(input);
      if (
        (body.operation === "evaluate" || body.operation === "audio") &&
        !body.attemptId
      )
        throw new AppError(400, "Select a saved response.");
      if (!["evaluate", "audio"].includes(body.operation) && !body.lessonId)
        throw new AppError(400, "Select a lesson.");
      return Response.json(
        await requestJob(userId, body.operation, body, body.key),
      );
    }
    throw new AppError(404, "Not found.");
  } catch (error) {
    if (error instanceof z.ZodError)
      return Response.json(
        {
          error: "Check the submitted fields.",
          issues: error.issues.map((i) => ({
            path: i.path,
            message: i.message,
          })),
        },
        { status: 400 },
      );
    if (error instanceof AppError)
      return Response.json({ error: error.message }, { status: error.status });
    console.error(
      "Learning request failed",
      error instanceof Error ? error.name : "unknown",
    );
    return Response.json(
      {
        error:
          "The request could not be completed. Your saved work is safe; please try again.",
      },
      { status: 503 },
    );
  }
}
export const GET = handle;
export const POST = handle;
