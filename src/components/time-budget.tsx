"use client";
import { UiText, useUi } from "@/components/ui-language";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock3 } from "lucide-react";
import { api } from "@/lib/api";
import type { Profile } from "@/db/schema";
export default function TimeBudget({ profile }: { profile: Profile }) {
  const { t } = useUi();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <label className="row small" style={{ gap: 9 }}>
        <Clock3 size={16} />
        <span className="screen-reader">
          <UiText>{"Available study time"}</UiText>
        </span>
        <select
          aria-label={t("Available study time")}
          disabled={busy}
          value={profile.minutes}
          style={{ width: 156, minHeight: 42, padding: "7px 12px" }}
          onChange={async (e) => {
            setBusy(true);
            try {
              await api("profile", {
                ...profile,
                minutes: Number(e.target.value),
              });
              router.refresh();
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          {[...new Set([20, 30, 45, 60, 90, profile.minutes])]
            .sort((a, b) => a - b)
            .map((m) => (
              <option key={m} value={m}>
                {m} <UiText>{"minutes today"}</UiText>{" "}
              </option>
            ))}
        </select>
      </label>
      {error && (
        <p role="alert" className="small">
          {error}
        </p>
      )}
    </div>
  );
}
