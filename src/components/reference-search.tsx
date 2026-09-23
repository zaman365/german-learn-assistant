"use client";
import { UiText } from "@/components/ui-language";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
export default function ReferenceSearch({
  entries,
}: {
  entries: { id: string; title: string; body: string }[];
}) {
  const [q, setQ] = useState("");
  const results = entries.filter((e) =>
    `${e.title} ${e.body}`.toLocaleLowerCase().includes(q.toLocaleLowerCase()),
  );
  return (
    <>
      <div className="field search">
        <label htmlFor="reference-query" className="screen-reader">
          {" "}
          <UiText>{"Search grammar references"}</UiText>{" "}
        </label>
        <div className="row">
          <Search size={18} />
          <input
            id="reference-query"
            placeholder="Search cases, endings, word order…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
      <div className="grid-two">
        {results.map((e) => (
          <Link
            className="card"
            style={{ textDecoration: "none" }}
            href={`/reference/${e.id}`}
            key={e.id}
          >
            <div className="card-header">
              <BookOpen size={22} />
              <ArrowRight size={18} />
            </div>
            <h2>{e.title}</h2>
            <p className="small muted" style={{ margin: 0 }}>
              Explanation, examples and the limits of the rule.
            </p>
          </Link>
        ))}
      </div>
      {!results.length && (
        <div className="empty">
          No matching reference. Try a shorter term such as “dative” or “verb”.
        </div>
      )}
    </>
  );
}
