"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useUi } from "./ui-language";
export default function ArticleProbe({
  patternId,
  noun,
  preposition,
}: {
  patternId: string;
  noun: string;
  preposition: string;
}) {
  const { language } = useUi();
  const de = language === "de";
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const router = useRouter();
  return (
    <form
      className="card"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setMessage("");
        const data = new FormData(event.currentTarget);
        try {
          await api<{
            expected: { article: string; grammaticalCase: string };
          }>("article-probe", {
            patternId,
            article: data.get("article"),
            grammaticalCase: data.get("grammaticalCase"),
          });
          setMessage(
            de
              ? "Klärung gespeichert. Neue selbstständige Aufgaben an verschiedenen Tagen müssen die Verbesserung noch belegen."
              : "Probe saved. New independent tasks on separate days must still demonstrate recovery.",
          );
          router.refresh();
        } catch (error) {
          setMessage((error as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <h3>
        {de
          ? "Genus und Kasus getrennt prüfen"
          : "Check gender and case separately"}
      </h3>
      <div className="grid-two">
        <label className="field">
          {de
            ? `Wörterbuchartikel von „${noun}“`
            : `Dictionary article of “${noun}”`}
          <select name="article" required defaultValue="">
            <option value="" disabled>
              {de ? "Auswählen" : "Choose"}
            </option>
            {["der", "die", "das"].map((article) => (
              <option key={article}>{article}</option>
            ))}
          </select>
        </label>
        <label className="field">
          {de ? `Kasus nach „${preposition}“` : `Case after “${preposition}”`}
          <select name="grammaticalCase" required defaultValue="">
            <option value="" disabled>
              {de ? "Auswählen" : "Choose"}
            </option>
            {["nominative", "accusative", "dative", "genitive"].map(
              (value, i) => (
                <option value={value} key={value}>
                  {de
                    ? ["Nominativ", "Akkusativ", "Dativ", "Genitiv"][i]
                    : value}
                </option>
              ),
            )}
          </select>
        </label>
      </div>
      <button className="button secondary" disabled={busy}>
        {de ? "Klärung speichern" : "Save probe"}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
