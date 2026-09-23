import { lessons,diagnostic,vocabulary,getReference } from "../src/content/catalog";
import { lessonSchema,lexicalSchema } from "../src/content/types";
export function validateContent(){
  const ids=new Set<string>();const words=new Set(vocabulary.map(w=>w.id));
  for(const l of [...lessons,diagnostic]){
    lessonSchema.parse(l);if(ids.has(l.id))throw new Error(`Duplicate lesson: ${l.id}`);ids.add(l.id);
    for(const ref of l.references)if(!getReference(ref))throw new Error(`Missing reference: ${ref}`);
    for(const word of l.vocabulary)if(!words.has(word))throw new Error(`Missing vocabulary: ${word}`);
    for(const e of l.exercises){if(ids.has(e.id))throw new Error(`Duplicate exercise: ${e.id}`);ids.add(e.id);if(e.accepted?.length&&e.type==="choice"&&!e.accepted.every(a=>e.options?.includes(a)))throw new Error(`Answer outside options: ${e.id}`);}
  }
  const visit=(id:string,active:Set<string>)=>{if(active.has(id))throw new Error(`Prerequisite cycle: ${id}`);const lesson=lessons.find(l=>l.id===id);if(!lesson)throw new Error(`Missing prerequisite: ${id}`);for(const dep of lesson.prerequisites)visit(dep,new Set([...active,id]));};
  lessons.forEach(l=>visit(l.id,new Set())); vocabulary.forEach(w=>lexicalSchema.parse(w));
  if(words.size!==vocabulary.length)throw new Error("Duplicate lexical ID");
  const scored=[...lessons,diagnostic].flatMap(l=>l.exercises).filter(e=>e.accepted?.length).length;
  if(scored<60||vocabulary.length<80)throw new Error("M1 content floors are unmet");
  return {lessons:lessons.length,scoredItems:scored,lexicalEntries:vocabulary.length};
}
if(process.argv[1]?.includes("validate-content"))console.log(validateContent());
