import { randomUUID } from "node:crypto";
import { and,eq,desc,sql,asc } from "drizzle-orm";
import { getDb } from "@/db";
import { profiles,attempts,evaluations,drafts,exposures,reviews,errorPatterns,lessonProgress,placement,contentVersions,learningSessions,type Profile,type EvaluationData } from "@/db/schema";
import { lessons,diagnostic,modules } from "@/content/catalog";
import { lessonSchema,publicLesson,type Lesson } from "@/content/types";
import { grade } from "@/assessment/grade";
import { localDate,mastery,scheduleReview,placementRoute } from "./policies";
import { createPlan } from "@/planning/planner";

export class AppError extends Error { constructor(public status:number,message:string){super(message);} }
export const defaultProfile=(name="Learner"):Profile=>({name,minutes:60,days:5,timezone:"Europe/Berlin",language:"en",currentLevel:"not sure",difficulties:[],examDate:null,firstLanguages:"",bskStatus:"unknown",onboardingComplete:false,recordingRetentionDays:90});
export async function profileFor(userId:string,name?:string){
  const db=getDb();await db.insert(profiles).values({userId,data:defaultProfile(name)}).onConflictDoNothing();
  return (await db.select().from(profiles).where(eq(profiles.userId,userId)))[0];
}
export async function saveProfile(userId:string,data:Profile){
  new Intl.DateTimeFormat("en",{timeZone:data.timezone}).format(new Date());
  const updatedAt=new Date();await getDb().insert(profiles).values({userId,data,updatedAt}).onConflictDoUpdate({target:profiles.userId,set:{data,updatedAt}});return {savedAt:updatedAt.toISOString(),profile:data};
}
export async function publishedLesson(id:string,version?:number):Promise<Lesson>{
  const db=getDb();const filters=[eq(contentVersions.id,id),eq(contentVersions.type,"lesson"),eq(contentVersions.published,true)];if(version)filters.push(eq(contentVersions.version,version));
  const row=(await db.select().from(contentVersions).where(and(...filters)).orderBy(desc(contentVersions.version)).limit(1))[0];
  if(!row)throw new AppError(404,"This lesson is not available yet.");return lessonSchema.parse(row.payload);
}
export async function learnerLesson(userId:string,id:string){
  const lesson=await publishedLesson(id);const db=getDb();
  const [history,saved,progress]=await Promise.all([
    db.select({attempt:attempts,evaluation:evaluations}).from(attempts).leftJoin(evaluations,eq(evaluations.attemptId,attempts.id)).where(and(eq(attempts.userId,userId),eq(attempts.lessonId,id))).orderBy(asc(attempts.createdAt)),
    db.select().from(drafts).where(and(eq(drafts.userId,userId),eq(drafts.contextId,id))),
    db.select().from(lessonProgress).where(and(eq(lessonProgress.userId,userId),eq(lessonProgress.lessonId,id))),
  ]);
  return {lesson:publicLesson(lesson),history:history.filter(h=>h.attempt.contentVersion===lesson.version),draft:(saved[0]??null) as typeof drafts.$inferSelect|null,progress:(progress[0]??null) as typeof lessonProgress.$inferSelect|null};
}
export async function saveDraft(userId:string,input:{lessonId:string;exerciseId:string;response:string;attemptKey:string;sequence:number;step?:number}){
  const lesson=await publishedLesson(input.lessonId);if(!lesson.exercises.some(e=>e.id===input.exerciseId))throw new AppError(400,"Unknown exercise.");
  const now=new Date();const result=await getDb().insert(drafts).values({id:randomUUID(),userId,contextId:input.lessonId,data:{response:input.response,exerciseId:input.exerciseId,attemptKey:input.attemptKey,step:input.step},sequence:input.sequence,updatedAt:now}).onConflictDoUpdate({target:[drafts.userId,drafts.contextId],set:{data:{response:input.response,exerciseId:input.exerciseId,attemptKey:input.attemptKey,step:input.step},sequence:input.sequence,updatedAt:now},setWhere:sql`${drafts.sequence} < ${input.sequence}`}).returning();
  if(!result.length)throw new AppError(409,"A newer draft is already saved. Reload before replacing it.");
  return {savedAt:now.toISOString(),sequence:input.sequence};
}
export async function reveal(userId:string,input:{lessonId:string;exerciseId:string;version:number;attemptKey:string;kind:"hint"|"solution"}){
  const lesson=await publishedLesson(input.lessonId,input.version);const ex=lesson.exercises.find(e=>e.id===input.exerciseId);if(!ex)throw new AppError(404,"Exercise not found.");
  await getDb().insert(exposures).values({id:randomUUID(),userId,exerciseId:ex.id,contentVersion:lesson.version,attemptKey:input.attemptKey,kind:input.kind}).onConflictDoNothing();
  return {text:input.kind==="hint"?ex.hint:`${ex.accepted?.join(" / ")||"Use the task's rubric to plan an original response."}\n${ex.explanation}`,assisted:true};
}
export async function submitAttempt(userId:string,input:{lessonId:string;exerciseId:string;version:number;response:string;attemptKey:string;reviewId?:string},now=new Date()){
  const lesson=await publishedLesson(input.lessonId,input.version);const ex=lesson.exercises.find(e=>e.id===input.exerciseId);if(!ex)throw new AppError(404,"Exercise not found.");
  const profile=(await profileFor(userId)).data;const today=localDate(now,profile.timezone);const db=getDb();
  const result=await db.transaction(async tx=>{
    // All earlier reveals of this version remain assistance, even after a new submission key.
    const exposed=await tx.select().from(exposures).where(and(eq(exposures.userId,userId),eq(exposures.exerciseId,ex.id),eq(exposures.contentVersion,lesson.version)));
    const prior=await tx.select({id:attempts.id}).from(attempts).where(and(eq(attempts.userId,userId),eq(attempts.exerciseId,ex.id),eq(attempts.contentVersion,lesson.version))).limit(1);
    const inserted=await tx.insert(attempts).values({id:randomUUID(),userId,lessonId:lesson.id,contentVersion:lesson.version,exerciseId:ex.id,response:input.response,skill:ex.skill,family:ex.family,modality:ex.type==="choice"?"recognition":["speaking","listening"].includes(ex.type)?ex.type:"production",assisted:exposed.length>0,transfer:ex.transfer&&prior.length===0,localDate:today,timezone:profile.timezone,idempotencyKey:input.attemptKey,createdAt:now}).onConflictDoNothing({target:[attempts.userId,attempts.idempotencyKey]}).returning();
    if(!inserted.length){const existing=(await tx.select().from(attempts).where(and(eq(attempts.userId,userId),eq(attempts.idempotencyKey,input.attemptKey))))[0];if(existing.exerciseId!==input.exerciseId||existing.response!==input.response||existing.contentVersion!==input.version)throw new AppError(409,"This submission key already belongs to a different response.");const evaluation=(await tx.select().from(evaluations).where(eq(evaluations.attemptId,existing.id)).orderBy(desc(evaluations.createdAt)).limit(1))[0];return {attempt:existing,evaluation,duplicate:true};}
    const attempt=inserted[0];const data=grade(ex,input.response);const status=data.correct===null?"pending":"completed";
    const evaluation=(await tx.insert(evaluations).values({id:randomUUID(),attemptId:attempt.id,userId,status,source:data.correct===null?"awaiting_provider":"objective",data,rubricVersion:"course-v1",createdAt:now}).returning())[0];
    if(data.correct!==null){
      const mode=attempt.modality==="recognition"?"recognition":"production";
      const current=(await tx.select().from(reviews).where(and(eq(reviews.userId,userId),eq(reviews.targetId,ex.skill),eq(reviews.mode,mode))))[0];
      if(input.reviewId&&(!current||current.id!==input.reviewId))throw new AppError(400,"The review does not match this exercise.");
      const next=!current||input.reviewId||!data.correct?scheduleReview(current,{correct:data.correct,assisted:attempt.assisted},today):current;
      await tx.insert(reviews).values({id:current?.id||randomUUID(),userId,targetId:ex.skill,mode,...next,timezone:profile.timezone}).onConflictDoUpdate({target:[reviews.userId,reviews.targetId,reviews.mode],set:{step:next.step,dueDate:next.dueDate,lastDate:next.lastDate,timezone:profile.timezone}});
      if(!data.correct){const ambiguous=ex.errorTag==="GEN"&&ex.type!=="choice";const tag=ex.errorTag||"LEX";await tx.insert(errorPatterns).values({id:randomUUID(),userId,skill:ex.skill,tag,rootCause:ambiguous?"needs_probe":"task_target",original:input.response,correction:data.correction||"",explanation:data.explanation,exerciseId:ex.id,lessonId:lesson.id,attemptId:attempt.id,updatedAt:now}).onConflictDoUpdate({target:[errorPatterns.userId,errorPatterns.skill,errorPatterns.tag],set:{original:input.response,correction:data.correction||"",explanation:data.explanation,exerciseId:ex.id,lessonId:lesson.id,attemptId:attempt.id,status:"open",updatedAt:now,count:sql`${errorPatterns.count} + 1`}});}
    }
    const all=await tx.select({exerciseId:attempts.exerciseId,status:evaluations.status,data:evaluations.data}).from(attempts).innerJoin(evaluations,eq(evaluations.attemptId,attempts.id)).where(and(eq(attempts.userId,userId),eq(attempts.lessonId,lesson.id),eq(attempts.contentVersion,lesson.version)));
    const answered=new Set(all.map(a=>a.exerciseId));const exits=lesson.exercises.filter(e=>e.exit);const complete=lesson.exercises.every(e=>answered.has(e.id))&&exits.every(e=>all.some(a=>a.exerciseId===e.id&&a.status==="completed"&&a.data.correct));
    await tx.insert(lessonProgress).values({userId,lessonId:lesson.id,version:lesson.version,state:complete?"completed":"in_progress",position:answered.size,updatedAt:now}).onConflictDoUpdate({target:[lessonProgress.userId,lessonProgress.lessonId],set:{state:complete?"completed":"in_progress",position:answered.size,updatedAt:now}});
    return {attempt,evaluation,duplicate:false};
  });
  if(lesson.id==="D1")await refreshPlacement(userId,now);
  return result;
}
const bridgeSkillMap:Record<string,string[]>={"B2-01":["word-order"],"B2-02":["gender","case","noun-endings"],"B2-03":["adjective-endings"],"B2-04":["verb-forms"],"B2-05":["passive","konjunktiv"],"B2-06":["prepositions"],"B2-07":["connectors"],"B2-08":["writing","register"],"B2-09":["speaking"],"B2-10":["mediation"],"B2-11":["reading","listening"],"B2-12":["checkpoint"]};
export async function refreshPlacement(userId:string,now=new Date()){
  const db=getDb();const evidence=await db.select({attempt:attempts,evaluation:evaluations}).from(attempts).innerJoin(evaluations,eq(evaluations.attemptId,attempts.id)).where(and(eq(attempts.userId,userId),eq(attempts.lessonId,"D1"),eq(evaluations.status,"completed"))).orderBy(asc(attempts.createdAt));
  for(const[moduleId,skills]of Object.entries(bridgeSkillMap)){
    const selected=evidence.filter(e=>skills.includes(e.attempt.skill)&&e.evaluation.data.correct!==null);const first=selected.filter((e,i)=>selected.findIndex(a=>a.attempt.exerciseId===e.attempt.exerciseId)===i);
    const decision=placementRoute(first.map(e=>({id:e.attempt.id,correct:e.evaluation.data.correct!,productive:e.attempt.modality!=="recognition",assisted:e.attempt.assisted})));
    // Do not waive a whole multi-objective module from only one of its subskills.
    if(decision.route==="skip"&&!skills.every(s=>first.some(e=>e.attempt.skill===s&&e.evaluation.data.correct)))decision.route="check";
    const value={...decision,evidence:first.map(e=>e.attempt.id),waivedObjectives:decision.route==="skip"?skills:[],policy:"placement-v1",updatedAt:now};
    await db.insert(placement).values({userId,moduleId,...value}).onConflictDoUpdate({target:[placement.userId,placement.moduleId],set:value});
  }
}
export async function dashboard(userId:string,now=new Date()){
  const db=getDb();const profile=(await profileFor(userId)).data;const today=localDate(now,profile.timezone);
  const [progress,reviewList,errorList,history,routes]=await Promise.all([
    db.select().from(lessonProgress).where(eq(lessonProgress.userId,userId)),db.select().from(reviews).where(eq(reviews.userId,userId)),db.select().from(errorPatterns).where(eq(errorPatterns.userId,userId)).orderBy(desc(errorPatterns.updatedAt)),
    db.select({attempt:attempts,evaluation:evaluations}).from(attempts).innerJoin(evaluations,eq(evaluations.attemptId,attempts.id)).where(eq(attempts.userId,userId)).orderBy(asc(attempts.createdAt)),db.select().from(placement).where(eq(placement.userId,userId)),
  ]);
  const completed=new Set(progress.filter(p=>p.state==="completed").map(p=>p.lessonId));const waived=new Set(routes.filter(r=>r.route==="skip").map(r=>r.moduleId));
  const skillIds=[...new Set([...lessons.flatMap(l=>l.skills),"reading","listening","speaking","writing","mediation","pronunciation"])];
  const skills=skillIds.map(id=>({id,...mastery(history.filter(h=>h.attempt.skill===id&&h.evaluation.status==="completed"&&h.evaluation.data.correct!==null).map(h=>({id:h.attempt.id,family:h.attempt.family,date:h.attempt.localDate,correct:h.evaluation.data.correct!,assisted:h.attempt.assisted,transfer:h.attempt.transfer,modality:h.attempt.modality})))}));
  const catalog=lessons.filter(l=>l.status==="published").map(l=>({...publicLesson(l),state:progress.find(p=>p.lessonId===l.id)?.state||"not_started",waived:waived.has(l.moduleId),available:l.prerequisites.every(p=>completed.has(p)||waived.has(lessons.find(x=>x.id===p)?.moduleId||""))}));
  const resumable=progress.filter(p=>p.state==="in_progress"&&p.lessonId!=="D1").sort((a,b)=>b.updatedAt.getTime()-a.updatedAt.getTime()).map(p=>lessons.find(l=>l.id===p.lessonId)).find(Boolean);
  const diagnosticDone=diagnostic.exercises.filter(e=>e.accepted?.length).every(e=>history.some(h=>h.attempt.exerciseId===e.id&&h.evaluation.status==="completed"));
  const due=reviewList.filter(r=>r.dueDate<=today);const next=catalog.find(l=>l.available&&!completed.has(l.id)&&!l.waived)||catalog.find(l=>l.available&&!completed.has(l.id));
  const tasks=createPlan({minutes:profile.minutes,diagnosticDone,dueCount:due.length,repairs:errorList.filter(e=>e.status!=="resolved"&&e.count>=2).map(e=>({lessonId:e.lessonId,title:`Repair: ${e.skill.replaceAll("-"," ")}`,skills:[e.skill]})),nextLesson:next||null,resumeLesson:resumable});
  const previous=(await db.select().from(learningSessions).where(and(eq(learningSessions.userId,userId),eq(learningSessions.localDate,today))).orderBy(desc(learningSessions.createdAt)).limit(1))[0];
  if(!previous||JSON.stringify(previous.tasks)!==JSON.stringify(tasks))await db.insert(learningSessions).values({id:randomUUID(),userId,localDate:today,timezone:profile.timezone,minutes:profile.minutes,tasks,policy:"planner-v1",createdAt:now});
  return {profile,today,tasks,skills,catalog,modules,progress,reviews:reviewList,due,errors:errorList,history:history.slice(-40),routes,diagnosticDone,stats:{completed:completed.size-(completed.has("D1")?1:0),total:catalog.length,attempts:history.length,demonstrated:skills.filter(s=>["independently_demonstrated","retained"].includes(s.state)).length,retained:skills.filter(s=>s.state==="retained").length,pending:history.filter(h=>h.evaluation.status==="pending").length}};
}
export type Dashboard=Awaited<ReturnType<typeof dashboard>>;
