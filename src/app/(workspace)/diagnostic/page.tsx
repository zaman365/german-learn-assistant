import { requireUser } from "@/auth/server";
import { learnerLesson } from "@/learning/service";
import LessonViewer from "@/components/lesson-viewer";
export default async function Diagnostic(){const user=await requireUser();return <LessonViewer initial={await learnerLesson(user.id,"D1")}/>;}
