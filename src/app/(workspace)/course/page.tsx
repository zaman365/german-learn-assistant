import { UiText } from "@/components/ui-language";
import { requireUser } from "@/auth/server";
import { dashboard } from "@/learning/service";
import CourseMap from "@/components/course-map";
export default async function Course() {
  const user = await requireUser();
  const data = await dashboard(user.id);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"YOUR COURSE"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"A clear route. Your own pace."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {"Learn C1 first, then prepare specifically for DTB C1."}
            </UiText>{" "}
          </p>
        </div>
        <span className="badge neutral">
          {data.stats.completed} / {data.stats.total}{" "}
          <UiText>{"published lessons"}</UiText>{" "}
        </span>
      </div>
      <CourseMap
        data={{
          catalog: data.catalog,
          modules: data.modules,
          routes: data.routes,
        }}
      />
    </>
  );
}
