import { requireUser } from "@/auth/server";
import { getExam } from "@/exams/service";
import ExamRunner from "@/components/exam-runner";
export default async function ExamAttempt({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser(),
    { id } = await params;
  const run = await getExam(user.id, id);
  return <ExamRunner initial={JSON.parse(JSON.stringify(run))} />;
}
