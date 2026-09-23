"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { api } from "@/lib/api";
import type { Profile } from "@/db/schema";
export default function ProfileForm({
  initial,
  onboarding = false,
}: {
  initial: Profile;
  onboarding?: boolean;
}) {
  const [p, setP] = useState(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState("");
  const router = useRouter();
  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setP((prev) => ({ ...prev, [key]: value }));
  return (
    <form
      className="card"
      style={{ maxWidth: 800 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          const r = await api<{ savedAt: string }>("profile", {
            ...p,
            onboardingComplete: true,
          });
          setSaved(r.savedAt);
          if (onboarding) router.push("/diagnostic");
          router.refresh();
        } catch (e) {
          setError((e as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="field">
        <label htmlFor="name">What should we call you?</label>
        <input
          id="name"
          maxLength={80}
          value={p.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </div>
      <h2>1. Where are you starting?</h2>
      <p className="muted small">
        A rough starting point is enough. Your diagnostic will help refine it.
      </p>
      <div className="field">
        <label htmlFor="level">Current learning or exam status</label>
        <select
          id="level"
          value={p.currentLevel}
          onChange={(e) => set("currentLevel", e.target.value)}
        >
          {[
            "not sure",
            "Studying B2",
            "Passed B2",
            "Studying C1",
            "Returning to German",
          ].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>
      <fieldset style={{ border: 0, padding: 0, marginBottom: 25 }}>
        <legend className="small" style={{ fontWeight: 600, marginBottom: 12 }}>
          What feels most difficult?
        </legend>
        <div className="chips">
          {[
            "Articles and cases",
            "Grammar",
            "Vocabulary",
            "Listening",
            "Speaking",
            "Writing",
          ].map((item) => (
            <label
              key={item}
              className="badge neutral"
              style={{ padding: "9px 12px", cursor: "pointer", gap: 8 }}
            >
              <input
                type="checkbox"
                checked={p.difficulties.includes(item)}
                onChange={(e) =>
                  set(
                    "difficulties",
                    e.target.checked
                      ? [...p.difficulties, item]
                      : p.difficulties.filter((v) => v !== item),
                  )
                }
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
      <h2>2. What fits your week?</h2>
      <div className="grid-two">
        <div className="field">
          <label htmlFor="minutes">Minutes per study day</label>
          <input
            id="minutes"
            type="number"
            min={10}
            max={180}
            value={p.minutes}
            onChange={(e) => set("minutes", Number(e.target.value))}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="days">Study days per week</label>
          <input
            id="days"
            type="number"
            min={1}
            max={7}
            value={p.days}
            onChange={(e) => set("days", Number(e.target.value))}
            required
          />
        </div>
      </div>
      <h2>3. Is there an exam date?</h2>
      <div className="field">
        <label htmlFor="exam-date">DTB C1 date · optional</label>
        <input
          id="exam-date"
          type="date"
          value={p.examDate || ""}
          onChange={(e) => set("examDate", e.target.value || null)}
        />
        <small>Leave blank if you are still building your foundations.</small>
      </div>
      <details className="disclosure">
        <summary>A few optional preferences</summary>
        <div className="section-space">
          <div className="field">
            <label htmlFor="language">Navigation language</label>
            <select
              id="language"
              value={p.language}
              onChange={(e) => set("language", e.target.value as "en" | "de")}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
            <small>English explanations stay available during study.</small>
          </div>
          <div className="field">
            <label htmlFor="timezone">Study timezone</label>
            <input
              id="timezone"
              value={p.timezone}
              onChange={(e) => set("timezone", e.target.value)}
              required
            />
            <small>
              For example, Europe/Berlin. Review dates follow your local
              calendar.
            </small>
          </div>
          <div className="field">
            <label htmlFor="languages">First or other languages</label>
            <input
              id="languages"
              value={p.firstLanguages}
              onChange={(e) => set("firstLanguages", e.target.value)}
              maxLength={150}
            />
          </div>
          <div className="field">
            <label htmlFor="bsk">Current Berufssprachkurs status</label>
            <input
              id="bsk"
              value={p.bskStatus}
              onChange={(e) => set("bskStatus", e.target.value)}
              maxLength={200}
            />
            <small>
              This helps planning; it does not confirm exam eligibility.
            </small>
          </div>
        </div>
      </details>
      {error && (
        <p className="feedback error" role="alert">
          {error}
        </p>
      )}
      {saved && !onboarding && (
        <p className="feedback" role="status">
          <Check size={16} style={{ display: "inline" }} /> Saved at{" "}
          {new Date(saved).toLocaleTimeString()}
        </p>
      )}
      <button type="submit" className="button section-space" disabled={busy}>
        {busy
          ? "Saving…"
          : onboarding
            ? "Find my starting point"
            : "Save preferences"}
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
