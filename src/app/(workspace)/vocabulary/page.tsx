import { UiText } from "@/components/ui-language";
import { vocabulary } from "@/content/catalog";
import VocabularyBrowser from "@/components/vocabulary-browser";
export default function Vocabulary() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"WORDS YOU CAN USE"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"More than a translation."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {"Articles, plurals, verb patterns and phrases for real work."}
            </UiText>{" "}
          </p>
        </div>
      </div>
      <VocabularyBrowser entries={vocabulary} />
    </>
  );
}
