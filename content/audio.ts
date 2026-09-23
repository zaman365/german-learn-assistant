import { checkpointAudio } from "./checkpoint-comprehension";
export type AudioScript = {
  id: string;
  version: number;
  title: string;
  kind: "course" | "exam";
  voice: string;
  script: string;
  quality: "awaiting_audio_review";
};
export const courseAudio: AudioScript[] = [
  ...checkpointAudio,
  {
    id: "audio-phone-01",
    version: 1,
    title: "A changed collection time",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Guten Tag, hier spricht Beate Krüger vom Lieferteam. Ich rufe wegen der Abholung am Donnerstag an. Der Fahrer kommt nicht wie angekündigt um neun, sondern zwischen elf und zwölf Uhr. Bitte stellen Sie die drei Kartons am Wareneingang bereit, nicht am Haupteingang. Zwei Kartons enthalten Zubehör, der dritte die beschädigten Geräte. Auf den Geräten selbst brauchen wir keine neue Kennzeichnung; bitte legen Sie nur die Auftragsnummer 4826 bei. Falls das Zeitfenster nicht passt, rufen Sie mich heute bis 16 Uhr unter der Durchwahl 318 zurück. Sonst bleibt die Abholung für Donnerstag bestehen. Vielen Dank.",
  },
  {
    id: "audio-meeting-01",
    version: 1,
    title: "A trial with an exception",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Ich fasse unseren Vorschlag noch einmal zusammen. Wir würden den gemeinsamen Eingang zunächst nur für Standardanfragen nutzen. Vertragsänderungen bleiben bei der Fachabteilung. Der Test soll drei Wochen dauern, nicht vier; die vier Wochen bezogen sich auf den früheren Plan. Jeden Freitag zählen wir die offenen Fälle. Die reine Bearbeitungszeit messen wir in diesem ersten Schritt noch nicht. Wichtig ist, dass vor jeder Antwort eine zuständige Person eingetragen wird. Falls zwei Personen denselben Fall bearbeiten, halten wir das gesondert fest. Ich schlage vor, dass Frau Neumann die Liste pflegt. Sie hat die Aufgabe aber noch nicht bestätigt. Darüber müssen wir heute noch sprechen.",
  },
  {
    id: "audio-presentation-01",
    version: 1,
    title: "Interpreting a service trend",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Im letzten Monat gingen 1200 Anfragen ein. Davon mussten 36 nachbearbeitet werden. Die Quote liegt also bei drei Prozent. Im Vormonat waren es 40 Nachbearbeitungen bei 1000 Anfragen, also vier Prozent. Die absolute Zahl und die Quote sind damit gesunken. Gleichzeitig wurde die Checkliste geändert und eine zusätzliche Kollegin zur Einarbeitung eingesetzt. Welcher dieser Faktoren entscheidend war, können wir aus den vorliegenden Zahlen nicht sagen. Deshalb empfehle ich, beide Maßnahmen zunächst beizubehalten und die Fallarten künftig getrennt zu erfassen. Eine endgültige Aussage über die Wirkung der Checkliste allein wäre jetzt verfrüht.",
  },
  {
    id: "audio-feedback-01",
    version: 1,
    title: "A respectful clarification",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Danke, dass Sie sich kurz Zeit nehmen. Mir ist aufgefallen, dass der Entwurf gestern ohne die Quellenliste angekommen ist. Dadurch konnte ich zwei Angaben noch nicht prüfen. Ich möchte nicht unterstellen, dass die Liste vergessen wurde; vielleicht liegt sie in einem anderen Ordner. Könnten Sie mir sagen, wo ich sie finde? Falls sie noch nicht vollständig ist, reicht mir heute zunächst die Quelle zu den beiden Zahlen auf Seite drei. Den Rest könnten Sie bis morgen nachreichen. Für künftige Entwürfe würde ich gern vereinbaren, dass fehlende Anlagen in der Begleitnachricht kurz genannt werden. Wäre das für Sie praktikabel?",
  },
  {
    id: "audio-c2-01",
    version: 1,
    title: "An understated reservation",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Natürlich klingt eine sofortige Einführung auf dem Papier sehr überzeugend. Wir hätten dann immerhin einen Termin, den wir auf die Folie schreiben könnten. Ob damit auch schon geklärt wäre, wer die Altdaten prüft, steht auf einem anderen Blatt. Mir geht es nicht darum, den Vorschlag grundsätzlich zu blockieren. Ich würde nur ungern in sechs Wochen erklären müssen, weshalb wir eine saubere Oberfläche, aber dieselben unklaren Zuständigkeiten haben. Vielleicht wäre ein kleinerer Test weniger spektakulär. Dafür könnten wir hinterher etwas Belastbares sagen. Wenn die offenen Fragen tatsächlich bis Freitag geklärt sind, habe ich gegen den früheren Start nichts einzuwenden.",
  },
  {
    id: "audio-pronunciation-01",
    version: 1,
    title: "Vowel contrasts",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Bieten. Bitten. Wir bieten eine Schulung an. Wir bitten um eine Rückmeldung. Schon. Schön. Die Unterlagen liegen schon vor. Der neue Raum ist schön. Bruder. Brüder.",
  },
  {
    id: "audio-pronunciation-02",
    version: 1,
    title: "Consonants in context",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Ich. Auch. Ich brauche die Unterlagen auch. Tag. Tage. An welchem Tag kommt das Paket? An anderen Tagen ist die Kollegin vor Ort. Rad. Räder.",
  },
  {
    id: "audio-pronunciation-03",
    version: 1,
    title: "Word stress in context",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Anrufen. Verstehen. Vertrag. Termin. Liefertermin. Ich möchte Sie anrufen, um den Vertrag zu besprechen. Können Sie den Liefertermin bestätigen?",
  },
  {
    id: "audio-pronunciation-04",
    version: 1,
    title: "Sentence focus",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Wer schickt den Bericht? Ich schicke den Bericht. Was schicken Sie? Ich schicke den Bericht, nicht die Rechnung. Wann schicken Sie ihn? Nicht heute. Ich schicke den Bericht morgen.",
  },
  {
    id: "audio-pronunciation-05",
    version: 1,
    title: "A process explanation to shadow",
    kind: "course",
    voice: "alloy",
    quality: "awaiting_audio_review",
    script:
      "Nach der Prüfung erhalten Sie eine Rückmeldung. Falls Angaben fehlen, melden wir uns vorher. Eine Statusmeldung bedeutet noch nicht, dass der Antrag genehmigt wurde.",
  },
];
