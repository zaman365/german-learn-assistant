import Link from "next/link";
export default function NotFound() {
  return (
    <main className="card" style={{ maxWidth: 660, margin: "12vh auto" }}>
      <h1>This page isn’t on your route.</h1>
      <p className="muted">
        Return to your course to find the next available lesson.
      </p>
      <Link className="button" href="/today">
        Back to Today
      </Link>
    </main>
  );
}
