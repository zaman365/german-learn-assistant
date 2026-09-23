import { vocabulary } from "@/content/catalog";
import VocabularyBrowser from "@/components/vocabulary-browser";
export default function Vocabulary(){return <><div className="page-heading"><div><span className="eyebrow">WORDS YOU CAN USE</span><h1 style={{marginTop:12}}>More than a translation.</h1><p className="muted">Articles, plurals, verb patterns and phrases for real work.</p></div></div><VocabularyBrowser entries={vocabulary}/></>;}
