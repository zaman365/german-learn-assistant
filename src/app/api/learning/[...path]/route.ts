import { z } from "zod";
import { sql } from "drizzle-orm";
import { getAuth } from "@/auth/server";
import { getDb } from "@/db";
import { usageLimits } from "@/db/schema";
import { AppError,dashboard,learnerLesson,profileFor,saveProfile,saveDraft,submitAttempt,reveal } from "@/learning/service";
import { vocabulary,getReferences } from "@/content/catalog";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const profileSchema=z.object({name:z.string().trim().min(1).max(80),minutes:z.number().int().min(10).max(180),days:z.number().int().min(1).max(7),timezone:z.string().min(1).max(80),language:z.enum(["en","de"]),currentLevel:z.string().max(150),difficulties:z.array(z.string().max(80)).max(15),examDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),firstLanguages:z.string().max(150),bskStatus:z.string().max(200),onboardingComplete:z.boolean(),recordingRetentionDays:z.number().int().min(1).max(365)});
const baseAttempt=z.object({lessonId:z.string().max(60),exerciseId:z.string().max(80),version:z.number().int().positive(),attemptKey:z.string().uuid()});
type Context={params:Promise<{path:string[]}>};
async function handle(request:Request,context:Context){
 try{
  const identity=await getAuth().api.getSession({headers:request.headers});if(!identity)throw new AppError(401,"Please sign in to continue.");
  const userId=identity.user.id;const {path}=await context.params;const action=path.join("/");
  if(request.method==="GET"){
    if(action==="dashboard")return Response.json(await dashboard(userId));
    if(path[0]==="lesson"&&path.length===2)return Response.json(await learnerLesson(userId,path[1]));
    if(action==="profile")return Response.json(await profileFor(userId,identity.user.name));
    if(action==="vocabulary")return Response.json(vocabulary);
    if(action==="references")return Response.json(getReferences());
    throw new AppError(404,"Not found.");
  }
  const origin=request.headers.get("origin");const allowed=[process.env.APP_URL||"http://localhost:4173",...(process.env.NODE_ENV==="production"?[]:["http://terminal.local:4173","http://localhost:4173"])];
  if(!origin||!allowed.includes(origin))throw new AppError(403,"The request origin is not allowed.");
  const minute=Math.floor(Date.now()/60000);const key=`api:${userId}:${minute}`;
  const usage=(await getDb().insert(usageLimits).values({key,count:1,expiresAt:new Date(Date.now()+120000)}).onConflictDoUpdate({target:usageLimits.key,set:{count:sql`${usageLimits.count}+1`}}).returning())[0];
  if(usage.count>120)throw new AppError(429,"Too many requests. Wait a moment and try again.");
  if(Number(request.headers.get("content-length")||0)>100000)throw new AppError(413,"This response is too large.");
  const text=await request.text();if(Buffer.byteLength(text)>100000)throw new AppError(413,"This response is too large.");
  let input:unknown;try{input=JSON.parse(text);}catch{throw new AppError(400,"Invalid request body.");}
  if(action==="profile")return Response.json(await saveProfile(userId,profileSchema.parse(input)));
  if(action==="draft")return Response.json(await saveDraft(userId,z.object({lessonId:z.string().max(60),exerciseId:z.string().max(80),response:z.string().max(12000),attemptKey:z.string().uuid(),sequence:z.number().int().nonnegative(),step:z.number().int().nonnegative().optional()}).parse(input)));
  if(action==="attempt")return Response.json(await submitAttempt(userId,baseAttempt.extend({response:z.string().trim().min(1).max(12000),reviewId:z.string().uuid().optional()}).parse(input)));
  if(action==="reveal")return Response.json(await reveal(userId,baseAttempt.extend({kind:z.enum(["hint","solution"])}).parse(input)));
  throw new AppError(404,"Not found.");
 }catch(error){
   if(error instanceof z.ZodError)return Response.json({error:"Check the submitted fields.",issues:error.issues.map(i=>({path:i.path,message:i.message}))},{status:400});
   if(error instanceof AppError)return Response.json({error:error.message},{status:error.status});
   console.error("Learning request failed",error instanceof Error?error.name:"unknown");
   return Response.json({error:"The request could not be completed. Your saved work is safe; please try again."},{status:503});
 }
}
export const GET=handle;export const POST=handle;
