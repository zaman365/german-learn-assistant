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
          <span className="eyebrow">A COURSE THAT FITS YOU</span>
          <h1 style={{ marginTop: 12 }}>Start from where you are.</h1>
          <p className="muted">
            Three short questions. Then a useful first step.
          </p>
        </div>
        <span className="badge neutral">About 2 minutes</span>
      </div>
      <ProfileForm initial={p.data} onboarding />
    </>
  );
}
