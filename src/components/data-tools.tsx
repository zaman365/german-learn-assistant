"use client";
import { useState } from "react";
type Preview = {
  hash: string;
  kind: string;
  valid: boolean;
  newAttempts: number;
  duplicates: number;
  conflicts: string[];
  warnings: string[];
};
export default function DataTools() {
  const [payload, setPayload] = useState<unknown>(null),
    [preview, setPreview] = useState<Preview | null>(null),
    [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  async function read(file?: File) {
    if (!file) return;
    setPreview(null);
    setError("");
    setMessage("");
    setBusy(true);
    try {
      if (file.size > 24 * 1024 * 1024)
        throw new Error("Choose a JSON package smaller than 24 MB.");
      const value = JSON.parse(await file.text());
      setPayload(value);
      const response = await fetch("/api/data/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        }),
        result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setPreview(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function merge() {
    if (!preview) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/data/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ package: payload, previewHash: preview.hash }),
        }),
        result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessage(
        result.duplicate
          ? "This package was already imported. No duplicate records were created."
          : "Import saved. Your history is preserved and current progress has been rebuilt from evidence.",
      );
      setPreview(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="card section-space">
      <span className="eyebrow">YOUR LEARNING DATA</span>
      <h2 style={{ marginTop: 12 }}>Keep a copy. Bring your history.</h2>
      <p className="muted">
        Download your evidence and progress, or merge a previous JSON package
        after reviewing it. Import never replaces your existing profile or
        deletes your work.
      </p>
      <div
        className="row"
        style={{ justifyContent: "flex-start", flexWrap: "wrap" }}
      >
        {[
          ["json", "JSON backup"],
          ["summary", "Readable summary"],
          ["vocabulary", "Vocabulary CSV"],
          ["reviews", "Review CSV"],
        ].map(([id, label]) => (
          <a className="button secondary" key={id} href={"/api/data/" + id}>
            {label}
          </a>
        ))}
      </div>
      <p className="small muted">
        The JSON includes recording metadata and feedback, but not audio bytes.
        Keep a private-store backup alongside your database for full recording
        recovery.
      </p>
      <div className="field section-space">
        <label htmlFor="import-file">
          Import a learning backup or learning_record.json
        </label>
        <input
          id="import-file"
          type="file"
          accept=".json,application/json"
          onChange={(e) => void read(e.target.files?.[0])}
          disabled={busy}
        />
      </div>
      {busy && <p role="status">Processing your file…</p>}
      {error && (
        <p className="feedback error" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="feedback" role="status">
          {message}
        </p>
      )}
      {preview && (
        <div className="example">
          <h3>Import preview · {preview.kind}</h3>
          <p>
            {preview.newAttempts} new responses · {preview.duplicates} existing
            responses
          </p>
          {preview.warnings.map((w) => (
            <p className="small" key={w}>
              {w}
            </p>
          ))}
          {preview.conflicts.map((c) => (
            <p className="small feedback error" key={c}>
              {c}
            </p>
          ))}
          <button
            className="button"
            disabled={!preview.valid || busy}
            onClick={merge}
          >
            Merge this reviewed package
          </button>
        </div>
      )}
    </section>
  );
}
