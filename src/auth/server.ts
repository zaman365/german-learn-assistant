import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import * as schema from "@/db/schema";

function createAuth() {
  if (
    !process.env.BETTER_AUTH_SECRET ||
    process.env.BETTER_AUTH_SECRET.length < 32
  )
    throw new Error(
      "Configure BETTER_AUTH_SECRET with at least 32 random characters.",
    );
  const baseURL = process.env.APP_URL || "http://localhost:4173";
  return betterAuth({
    appName: "German Learn Assistant",
    baseURL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(getDb(), { provider: "pg", schema }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
    },
    trustedOrigins:
      process.env.NODE_ENV === "production"
        ? [baseURL]
        : [baseURL, "http://localhost:4173", "http://terminal.local:4173"],
    session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
    rateLimit: { enabled: true, window: 60, max: 60 },
    advanced: { useSecureCookies: new URL(baseURL).protocol === "https:" },
  });
}
let instance: ReturnType<typeof createAuth> | undefined;
export function getAuth() {
  return (instance ??= createAuth());
}
export async function currentUser() {
  return (
    (await getAuth().api.getSession({ headers: await headers() }))?.user ?? null
  );
}
export async function requireUser() {
  const user = await currentUser();
  if (!user) redirect("/login");
  return user;
}
