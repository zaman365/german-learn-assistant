import { getReferences } from "@/content/catalog";
import ReferenceSearch from "@/components/reference-search";
export default function Reference() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR REFERENCE LIBRARY</span>
          <h1 style={{ marginTop: 12 }}>The explanation is right here.</h1>
          <p className="muted">
            Articles, cases and clear patterns—with their exceptions.
          </p>
        </div>
      </div>
      <ReferenceSearch entries={getReferences()} />
    </>
  );
}
