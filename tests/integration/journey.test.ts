import { beforeAll,afterAll,describe,it,expect } from "vitest";
import { randomUUID,createHash } from "node:crypto";
import { mkdtemp,rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { eq } from "drizzle-orm";
import { migrate as embeddedMigrate } from "drizzle-orm/pglite/migrator";
import { migrate as postgresMigrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/pglite";
import { getDb,closeDb,getDatabaseDriver } from "@/db";
import { user,contentVersions,attempts,evaluations,errorPatterns,reviews } from "@/db/schema";
import { lessons,diagnostic } from "@/content/catalog";
import { submitAttempt,learnerLesson,reveal,saveDraft,dashboard } from "@/learning/service";
let directory:string;const owner=randomUUID(),other=randomUUID();
beforeAll(async()=>{
 if(!process.env.DATABASE_URL){directory=await mkdtemp(path.join(os.tmpdir(),"german-test-"));process.env.DEV_DATABASE_PATH=directory;}
 const db=getDb(),driver=getDatabaseDriver();if(driver.embedded)await embeddedMigrate(drizzle(driver.embedded),{migrationsFolder:"drizzle"});else await postgresMigrate(db,{migrationsFolder:"drizzle"});
 for(const id of [owner,other])await db.insert(user).values({id,name:"Integration learner",email:`${id}@example.test`});
 for(const lesson of [...lessons,diagnostic])await db.insert(contentVersions).values({id:lesson.id,version:lesson.version,type:"lesson",hash:createHash("sha256").update(JSON.stringify(lesson)).digest("hex"),payload:lesson,published:true}).onConflictDoNothing();
});
afterAll(async()=>{const db=getDb();for(const id of [owner,other])await db.delete(user).where(eq(user.id,id));await closeDb();if(directory)await rm(directory,{recursive:true,force:true});});
const lesson=lessons[0];const ex=lesson.exercises[0];
function input(response=ex.accepted![0],exercise=ex){return{lessonId:lesson.id,exerciseId:exercise.id,version:lesson.version,response,attemptKey:randomUUID()};}
describe("durable first journey",()=>{
 it("persists one immutable submission and one evaluation under retries",async()=>{const request=input();const first=await submitAttempt(owner,request);const retry=await submitAttempt(owner,request);expect(retry.attempt.id).toBe(first.attempt.id);expect(retry.duplicate).toBe(true);expect(await getDb().select().from(evaluations).where(eq(evaluations.attemptId,first.attempt.id))).toHaveLength(1);await expect(submitAttempt(owner,{...request,response:"changed"})).rejects.toMatchObject({status:409});});
 it("isolates owners and never accepts a foreign review ID",async()=>{expect((await learnerLesson(other,lesson.id)).history).toHaveLength(0);const review=(await getDb().select().from(reviews).where(eq(reviews.userId,owner)))[0];await expect(submitAttempt(other,{...input(),reviewId:review.id})).rejects.toMatchObject({status:400});expect(await getDb().select().from(attempts).where(eq(attempts.userId,other))).toHaveLength(0);});
 it("preserves assistance when a learner changes their attempt key",async()=>{const exercise=lesson.exercises[1];await reveal(owner,{...input("",exercise),kind:"hint"});const result=await submitAttempt(owner,input(exercise.accepted![0],exercise));expect(result.attempt.assisted).toBe(true);expect((await dashboard(owner)).skills.find(s=>s.id===exercise.skill)?.state).not.toBe("independently_demonstrated");});
 it("rejects stale autosaves without losing a newer empty draft",async()=>{const draft={lessonId:lesson.id,exerciseId:ex.id,response:"draft",attemptKey:randomUUID(),sequence:5,step:0};await saveDraft(owner,draft);await saveDraft(owner,{...draft,response:"",sequence:6});await expect(saveDraft(owner,{...draft,sequence:4})).rejects.toMatchObject({status:409});expect((await learnerLesson(owner,lesson.id)).draft?.data.response).toBe("");});
 it("records errors once per submission, not per retry",async()=>{const request=input("an incorrect response",lesson.exercises[2]);await submitAttempt(owner,request);const count=(await getDb().select().from(errorPatterns).where(eq(errorPatterns.userId,owner))).reduce((n,e)=>n+e.count,0);await submitAttempt(owner,request);expect((await getDb().select().from(errorPatterns).where(eq(errorPatterns.userId,owner))).reduce((n,e)=>n+e.count,0)).toBe(count);});
 it("requires passed exit checks and retains data after reopening the connection",async()=>{for(const exercise of lesson.exercises)await submitAttempt(owner,input(exercise.accepted![0],exercise));expect((await learnerLesson(owner,lesson.id)).progress?.state).toBe("completed");await closeDb();const resumed=await learnerLesson(owner,lesson.id);expect(resumed.progress?.state).toBe("completed");expect(resumed.history.length).toBeGreaterThanOrEqual(lesson.exercises.length);expect((await dashboard(owner)).skills.filter(s=>s.state==="retained")).toHaveLength(0);});
});
