import { spawn } from "node:child_process";
// Accept Vite-style preview flags while keeping Next.js as the application server.
const args = process.argv
  .slice(2)
  .filter((a) => a !== "--strictPort")
  .map((a) => (a === "--host" ? "--hostname" : a));
if (!args.includes("--hostname")) args.push("--hostname", "0.0.0.0");
if (!args.includes("--port")) args.push("--port", "4173");
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", ...args],
  { stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 1));
