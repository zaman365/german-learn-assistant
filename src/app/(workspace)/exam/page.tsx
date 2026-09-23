import { UiText } from "@/components/ui-language";
import { requireUser } from "@/auth/server";
import { examCatalog } from "@/exams/service";
import ExamCatalog from "@/components/exam-catalog";
export default async function Exam() {
  const user = await requireUser();
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"PART II · DTB C1 LAB"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"Know the format. Show the skill."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {
                "Original section practice, saved responses and clear evidence gaps."
              }
            </UiText>{" "}
          </p>
        </div>
      </div>
      <ExamCatalog initial={await examCatalog(user.id)} />
    </>
  );
}
