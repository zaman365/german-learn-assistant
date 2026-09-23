import { german } from "./de";
import type { PlanTask } from "@/planning/planner";
export function translate(text: string, language: "en" | "de") {
  return language === "de"
    ? german[text] || text
    : text.includes("_") && german[text]
      ? text.replaceAll("_", " ")
      : text;
}
export function planText(
  task: PlanTask,
  language: "en" | "de",
  lessons: { id: string; subtitle: string }[],
) {
  if (language === "en") return { title: task.title, reason: task.reasonText };
  const lesson = lessons.find((l) => task.href === "/learn/" + l.id);
  const skill = task.targetSkills.map((s) => translate(s, language)).join(", ");
  const title =
    task.reasonCode === "resume"
      ? "Fortsetzen: " + (lesson?.subtitle || task.title)
      : task.reasonCode === "recurring_error"
        ? "Gezielt üben: " + skill
        : task.reasonCode === "weekly_evidence_gap"
          ? skill + " diese Woche üben"
          : lesson?.subtitle || translate(task.title, language);
  const reasons: Record<string, string> = {
    repair_revisit:
      "Lies die Erklärung und übe die Korrektur. Für einen selbstständigen Nachweis fehlt noch eine neue, unbekannte Aufgabe.",
    resume:
      "Setze die bereits begonnene Übung fort. Dein Stand ist gespeichert.",
    review_due:
      "Fällige Wiederholungen werden in einem überschaubaren Block geübt.",
    evidence_gap:
      "Eine kurze Standortbestimmung hilft, passende Brückenübungen auszuwählen.",
    recurring_error:
      "Wiederkehrende Fehler zeigen, dass eine neue selbstständige Anwendung nötig ist.",
    weekly_evidence_gap:
      "Für diese Fertigkeit fehlt in den letzten sieben Tagen eine bewertete selbstständige Leistung.",
    next_prerequisite_ready: task.reasonText.startsWith("Work through")
      ? "Bearbeite einen sinnvollen Abschnitt. Dein Stand wird gespeichert."
      : "Diese Lektion ist als nächster Schritt in deinem Lernweg verfügbar.",
    session_close:
      "Prüfe deine gespeicherten Leistungen und die nächsten Wiederholungstermine.",
  };
  return { title, reason: reasons[task.reasonCode] || task.reasonText };
}
