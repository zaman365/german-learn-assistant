import { readdir, rm } from "node:fs/promises";
import path from "node:path";

// Next explicitly copies loaded .env files after tracing. Production uses
// runtime-injected secrets, so generated standalone artifacts must omit them.
async function clean(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await clean(file);
    else if (entry.isFile() && /^\.env(?:\.|$)/.test(entry.name))
      await rm(file);
  }
}
await clean(path.join(process.cwd(), ".next", "standalone"));
console.log("Standalone package prepared without environment files.");
