"use client";
import { createContext, useContext, type ReactNode } from "react";
import { translate } from "@/i18n";
const Language = createContext<"en" | "de">("en");
export function UiLanguage({
  language,
  children,
}: {
  language: "en" | "de";
  children: ReactNode;
}) {
  return <Language.Provider value={language}>{children}</Language.Provider>;
}
export function useUi() {
  const language = useContext(Language);
  return {
    language,
    t: (text: string) => translate(text, language),
  };
}
export function UiText({ children }: { children: string }) {
  const { t } = useUi();
  return <>{t(children)}</>;
}
