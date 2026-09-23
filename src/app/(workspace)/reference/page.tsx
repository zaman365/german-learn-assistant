import { UiText } from "@/components/ui-language";
import { getReferences } from "@/content/catalog";
import ReferenceSearch from "@/components/reference-search";
export default function Reference() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"YOUR REFERENCE LIBRARY"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"The explanation is right here."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {"Articles, cases and clear patterns—with their exceptions."}
            </UiText>{" "}
          </p>
        </div>
      </div>
      <ReferenceSearch entries={getReferences()} />
    </>
  );
}
