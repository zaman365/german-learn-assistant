import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/auth/server";
import { dashboard,learnerLesson } from "@/learning/service";
import { lessons } from "@/content/catalog";
import LessonViewer from "@/components/lesson-viewer";
export default async function FocusPractice({params}:{params:Promise<{mode:string}>}){
 const user=await requireUser();const{mode}=await params;
 if(!["review","articles","grammar","writing","speaking","listening"].includes(mode))notFound();
 if(mode==="speaking"||mode==="listening")return <><span className="eyebrow">{mode.toUpperCase()} PRACTICE</span><h1 className="section-space">Audio practice is being connected.</h1><section className="card"><p>This mode needs its audio assets and recording tools before it can assess your {mode}. Your text-based work does not count as audio evidence.</p><Link href="/practice" className="button secondary">Choose another practice</Link></section></>;
 const d=await dashboard(user.id);const review=mode==="review"?d.due.sort((a,b)=>a.dueDate.localeCompare(b.dueDate))[0]:undefined;
 if(mode==="review"&&!review)return <section className="card empty"><h1>You’re up to date.</h1><p>Your next reviews appear when they are due. You can keep learning at your own pace.</p><Link href="/today" className="button">Back to Today</Link></section>;
 const chosen=mode==="writing"?lessons.find(l=>l.exercises.some(e=>e.type==="writing")):review?lessons.find(l=>l.exercises.some(e=>e.skill===review.targetId&&(review.mode==="recognition"?e.type==="choice":e.type!=="choice"))):lessons.find(l=>l.skills.some(s=>(mode==="articles"?["gender","case","noun-endings"]:["word-order","prepositions","adjective-endings"]).includes(s)));
 if(!chosen)return <section className="card"><h2>No matching practice is published yet.</h2><Link className="button" href="/today">Back to Today</Link></section>;
 const initial=await learnerLesson(user.id,chosen.id);initial.lesson.exercises=initial.lesson.exercises.filter(e=>mode==="writing"?e.type==="writing":review?e.skill===review.targetId&&(review.mode==="recognition"?e.type==="choice":e.type!=="choice"):true);initial.draft=null;
 return <LessonViewer initial={initial} onlyPractice reviewId={review?.id}/>;
}
