"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { authClient } from "@/auth/client";
export default function LoginForm() {
  const router = useRouter(); const [error,setError] = useState(""); const [busy,setBusy] = useState(false);
  return <form className="auth-form" onSubmit={async e=>{e.preventDefault();setBusy(true);setError("");const data=new FormData(e.currentTarget);try {const result=await authClient.signIn.email({email:String(data.get("email")),password:String(data.get("password"))});if(result.error)setError(result.error.message||"Unable to sign in. Check your details.");else{router.push("/today");router.refresh();}}catch{setError("Sign-in is temporarily unavailable. Please try again.");}finally{setBusy(false);}}}>
    <span className="eyebrow">YOUR PERSONAL COURSE</span><h1 style={{marginTop:16}}>Welcome back.</h1><p className="muted">Sign in to continue where you left off.</p>
    <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="username" required placeholder="you@example.com"/></div>
    <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required/></div>
    {error&&<div className="feedback error" role="alert">{error}</div>}<button className="button" disabled={busy} type="submit">{busy?"Signing in…":"Continue learning"}<ArrowRight size={17}/></button>
    <p className="status-note"><LockKeyhole size={14} style={{display:"inline",marginRight:6}}/>A private learning space. Contact the account owner if you need access or a password reset.</p>
  </form>;
}
