import { drizzle as postgresDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as embeddedDrizzle } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import { Pool } from "pg";
import * as schema from "./schema";
import path from "node:path";
import fs from "node:fs";

export type Database = ReturnType<typeof postgresDrizzle<typeof schema>>;
const globalDb = globalThis as unknown as {
  germanDb?: Database;
  germanPool?: Pool;
  germanEmbedded?: PGlite;
};
export function getDb(): Database {
  if (globalDb.germanDb) return globalDb.germanDb;
  if (process.env.DATABASE_URL) {
    globalDb.germanPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 8,
      connectionTimeoutMillis: 8000,
    });
    globalDb.germanDb = postgresDrizzle(globalDb.germanPool, { schema });
  } else if (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_DATABASE_PATH
  ) {
    fs.mkdirSync(path.resolve(process.env.DEV_DATABASE_PATH), {
      recursive: true,
    });
    globalDb.germanEmbedded = new PGlite(
      path.resolve(process.env.DEV_DATABASE_PATH),
    );
    // Both Drizzle drivers share PostgreSQL query semantics; only the driver/session differs.
    globalDb.germanDb = embeddedDrizzle(globalDb.germanEmbedded, {
      schema,
    }) as unknown as Database;
  } else throw new Error("DATABASE_URL is required. See the setup guide.");
  return globalDb.germanDb;
}
export async function closeDb() {
  await globalDb.germanPool?.end();
  await globalDb.germanEmbedded?.close();
  delete globalDb.germanDb;
  delete globalDb.germanPool;
  delete globalDb.germanEmbedded;
}
export function getDatabaseDriver() {
  getDb();
  return { pool: globalDb.germanPool, embedded: globalDb.germanEmbedded };
}
