import { PgBoss } from "pg-boss";
let queue: Promise<PgBoss> | undefined;
export async function getQueue() {
  if (!process.env.DATABASE_URL)
    throw new Error("The durable worker requires PostgreSQL.");
  if (!queue)
    queue = (async () => {
      const boss = new PgBoss({
        connectionString: process.env.DATABASE_URL!,
        schema: "job_queue",
      });
      boss.on("error", () =>
        console.error("Background queue connection error"),
      );
      await boss.start();
      await boss.createQueue("learning-ai", {
        retryLimit: 0,
        expireInSeconds: 180,
      });
      await boss.createQueue("maintenance", {
        retryLimit: 2,
        expireInSeconds: 300,
      });
      return boss;
    })();
  return queue;
}
export async function enqueue(id: string) {
  const boss = await getQueue();
  await boss.send(
    "learning-ai",
    { id },
    { singletonKey: id, retryLimit: 0, expireInSeconds: 180 },
  );
}
