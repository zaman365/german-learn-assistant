import { requireUser } from "@/auth/server";
import { profileFor } from "@/learning/service";
import Shell from "@/components/shell";
export const dynamic="force-dynamic";
export default async function WorkspaceLayout({children}:{children:React.ReactNode}){const user=await requireUser();const profile=await profileFor(user.id,user.name);return <Shell name={profile.data.name} language={profile.data.language}>{children}</Shell>;}
