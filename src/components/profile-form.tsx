"use client";
import { UiText } from "@/components/ui-language";
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
        <label htmlFor="name">
          <UiText>{"What should we call you?"}</UiText>
        </label>
        <input
          id="name"
          maxLength={80}
          value={p.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </div>
      <h2>
        <UiText>{"1. Where are you starting?"}</UiText>
      </h2>
      <p className="muted small">
        A rough starting point is enough. Your diagnostic will help refine it.
      </p>
      <div className="field">
        <label htmlFor="level">
          <UiText>{"Current learning or exam status"}</UiText>
        </label>
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
            <option key={v} value={v}>
              <UiText>{v}</UiText>
            </option>
          ))}
        </select>
      </div>
      <fieldset style={{ border: 0, padding: 0, marginBottom: 25 }}>
        <legend className="small" style={{ fontWeight: 600, marginBottom: 12 }}>
          {" "}
          <UiText>{"What feels most difficult?"}</UiText>{" "}
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
              <UiText>{item}</UiText>
            </label>
          ))}
        </div>
      </fieldset>
      <h2>
        <UiText>{"2. What fits your week?"}</UiText>
      </h2>
      <div className="grid-two">
        <div className="field">
          <label htmlFor="minutes">
            <UiText>{"Minutes per study day"}</UiText>
          </label>
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
          <label htmlFor="days">
            <UiText>{"Study days per week"}</UiText>
          </label>
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
      <h2>
        <UiText>{"3. Is there an exam date?"}</UiText>
      </h2>
      <div className="field">
        <label htmlFor="exam-date">
          <UiText>{"DTB C1 date · optional"}</UiText>
        </label>
        <input
          id="exam-date"
          type="date"
          value={p.examDate || ""}
          onChange={(e) => set("examDate", e.target.value || null)}
        />
        <small>
          <UiText>
            {"Leave blank if you are still building your foundations."}
          </UiText>
        </small>
      </div>
      <details className="disclosure">
        <summary>
          <UiText>{"A few optional preferences"}</UiText>
        </summary>
        <div className="section-space">
          <div className="field">
            <label htmlFor="language">
              <UiText>{"Navigation language"}</UiText>
            </label>
            <select
              id="language"
              value={p.language}
              onChange={(e) => set("language", e.target.value as "en" | "de")}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
            <small>
              <UiText>
                {"English explanations stay available during study."}
              </UiText>
            </small>
          </div>
          <div className="field">
            <label htmlFor="timezone">
              <UiText>{"Study timezone"}</UiText>
            </label>
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
            <label htmlFor="languages">
              <UiText>{"First or other languages"}</UiText>
            </label>
            <input
              id="languages"
              value={p.firstLanguages}
              onChange={(e) => set("firstLanguages", e.target.value)}
              maxLength={150}
            />
          </div>
          <div className="field">
            <label htmlFor="bsk">
              <UiText>{"Current Berufssprachkurs status"}</UiText>
            </label>
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
          <Check size={16} style={{ display: "inline" }} />{" "}
          <UiText>{"Saved at"}</UiText> {new Date(saved).toLocaleTimeString()}
        </p>
      )}
      <button type="submit" className="button section-space" disabled={busy}>
        {busy ? (
          <UiText>{"Saving…"}</UiText>
        ) : onboarding ? (
          <UiText>{"Find my starting point"}</UiText>
        ) : (
          <UiText>{"Save preferences"}</UiText>
        )}
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
