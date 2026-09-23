import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function Markdown({ body }: { body: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          code: ({ className, children }) =>
            className === "language-mermaid" ? (
              <span style={{ display: "grid", gap: 10 }}>
                {[
                  "1. Identify the noun’s meaning and any compound head.",
                  "2. Check a reliable derivational rule, its scope and exceptions.",
                  "3. Verify the lexical entry and save article, meaning and plural.",
                  "4. Choose case from the sentence.",
                  "5. Apply article, adjective and noun endings.",
                ].map((s) => (
                  <span
                    key={s}
                    className="example"
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      whiteSpace: "normal",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </span>
            ) : (
              <code className={className}>{children}</code>
            ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
