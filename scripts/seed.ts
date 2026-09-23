import "dotenv/config";
import { createHash } from "node:crypto";
import { and,eq } from "drizzle-orm";
import { getDb,closeDb } from "../src/db";
import { contentVersions } from "../src/db/schema";
import { lessons,diagnostic,vocabulary,getReferences,modules } from "../src/content/catalog";
import { validateContent } from "./validate-content";
async function main(){
  const counts=validateContent();const db=getDb();
  const entries=[...lessons,diagnostic].map(l=>({id:l.id,version:l.version,type:"lesson",payload:l,published:l.status==="published"}));
  const others=[...vocabulary.map(w=>({id:`lex:${w.id}`,type:"lexical",payload:w})),...getReferences().map(r=>({id:`ref:${r.id}`,type:"reference",payload:r})),...modules.map(m=>({id:m.id,type:"module",payload:m}))].map(x=>({...x,version:1,published:true}));
  await db.transaction(async tx=>{for(const entry of [...entries,...others]){
    const hash=createHash("sha256").update(JSON.stringify(entry.payload)).digest("hex");
    const existing=(await tx.select().from(contentVersions).where(and(eq(contentVersions.id,entry.id),eq(contentVersions.version,entry.version))))[0];
    if(existing&&existing.hash!==hash)throw new Error(`Immutable content collision: ${entry.id} v${entry.version}. Increase its version.`);
    if(!existing)await tx.insert(contentVersions).values({...entry,hash});
  }});
  console.log("Published content without modifying learner progress:",counts);
}
main().finally(closeDb);
