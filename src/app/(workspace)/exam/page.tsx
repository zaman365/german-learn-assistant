import { requireUser } from "@/auth/server";
import { examCatalog } from "@/exams/service";
import ExamCatalog from "@/components/exam-catalog";
export default async function Exam() {
  const user = await requireUser();
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">PART II · DTB C1 LAB</span>
          <h1 style={{ marginTop: 12 }}>Know the format. Show the skill.</h1>
          <p className="muted">
            Original section practice, saved responses and clear evidence gaps.
          </p>
        </div>
      </div>
      <ExamCatalog initial={await examCatalog(user.id)} />
    </>
  );
}
