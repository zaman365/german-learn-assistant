import "dotenv/config";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { eq, and } from "drizzle-orm";
import { getDb, closeDb } from "../src/db";
import { user,account,session } from "../src/db/schema";

async function main() {
  const action=process.argv[2]; if(!["create","reset-password"].includes(action))throw new Error("Use create or reset-password.");
  const rl=createInterface({input:stdin,output:stdout});
  const email=(process.env.OWNER_EMAIL||await rl.question("Owner email: ")).trim().toLowerCase();
  const name=process.env.OWNER_NAME|| (action==="create"?await rl.question("Display name: "):"");
  rl.close();
  // Pipe the secret in through the environment; never pass it as a command-line argument or print it.
  const password=process.env.OWNER_PASSWORD;
  if(!password||password.length<12||password.length>128)throw new Error("Provide OWNER_PASSWORD (12–128 characters) through a protected environment or secret manager.");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error("A valid email is required.");
  const db=getDb(); const hash=await hashPassword(password);
  await db.transaction(async tx=>{
    const existing=(await tx.select().from(user).where(eq(user.email,email)))[0];
    if(action==="create"){
      if(existing)throw new Error("Account already exists; use the reset-password operation if intended.");
      const id=randomUUID();await tx.insert(user).values({id,email,name:name||"Learner",emailVerified:true});
      await tx.insert(account).values({id:randomUUID(),accountId:id,providerId:"credential",userId:id,password:hash});
    }else{
      if(!existing)throw new Error("Account not found.");
      await tx.update(account).set({password:hash,updatedAt:new Date()}).where(and(eq(account.userId,existing.id),eq(account.providerId,"credential")));
      await tx.delete(session).where(eq(session.userId,existing.id));
    }
  });
  console.log(action==="create"?"Owner account created. Public registration stays closed.":"Password updated and previous sessions revoked.");
}
main().finally(closeDb);
