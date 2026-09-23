import { requireUser } from "@/auth/server";
import { profileFor } from "@/learning/service";
import ProfileForm from "@/components/profile-form";
export default async function Settings(){const user=await requireUser();const profile=await profileFor(user.id);return <><div className="page-heading"><div><span className="eyebrow">YOUR PREFERENCES</span><h1 style={{marginTop:12}}>Fit learning around your life.</h1><p className="muted">Your schedule can change without losing your history.</p></div></div><ProfileForm initial={profile.data}/></>;}
