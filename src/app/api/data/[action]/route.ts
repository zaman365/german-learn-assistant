import { getAuth } from "@/auth/server";
import {
  exportData,
  previewImport,
  importData,
  progressSummary,
  vocabularyCsv,
  reviewCsv,
} from "@/exports/service";
import { boundedJson, checkOrigin } from "@/lib/request";
import { AppError } from "@/learning/service";
import { z } from "zod";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function handle(
  request: Request,
  { params }: { params: Promise<{ action: string }> },
) {
  try {
    const identity = await getAuth().api.getSession({
      headers: request.headers,
    });
    if (!identity)
      throw new AppError(401, "Sign in to manage your learning data.");
    const userId = identity.user.id,
      { action } = await params;
    if (request.method === "GET") {
      const variants: Record<
        string,
        { body: string; mime: string; name: string }
      > = {
        json: {
          body:
            action === "json"
              ? JSON.stringify(await exportData(userId), null, 2)
              : "",
          mime: "application/json",
          name: "german-learning-backup.json",
        },
        summary: {
          body: action === "summary" ? await progressSummary(userId) : "",
          mime: "text/plain; charset=utf-8",
          name: "german-learning-progress.txt",
        },
        vocabulary: {
          body: action === "vocabulary" ? vocabularyCsv() : "",
          mime: "text/csv; charset=utf-8",
          name: "german-vocabulary.csv",
        },
        reviews: {
          body: action === "reviews" ? await reviewCsv(userId) : "",
          mime: "text/csv; charset=utf-8",
          name: "german-reviews.csv",
        },
      };
      const result = variants[action];
      if (!result) throw new AppError(404, "Export not found.");
      return new Response(result.body, {
        headers: {
          "Content-Type": result.mime,
          "Content-Disposition": 'attachment; filename="' + result.name + '"',
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
    checkOrigin(request);
    const input = await boundedJson(request, 25 * 1024 * 1024);
    if (action === "preview") {
      const {
        bundle: _bundle,
        adapted: _adapted,
        isTrusted: _trusted,
        ...report
      } = await previewImport(userId, input);
      return Response.json(report);
    }
    if (action === "import") {
      const body = z
        .object({
          package: z.unknown(),
          previewHash: z.string().regex(/^[a-f0-9]{64}$/),
        })
        .parse(input);
      return Response.json(
        await importData(userId, body.package, body.previewHash),
      );
    }
    throw new AppError(404, "Action not found.");
  } catch (e) {
    if (e instanceof AppError)
      return Response.json({ error: e.message }, { status: e.status });
    if (e instanceof z.ZodError)
      return Response.json(
        {
          error: "The file does not match a supported learning-data format.",
          issues: e.issues
            .slice(0, 10)
            .map((i) => ({ path: i.path, message: i.message })),
        },
        { status: 400 },
      );
    console.error(
      "Data request failed",
      e instanceof Error ? e.name : "unknown",
    );
    return Response.json(
      {
        error:
          "The data operation could not be completed. Existing records were preserved.",
      },
      { status: 503 },
    );
  }
}
export const GET = handle;
export const POST = handle;
