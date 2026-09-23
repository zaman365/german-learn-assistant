import "dotenv/config";
import { migrate as pgMigrate } from "drizzle-orm/node-postgres/migrator";
import { migrate as embeddedMigrate } from "drizzle-orm/pglite/migrator";
import { drizzle } from "drizzle-orm/pglite";
import { getDb, getDatabaseDriver, closeDb } from "../src/db";
async function main() {
  const db=getDb(); const driver=getDatabaseDriver();
  if(driver.embedded) await embeddedMigrate(drizzle(driver.embedded),{migrationsFolder:"drizzle"});
  else await pgMigrate(db,{migrationsFolder:"drizzle"});
  console.log("Database migrations applied.");
}
main().finally(closeDb);
