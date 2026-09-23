"use client";
import { UiText } from "@/components/ui-language";
import { useRef, useState } from "react";
export default function CourseAudio({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const audio = useRef<HTMLAudioElement>(null),
    [error, setError] = useState("");
  return (
    <section className="example">
      <h3>{title}</h3>
      <p className="small muted">
        Original course recording · synthetic speech when generated · study mode
      </p>
      <audio
        ref={audio}
        controls
        preload="metadata"
        src={"/api/course-audio/" + id}
        onError={() =>
          setError(
            "Audio is unavailable. This activity remains unassessed until its recording is ready.",
          )
        }
        style={{ width: "100%" }}
        aria-label={title}
      />
      <label className="small">
        {" "}
        <UiText>{"Playback speed"}</UiText>{" "}
        <select
          aria-label="Playback speed"
          defaultValue="1"
          style={{ width: 120, display: "inline-block", marginLeft: 10 }}
          onChange={(e) => {
            if (audio.current)
              audio.current.playbackRate = Number(e.target.value);
          }}
        >
          <option value=".75">0.75×</option>
          <option value="1">1×</option>
          <option value="1.15">1.15×</option>
        </select>
      </label>
      {error && (
        <p role="status" className="small">
          {error}
        </p>
      )}
    </section>
  );
}
