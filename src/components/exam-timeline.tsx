"use client";
import { useRef, useState } from "react";
export default function ExamTimeline({ examId }: { examId: string }) {
  const audio = useRef<HTMLAudioElement>(null),
    [started, setStarted] = useState(false),
    [error, setError] = useState("");
  return (
    <section className="example">
      <h3>Continuous listening block</h3>
      <p>
        The 25-minute server clock is running. Listen once. Reconnecting resumes
        at the current point in the sequence; earlier passages are not replayed.
      </p>
      <audio
        ref={audio}
        preload="none"
        onEnded={() => setError("The listening sequence has ended.")}
        onError={() =>
          setError(
            "Audio was interrupted. Reconnect below to resume at the server’s current position.",
          )
        }
      />
      <button
        className="button"
        disabled={started && !error}
        onClick={async () => {
          try {
            const player = audio.current!;
            player.src =
              "/api/exams/" + examId + "/timeline?connection=" + Date.now();
            await player.play();
            setStarted(true);
            setError("");
          } catch {
            setError(
              "Your browser could not start playback. Select the button again to allow audio.",
            );
          }
        }}
      >
        {started ? "Reconnect at current position" : "Start listening now"}
      </button>
      {error && (
        <p role="status" className="small">
          {error}
        </p>
      )}
    </section>
  );
}
