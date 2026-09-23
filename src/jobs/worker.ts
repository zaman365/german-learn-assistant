import "dotenv/config";
import { and, eq, lt } from "drizzle-orm";
import { getDb, closeDb } from "../db";
import { jobs, usageLimits } from "../db/schema";
import { getQueue, enqueue } from "./queue";
import { processJob } from "../ai/service";
import { cleanExpiredRecordings } from "../audio/service";
async function main() {
  const boss = await getQueue(),
    db = getDb();
  await boss.work<{ id: string }>("learning-ai", async (batch) => {
    for (const job of batch) await processJob(job.data.id);
  });
  await boss.work("maintenance", async () => {
    // Do not blindly replay a provider call whose outcome is unknown after a crash.
    await db
      .update(jobs)
      .set({
        status: "failed",
        error:
          "The worker stopped before confirming the provider result. Response retained; review before a new request.",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(jobs.status, "running"),
          lt(jobs.updatedAt, new Date(Date.now() - 300000)),
        ),
      );
    const pending = await db
      .select({ id: jobs.id })
      .from(jobs)
      .where(eq(jobs.status, "queued"));
    for (const row of pending) await enqueue(row.id);
    await db.delete(usageLimits).where(lt(usageLimits.expiresAt, new Date()));
    await cleanExpiredRecordings();
  });
  await boss.schedule("maintenance", "*/2 * * * *");
  await boss.send("maintenance", {});
  console.log("German learning worker ready.");
  for (const signal of ["SIGINT", "SIGTERM"] as const)
    process.once(signal, async () => {
      await boss.stop();
      await closeDb();
      process.exit(0);
    });
}
main().catch(() => {
  console.error(
    "Worker startup failed. Check database and environment configuration.",
  );
  process.exitCode = 1;
});
