"use client";
import { UiText } from "@/components/ui-language";
import { useCallback, useEffect, useState } from "react";
export default function RecordingPlayer({ mediaId }: { mediaId: string }) {
  const [url, setUrl] = useState(""),
    [error, setError] = useState(""),
    [deleted, setDeleted] = useState(false);
  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/media/" + mediaId + "/link", {
          cache: "no-store",
        }),
        data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUrl(data.url);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, [mediaId]);
  useEffect(() => {
    if (mediaId) void refresh();
  }, [mediaId, refresh]); // Signed URLs are refreshed only on demand after expiry.
  return (
    <div>
      {url && !deleted && (
        <audio
          controls
          src={url}
          onError={() =>
            setError(
              "Playback expired or became unavailable. Refresh the link to try again.",
            )
          }
          style={{ width: "100%" }}
          aria-label="Saved private recording"
        />
      )}
      {error && (
        <p role="status" className="small">
          {error}
        </p>
      )}
      {!deleted && (
        <>
          <button className="button ghost small" onClick={refresh}>
            {" "}
            <UiText>{"Refresh playback link"}</UiText>{" "}
          </button>
          <details className="disclosure">
            <summary className="small">
              <UiText>{"Delete this recording"}</UiText>
            </summary>
            <p className="small">
              The audio is removed from private storage. Your written feedback
              and attempt history stay in your learning record.
            </p>
            <button
              className="button secondary"
              onClick={async () => {
                const r = await fetch("/api/media/" + mediaId, {
                  method: "DELETE",
                });
                if (r.ok) {
                  setDeleted(true);
                  setUrl("");
                  setError("Recording deleted.");
                } else setError((await r.json()).error);
              }}
            >
              {" "}
              <UiText>{"Delete audio"}</UiText>{" "}
            </button>
          </details>
        </>
      )}
    </div>
  );
}
