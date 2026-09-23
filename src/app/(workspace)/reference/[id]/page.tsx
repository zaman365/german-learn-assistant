import Link from "next/link";
import { notFound } from "next/navigation";
import { getReference } from "@/content/catalog";
import Markdown from "@/components/markdown";
export default async function ReferenceEntry({params}:{params:Promise<{id:string}>}){const{id}=await params;const ref=getReference(id);if(!ref)notFound();return <><Link className="inline-link" href="/reference">← All references</Link><article className="card lesson-main section-space"><Markdown body={ref.body}/></article></>;}
