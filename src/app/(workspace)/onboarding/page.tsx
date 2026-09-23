import { UiText } from "@/components/ui-language";
import { requireUser } from "@/auth/server";
import { profileFor } from "@/learning/service";
import ProfileForm from "@/components/profile-form";
export default async function Onboarding() {
  const user = await requireUser();
  const p = await profileFor(user.id, user.name);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"A COURSE THAT FITS YOU"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"Start from where you are."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {"Three short questions. Then a useful first step."}
            </UiText>{" "}
          </p>
        </div>
        <span className="badge neutral">
          <UiText>{"About 2 minutes"}</UiText>
        </span>
      </div>
      <ProfileForm initial={p.data} onboarding />
    </>
  );
}
