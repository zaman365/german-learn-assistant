import { UiText } from "@/components/ui-language";
import { requireUser } from "@/auth/server";
import { profileFor } from "@/learning/service";
import DataTools from "@/components/data-tools";
import ProfileForm from "@/components/profile-form";
export default async function Settings() {
  const user = await requireUser();
  const profile = await profileFor(user.id);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"YOUR PREFERENCES"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"Fit learning around your life."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {"Your schedule can change without losing your history."}
            </UiText>{" "}
          </p>
        </div>
      </div>
      <ProfileForm initial={profile.data} />
      <DataTools />
    </>
  );
}
