"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Square, Upload, RotateCcw } from "lucide-react";
import { encodeWav } from "@/audio/encode";
import type { PublicRun } from "@/exams/service";
import type { submitAttempt } from "@/learning/service";
type Saved = Awaited<ReturnType<typeof submitAttempt>> & {
  media: { id: string; duration: number; url: string };
};
export default function AudioRecorder({
  lessonId,
  exerciseId,
  attemptKey,
  onSaved,
  examId,
  onExamSaved,
}: {
  lessonId?: string;
  exerciseId: string;
  attemptKey: string;
  onSaved?: (result: Saved) => void;
  examId?: string;
  onExamSaved?: (result: {
    media: { id: string; duration: number; url: string };
    run: PublicRun;
  }) => void;
}) {
  const [state, setState] = useState("idle"),
    [blob, setBlob] = useState<Blob | null>(null),
    [url, setUrl] = useState(""),
    [seconds, setSeconds] = useState(0),
    [error, setError] = useState(""),
    [progress, setProgress] = useState(0);
  const resources = useRef<{
      context: AudioContext;
      stream: MediaStream;
      node: AudioWorkletNode;
      chunks: Float32Array[];
      samples: number;
    } | null>(null),
    xhr = useRef<XMLHttpRequest | null>(null);
  const finish = useCallback(() => {
    const r = resources.current;
    if (!r) return;
    r.node.disconnect();
    r.stream.getTracks().forEach((t) => t.stop());
    const take = encodeWav(r.chunks, r.context.sampleRate);
    void r.context.close();
    resources.current = null;
    setBlob(take);
    setState("recorded");
  }, []);
  useEffect(() => {
    if (!blob) {
      setUrl("");
      return;
    }
    const local = URL.createObjectURL(blob);
    setUrl(local);
    return () => URL.revokeObjectURL(local);
  }, [blob]);
  useEffect(
    () => () => {
      xhr.current?.abort();
      const r = resources.current;
      r?.stream.getTracks().forEach((t) => t.stop());
      void r?.context.close();
    },
    [],
  );
  async function start() {
    setError("");
    setState("requesting");
    setBlob(null);
    setSeconds(0);
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.AudioWorkletNode)
        throw new Error(
          "This browser cannot record audio here. Use a current browser over HTTPS or localhost.",
        );
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      const context = new AudioContext();
      try {
        await context.audioWorklet.addModule("/audio-recorder.js");
        await context.resume();
      } catch (e) {
        stream.getTracks().forEach((t) => t.stop());
        await context.close();
        throw e;
      }
      const node = new AudioWorkletNode(context, "german-pcm-recorder"),
        source = context.createMediaStreamSource(stream),
        muted = context.createGain();
      muted.gain.value = 0;
      source.connect(node);
      node.connect(muted);
      muted.connect(context.destination);
      const r = {
        context,
        stream,
        node,
        chunks: [] as Float32Array[],
        samples: 0,
      };
      resources.current = r;
      node.port.onmessage = (event: MessageEvent<Float32Array>) => {
        if (resources.current !== r) return;
        const remaining = Math.max(
            0,
            Math.floor(context.sampleRate * 300) - r.samples,
          ),
          chunk = event.data.slice(0, remaining);
        if (chunk.length) {
          r.chunks.push(chunk);
          r.samples += chunk.length;
        }
        const duration = r.samples / context.sampleRate;
        setSeconds(Math.floor(duration));
        if (duration >= 300) finish();
      };
      setState("recording");
    } catch (e) {
      setError(
        (e as Error).name === "NotAllowedError"
          ? "Microphone access was not allowed. You can enable it in your browser and try again."
          : (e as Error).message,
      );
      setState("idle");
    }
  }
  function upload() {
    if (!blob) return;
    setState("uploading");
    setError("");
    setProgress(0);
    const form = new FormData();
    form.set("file", blob, "recording.wav");
    if (lessonId) form.set("lessonId", lessonId);
    form.set("exerciseId", exerciseId);
    form.set("attemptKey", attemptKey);
    const request = new XMLHttpRequest();
    xhr.current = request;
    request.open(
      "POST",
      examId ? "/api/exams/" + examId + "/recording" : "/api/media/upload",
    );
    request.upload.onprogress = (e) => {
      if (e.lengthComputable)
        setProgress(Math.round((e.loaded / e.total) * 100));
    };
    request.onload = () => {
      try {
        const result = JSON.parse(request.responseText);
        if (request.status >= 400)
          throw new Error(result.error || "Upload failed.");
        setState("saved");
        if (examId) onExamSaved?.(result);
        else onSaved?.(result);
      } catch (e) {
        setError((e as Error).message);
        setState("recorded");
      }
    };
    request.onerror = () => {
      setError("Upload failed. Your local take is still here; try again.");
      setState("recorded");
    };
    request.onabort = () => setState("recorded");
    request.send(form);
  }
  return (
    <div className="example">
      <p className="small muted">
        Record in German · maximum 5 minutes. Your microphone starts only when
        you choose Record. The saved audio is private.
      </p>
      <div
        className="row"
        style={{ justifyContent: "flex-start", flexWrap: "wrap" }}
      >
        {state === "recording" ? (
          <button className="button" onClick={() => finish()}>
            <Square size={15} />
            Stop · {Math.floor(seconds / 60)}:
            {String(seconds % 60).padStart(2, "0")}
          </button>
        ) : (
          <button
            className="button secondary"
            onClick={start}
            disabled={["requesting", "uploading", "saved"].includes(state)}
          >
            {blob ? <RotateCcw size={16} /> : <Mic size={16} />}{" "}
            {state === "requesting"
              ? "Requesting microphone…"
              : blob
                ? "Record again"
                : "Record"}
          </button>
        )}
        {blob && state !== "saved" && (
          <button
            className="button"
            onClick={upload}
            disabled={state === "uploading" || !attemptKey}
          >
            <Upload size={15} />
            {state === "uploading"
              ? "Uploading " + progress + "%"
              : "Save recording"}
          </button>
        )}
        {state === "uploading" && (
          <button className="button ghost" onClick={() => xhr.current?.abort()}>
            Cancel upload
          </button>
        )}
      </div>
      {url && (
        <audio
          controls
          src={url}
          aria-label="Your recorded take"
          style={{ width: "100%", marginTop: 16 }}
        />
      )}
      {state === "recording" && (
        <p role="status" className="small">
          ● Recording · microphone active
        </p>
      )}
      {state === "saved" && (
        <p role="status" className="small">
          Recording and attempt saved.
        </p>
      )}
      {error && (
        <p role="alert" className="feedback error">
          {error}
        </p>
      )}
    </div>
  );
}
