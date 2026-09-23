"use client";
import { UiText, useUi } from "./ui-language";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock3, LockKeyhole } from "lucide-react";
import type { Dashboard } from "@/learning/service";
const stages = [
  {
    id: "article",
    name: "Article toolkit",
    description: "Build reliable noun packages and separate gender from case.",
  },
  {
    id: "pronunciation",
    name: "Pronunciation",
    description:
      "Study the patterns, record your voice and check actual sound evidence.",
  },
  {
    id: "bridge",
    name: "B2 → C1 bridge",
    description:
      "Make the foundations comfortable. Your diagnostic decides where to spend time.",
  },
  {
    id: "c1",
    name: "Professional C1",
    description: "Eighteen modules for clear, confident communication at work.",
  },
  {
    id: "exam",
    name: "DTB C1 lab",
    description: "Focused exam preparation after your C1 foundations.",
  },
  {
    id: "c2",
    name: "Toward C2",
    description: "A separate route into nuance, synthesis and flexibility.",
  },
];
export default function CourseMap({
  data,
}: {
  data: Pick<Dashboard, "catalog" | "modules" | "routes">;
}) {
  const { language, t } = useUi();
  const [stage, setStage] = useState("bridge");
  return (
    <>
      <div className="tabs" role="group" aria-label={t("Learning stages")}>
        {stages.map((s) => (
          <button
            aria-pressed={s.id === stage}
            key={s.id}
            className={s.id === stage ? "selected" : ""}
            onClick={() => setStage(s.id)}
          >
            {t(s.name)}
          </button>
        ))}
      </div>
      <p className="muted" style={{ marginBottom: 28 }}>
        {t(stages.find((s) => s.id === stage)?.description || "")}
      </p>
      <div className="stack">
        {data.modules
          .filter((m) => m.stage === stage)
          .map((module) => {
            const lessons = data.catalog.filter(
              (l) => l.moduleId === module.id,
            );
            const route = data.routes.find((r) => r.moduleId === module.id);
            return (
              <section key={module.id} className="card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{module.id}</span>
                    <h2 style={{ marginTop: 6 }}>{module.title}</h2>
                  </div>
                  <span className={`badge ${!lessons.length ? "neutral" : ""}`}>
                    {route ? (
                      route.route === "skip" ? (
                        <UiText>{"Placement waiver"}</UiText>
                      ) : (
                        route.route
                      )
                    ) : lessons.length ? (
                      `${lessons.length} lessons`
                    ) : (
                      <UiText>{"Being prepared"}</UiText>
                    )}
                  </span>
                </div>
                {route && <p className="small muted">{route.rationale}</p>}
                {lessons.map((l) => (
                  <div className="activity" key={l.id}>
                    <div className="activity-icon">
                      {l.state === "completed" ? (
                        <Check size={20} />
                      ) : l.available ? (
                        <BookIcon />
                      ) : (
                        <LockKeyhole size={19} />
                      )}
                    </div>
                    <div className="grow">
                      <h3>{language === "de" ? l.subtitle : l.title}</h3>
                      <p className="small muted" lang="de">
                        {l.subtitle}
                      </p>
                      <span className="small muted">
                        <Clock3 size={13} style={{ display: "inline" }} />{" "}
                        {l.minutes} min · <UiText>{l.state}</UiText>
                      </span>
                    </div>
                    {l.available ? (
                      <Link
                        href={`/learn/${l.id}`}
                        className="button secondary"
                      >
                        {t(l.state === "completed" ? "Review" : "Open")}
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <span className="small muted">
                        {l.audioUnavailable
                          ? t("Audio preparation required")
                          : t("Complete the prerequisite")}
                      </span>
                    )}
                  </div>
                ))}
                {!lessons.length && (
                  <p className="small muted" style={{ margin: 0 }}>
                    This module is on your route. Its teaching materials are not
                    published yet.
                  </p>
                )}
              </section>
            );
          })}
      </div>
    </>
  );
}
function BookIcon() {
  return <span style={{ fontSize: 20 }}>Aa</span>;
}
