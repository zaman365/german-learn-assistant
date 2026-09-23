import { authorMock } from "./authoring";
const q = (prompt: string, options: string[], answer: number, why: string) => ({
  prompt,
  options,
  answer,
  why,
});
export const mock03 = authorMock({
  id: "MOCK-03",
  title: "Weiterbildung und Veränderung",
  description:
    "Reservierter Originalsatz: ein Bildungsanbieter plant neue Angebote und bearbeitet organisatorische Konflikte.",
  teasers: [
    "Digitale Lernräume gestalten: Lehrende entwickeln eine kurze Online-Einheit mit klaren Arbeitsaufträgen, Rückmeldungen und Austauschphasen. Ein eigener Laptop ist erforderlich. Technische Grundkenntnisse werden vorausgesetzt; Programmierung spielt keine Rolle.",
    "Barrierearme Dokumente: Mitarbeitende aus Verwaltung und Lehre prüfen Texte auf klare Gliederung, verständliche Verweise und zugängliche Gestaltung. Sie überarbeiten ein eigenes Dokument. Das Angebot ersetzt keine vollständige technische Zertifizierung.",
    "Schwierige Beratungsgespräche: In Rollenspielen üben Sie, widersprüchliche Erwartungen zu klären und Grenzen respektvoll zu erläutern. Zwei Präsenztage mit individueller Rückmeldung; geeignet für Beschäftigte mit regelmäßigem Kundenkontakt.",
    "Finanzplanung für kleine Projekte: Ein Selbstlernkurs führt in Einnahmen, Ausgaben und Reserven ein. Die Übungen verwenden vorgegebene Beispieldaten. Eine Beratung zu persönlichen Steuerfragen ist nicht enthalten.",
    "Erste Schritte im Büro: Jugendliche im Praktikum lernen einfache Ablage, Terminnotizen und höfliche Rückfragen. Der Kurs setzt keine Berufserfahrung voraus und behandelt keine Personalführung.",
    "Wirkung von Fortbildungen prüfen: Verantwortliche für Personalentwicklung erarbeiten Kriterien, mit denen sich der Transfer in den Arbeitsalltag beobachten lässt. Der Schwerpunkt liegt auf der Auswertung nach einer Maßnahme, nicht auf der Veranstaltungsorganisation.",
    "Konzentriert arbeiten: Der kurze Online-Vortrag stellt persönliche Strategien gegen Unterbrechungen vor. Er enthält keine Partnerübungen und keine individuelle Rückmeldung.",
    "Projektkonflikte moderieren: Koordinierende üben, unterschiedliche Interessen sichtbar zu machen und Entscheidungswege zu vereinbaren. Gearbeitet wird in Kleingruppen mit Fällen aus der eigenen Praxis; eine Vorgesetztenrolle ist nicht erforderlich.",
  ],
  needs: [
    {
      text: "Fatima möchte herausfinden, ob eine Fortbildung das Verhalten der Beschäftigten im Alltag verändert hat.",
      answer: 5,
      why: "F konzentriert sich auf den Transfer nach einer Maßnahme.",
    },
    {
      text: "Leon soll ein vorhandenes Informationsblatt verständlicher und zugänglicher gestalten.",
      answer: 1,
      why: "B lässt Teilnehmende ein eigenes Dokument überarbeiten.",
    },
    {
      text: "Nina koordiniert ein Projekt ohne Personalverantwortung und möchte mit widersprüchlichen Interessen umgehen.",
      answer: 7,
      why: "H trainiert Projektmoderation ohne Vorgesetztenrolle.",
    },
    {
      text: "David berät regelmäßig unzufriedene Kunden und möchte schwierige Gespräche praktisch üben.",
      answer: 2,
      why: "C bietet Rollenspiele mit individuellem Feedback.",
    },
    {
      text: "Rosa kann digitale Werkzeuge bedienen und möchte eine eigene Online-Lerneinheit entwickeln.",
      answer: 0,
      why: "A richtet sich an Lehrende mit technischen Grundkenntnissen.",
    },
  ],
  internal: [
    {
      text: "Interne Information: Neue Beratungszeiten\nAb Januar testen wir an zwei Tagen pro Woche eine spätere telefonische Sprechzeit. Diese ersetzt an den betreffenden Tagen die bisherige letzte Stunde am Vormittag; die gesamte Beratungszeit wird nicht ausgeweitet. Persönliche Termine bleiben nach Vereinbarung möglich. Die Dienstplanung berücksichtigt die freiwilligen Meldungen, kann aber erst nach Prüfung der Vertretungen bestätigt werden. Während des sechswöchigen Versuchs dokumentieren wir die Zahl beantworteter Anfragen und die Wartezeiten. Die Rückmeldungen der Beschäftigten werden ebenfalls einbezogen. Eine dauerhafte Änderung wird erst nach der Auswertung mitgeteilt. Bitte informieren Sie Ratsuchende zunächst nur über den festgelegten Versuchszeitraum.",
      questions: [
        q(
          "Was verändert sich während des Versuchs?",
          [
            "Die Gesamtzahl der Beratungsstunden verdoppelt sich.",
            "Ein Teil der bestehenden Stunden wird später angeboten.",
            "Persönliche Termine entfallen vollständig.",
          ],
          1,
          "Die spätere Stunde ersetzt eine bisherige Stunde.",
        ),
        q(
          "Wann wird über eine dauerhafte Änderung entschieden?",
          [
            "Nach der Auswertung des Versuchs.",
            "Bereits vor der Vertretungsplanung.",
            "Automatisch am ersten Versuchstag.",
          ],
          0,
          "Die Mitteilung erfolgt erst nach Auswertung.",
        ),
      ],
    },
    {
      text: "Interne Information: Unterlagen für Teilnehmende\nFür neue Kurse verwenden wir ab Februar eine gemeinsame Dokumentvorlage. Bereits laufende Kurse müssen ihre Unterlagen nicht rückwirkend umstellen. Die Vorlage enthält Formatierungen für Überschriften, Tabellen und Verweise. Inhaltliche Verantwortung bleibt bei den jeweiligen Autorinnen und Autoren. Vor der Veröffentlichung prüft eine zweite Person lediglich die Verständlichkeit des Arbeitsauftrags und die Vollständigkeit der Verweise. Diese Prüfung ersetzt keine fachliche Freigabe. Korrekturvorschläge sammeln wir zunächst vier Wochen lang; dringende Fehler werden unmittelbar behoben. Danach entscheidet die Arbeitsgruppe, welche Änderungen in die nächste Version aufgenommen werden.",
      questions: [
        q(
          "Welche Kurse müssen die neue Vorlage verwenden?",
          [
            "Alle seit Jahren abgeschlossenen Kurse.",
            "Neue Kurse ab Februar.",
            "Nur Kurse ohne Arbeitsaufträge.",
          ],
          1,
          "Laufende Kurse müssen nicht rückwirkend umgestellt werden.",
        ),
        q(
          "Was leistet die zweite Prüfung?",
          [
            "Sie übernimmt sämtliche fachliche Verantwortung.",
            "Sie bewertet die Lehrkraft.",
            "Sie prüft Aufträge und Verweise, ersetzt aber keine fachliche Freigabe.",
          ],
          2,
          "Die Prüfung ist in ihrem Umfang ausdrücklich begrenzt.",
        ),
      ],
    },
  ],
  advice: [
    "Wenn ein Angebot für Sie zeitlich nicht erreichbar ist, nennen Sie bei der Rückmeldung konkrete nutzbare Zeitfenster. So kann die Organisation Nachfrage und verfügbare Kapazitäten sinnvoll vergleichen.",
    "Ein Arbeitsauftrag sollte erkennen lassen, welches Ergebnis erwartet wird, wie viel Zeit zur Verfügung steht und woran eine gelungene Lösung zu erkennen ist. Testen Sie ihn mit einer Person, die den Inhalt nicht selbst erstellt hat.",
    "Bei konkurrierenden Projektzielen hilft eine gemeinsame Übersicht: Welche Ziele sind unverzichtbar, wo bestehen Spielräume und wer darf entscheiden? Eine Mehrheitsabstimmung ersetzt nicht automatisch die geklärte Zuständigkeit.",
    "Zur Bewertung einer Fortbildung reicht die Zufriedenheit direkt nach dem Kurs nicht aus. Beobachten Sie später, ob neue Handlungen im Alltag gelingen, und prüfen Sie die Bedingungen, die den Transfer unterstützen oder behindern.",
    "Wenn eine zugesagte Leistung nicht erbracht werden kann, erklären Sie den Stand transparent. Bieten Sie nur Alternativen an, die tatsächlich verfügbar sind, und nennen Sie einen verbindlichen Zeitpunkt für offene Fragen.",
    "Für Rückmeldungen zu einem Entwurf sollten Inhalt und Gestaltung getrennt besprochen werden. Priorisieren Sie Änderungen nach ihrer Wirkung auf das Verständnis, damit nebensächliche Details nicht den gesamten Termin beanspruchen.",
  ],
  adviceQuestions: [
    {
      text: "Unsere Teilnehmenden fanden den Kurs gut. Ich möchte wissen, ob sie das Gelernte später einsetzen.",
      answer: 3,
      why: "D unterscheidet Zufriedenheit und tatsächlichen Transfer.",
    },
    {
      text: "Mein Arbeitsauftrag wirkt für mich klar, wird aber regelmäßig anders verstanden.",
      answer: 1,
      why: "B nennt Erfolgskriterien und einen Verständlichkeitstest.",
    },
    {
      text: "Im Projekt sollen gleichzeitig Kosten sinken und alle Wünsche erfüllt werden. Niemand weiß, wer den Zielkonflikt entscheidet.",
      answer: 2,
      why: "C klärt Prioritäten, Spielräume und Entscheidungsbefugnis.",
    },
    {
      text: "Ich brauche eine verbindliche Entscheidung darüber, ob mein ausländischer Abschluss staatlich anerkannt wird.",
      answer: 6,
      why: "Keiner der Beiträge trifft Anerkennungsentscheidungen.",
    },
  ],
  minutes:
    "Protokoll der Programmkonferenz, 15. Dezember\nTOP 1 – Nachfrage: Im Herbst wurden 18 Kurse angeboten, im Vorjahr 15. Die Zahl der Anmeldungen stieg von 300 auf 342; die durchschnittliche Belegung pro Kurs ging damit leicht zurück. Herr Sen betont, dass die höhere Gesamtzahl allein nicht als bessere Auslastung dargestellt werden darf. Die Runde stimmt zu.\nTOP 2 – Abendberatung: Der sechswöchige Versuch beginnt im Januar. Frau Kern prüft bis Freitag die Vertretungen. Die freiwilligen Meldungen werden berücksichtigt, sind aber noch keine verbindlichen Dienstzusagen. Eine endgültige Liste wird am Montag veröffentlicht.\nTOP 3 – Dokumentvorlage: Die Arbeitsgruppe erhält zwei weitere Wochen für den Test. Drei Arbeitsaufträge wurden unterschiedlich verstanden. Vor einer breiten Einführung sollen Außenstehende die überarbeiteten Aufträge probeweise bearbeiten. Die bisherige Vorlage bleibt bis zur Freigabe gültig.\nTOP 4 – Kursabsage: Für den Kurs am 10. Februar liegen zu wenige Anmeldungen vor. Noch wird nicht abgesagt. Die Beratung fragt bis Donnerstag nach, ob Interessierte auf einen späteren Termin wechseln würden. Erst danach entscheidet die Programmleitung.\nTOP 5 – Evaluation: Künftig werden neben unmittelbaren Kursrückmeldungen auch kurze Transferfragen nach sechs Wochen erprobt. Die Teilnahme ist freiwillig. Die Antworten dürfen nicht für individuelle Leistungsranglisten genutzt werden.",
  minuteQuestions: [
    q(
      "Wie entwickelte sich die durchschnittliche Belegung pro Kurs?",
      ["Sie stieg deutlich.", "Sie sank leicht.", "Sie blieb exakt gleich."],
      1,
      "300/15 sind 20, 342/18 sind 19.",
    ),
    q(
      "Was bedeuten die freiwilligen Meldungen zur Abendberatung?",
      [
        "Sie sind bereits endgültige Dienstzusagen.",
        "Sie werden bei der noch offenen Planung berücksichtigt.",
        "Sie ersetzen die Vertretungsprüfung.",
      ],
      1,
      "Die verbindliche Planung folgt erst nach Prüfung.",
    ),
    q(
      "Was soll vor Freigabe der Dokumentvorlage geschehen?",
      [
        "Ein Test der überarbeiteten Aufträge mit Außenstehenden.",
        "Die Löschung aller bisherigen Materialien.",
        "Eine Bewertung der Autorinnen nach Geschwindigkeit.",
      ],
      0,
      "Außenstehende sollen die Verständlichkeit prüfen.",
    ),
    q(
      "Wie ist der Stand des Kurses am 10. Februar?",
      [
        "Er ist endgültig abgesagt.",
        "Er wurde bereits erfolgreich durchgeführt.",
        "Eine Entscheidung steht nach weiteren Rückfragen aus.",
      ],
      2,
      "Die Programmleitung entscheidet erst nach Donnerstag.",
    ),
    q(
      "Wozu dienen die neuen Fragen nach sechs Wochen?",
      [
        "Zur Vergabe persönlicher Rangplätze.",
        "Zur Beobachtung des Transfers in den Alltag.",
        "Zur verpflichtenden erneuten Anmeldung.",
      ],
      1,
      "Es handelt sich um freiwillige Transferfragen.",
    ),
  ],
  email:
    "Teilnehmerin Frau Aydin schreibt: Ich habe den Präsenzworkshop am 8. März gebucht. Gestern erhielt ich plötzlich einen Link zu einer Online-Veranstaltung. Gerade die praktischen Partnerübungen waren für meine Anmeldung entscheidend. Bitte erklären Sie die Änderung. Wenn der Kurs nur online stattfindet, möchte ich eine passende Alternative oder mein Geld zurück.\nInterne Nachricht: Der gebuchte Raum steht wegen eines Wasserschadens nicht zur Verfügung. Ein Ersatzraum ist noch nicht bestätigt. Der Link wurde vorschnell verschickt. Die Online-Variante hätte moderierte Partnerübungen, wäre aber eine Änderung des gebuchten Angebots. Die Leitung genehmigt wahlweise eine kostenfreie Umbuchung auf den Präsenztermin am 29. März oder eine vollständige Erstattung. Bis morgen 10 Uhr wird geklärt, ob der ursprüngliche Präsenztermin doch stattfinden kann.",
  emailQuestions: [
    q(
      "Warum ist Frau Aydin mit der Änderung unzufrieden?",
      [
        "Sie wollte ausdrücklich nur eine Aufzeichnung.",
        "Praktische Partnerübungen waren für ihre Buchung wichtig.",
        "Sie hat den Kurs nie gebucht.",
      ],
      1,
      "Sie nennt die Übungen als entscheidenden Anmeldegrund.",
    ),
    q(
      "Welche Alternative ist bereits genehmigt?",
      [
        "Ein garantierter Ersatzraum am 8. März.",
        "Nur ein Gutschein ohne Rückzahlung.",
        "Eine kostenfreie Umbuchung auf den 29. März oder volle Erstattung.",
      ],
      2,
      "Beide Optionen wurden von der Leitung freigegeben.",
    ),
  ],
  emailPrompt:
    "Antworten Sie Frau Aydin. Erklären Sie den aktuellen Stand, entschuldigen Sie die vorschnelle Information und erläutern Sie die genehmigten Optionen sowie die nächste Rückmeldung.",
  gapText1:
    "Wir bedauern, [1] Sie eine vorschnelle Nachricht erhalten haben. Der ursprüngliche Raum ist [2] eines Wasserschadens nicht nutzbar. [3] ein Ersatzraum zur Verfügung steht, wird derzeit geprüft. Wir verstehen, [4] Ihnen die Partnerübungen wichtig sind. Sie können kostenfrei auf den späteren Termin wechseln [5] eine vollständige Erstattung wählen. Über den Stand des ursprünglichen Termins informieren wir Sie spätestens morgen, [6] Sie sicher planen können.",
  wordBank: [
    "dass",
    "wegen",
    "Ob",
    "warum",
    "oder",
    "damit",
    "obwohl",
    "trotzdem",
    "zum",
    "sondern",
  ],
  gaps1: [
    { answer: "dass", why: "Der dass-Satz nennt den Inhalt des Bedauerns." },
    {
      answer: "wegen",
      why: "Wegen eines Wasserschadens bezeichnet den Grund.",
    },
    { answer: "Ob", why: "Ob leitet die noch offene indirekte Frage ein." },
    {
      answer: "warum",
      why: "Warum verweist auf den nachvollziehbaren Beweggrund.",
    },
    { answer: "oder", why: "Die zwei Optionen stehen zur Wahl." },
    { answer: "damit", why: "Damit bezeichnet den Zweck der Information." },
  ],
  gapText2:
    "Die neue Vorlage soll [1] neuen Kursen eingesetzt werden. Laufende Angebote sind [2] der Umstellung zunächst ausgenommen. Bevor ein Dokument veröffentlicht wird, [3] eine zweite Person den Arbeitsauftrag. Diese Prüfung dient dazu, Missverständnisse [4]. Die fachliche Verantwortung [5] jedoch bei den Autorinnen und Autoren. Vorschläge werden gesammelt, [6] dringende Fehler sofort behoben werden.",
  gaps2: [
    {
      options: ["in", "auf", "über"],
      answer: 0,
      why: "In neuen Kursen bezeichnet den Einsatzbereich.",
    },
    {
      options: ["von", "für", "mit"],
      answer: 0,
      why: "Von etwas ausgenommen sein.",
    },
    {
      options: ["prüft", "prüfen", "geprüft"],
      answer: 0,
      why: "Das Subjekt eine zweite Person verlangt Singular.",
    },
    {
      options: ["zu vermeiden", "vermeiden", "vermieden"],
      answer: 0,
      why: "Dazu dienen, etwas zu tun.",
    },
    {
      options: ["bleibt", "bleiben", "geblieben"],
      answer: 0,
      why: "Die Verantwortung bleibt: Singular.",
    },
    {
      options: ["während", "trotz", "wegen"],
      answer: 0,
      why: "Während kontrastiert das Sammeln mit unmittelbarer Behebung.",
    },
  ],
  statement: [
    "Die Leitung möchte den Erfolg von Fortbildungen ausschließlich anhand der Zufriedenheit direkt nach dem Kurs bewerten. Nehmen Sie begründet Stellung.",
    "Alle Beratungen sollen künftig nur nach vorheriger Online-Terminbuchung stattfinden. Bewerten Sie den Vorschlag und entwickeln Sie eine praktikable Lösung.",
  ],
  listening: [
    {
      title: "Gespräch über Abendberatung",
      script:
        "A: Dann beraten wir ab Januar insgesamt länger? B: Nein, die spätere Stunde ersetzt an zwei Tagen eine Stunde am Vormittag. A: Und persönliche Termine? B: Die bleiben nach Vereinbarung möglich. Wir wollen erst sehen, ob die neuen Zeiten genutzt werden.",
      questions: [
        q(
          "Die gesamte Beratungszeit wird ausgeweitet.",
          ["Richtig.", "Falsch."],
          1,
          "Die spätere Stunde ersetzt eine frühere.",
        ),
        q(
          "Was bleibt möglich?",
          [
            "Persönliche Termine nach Vereinbarung.",
            "Beratung ohne jegliche Planung rund um die Uhr.",
            "Nur schriftliche Anfragen.",
          ],
          0,
          "Persönliche Termine bleiben erhalten.",
        ),
      ],
    },
    {
      title: "Gespräch zur Vorlage",
      script:
        "A: Muss ich die Unterlagen meines laufenden Kurses sofort umstellen? B: Nein, die Vorgabe gilt für neue Kurse. A: Gut. Ich würde aber eine unklare Überschrift jetzt schon ändern. B: Natürlich, sachlich nötige Verbesserungen musst du nicht aufschieben.",
      questions: [
        q(
          "Laufende Kurse müssen rückwirkend vollständig umgestellt werden.",
          ["Richtig.", "Falsch."],
          1,
          "Die Vorgabe betrifft neue Kurse.",
        ),
        q(
          "Was möchte A trotzdem tun?",
          [
            "Eine unklare Überschrift verbessern.",
            "Alle Unterlagen löschen.",
            "Den laufenden Kurs absagen.",
          ],
          0,
          "A nennt eine konkrete Verständlichkeitsverbesserung.",
        ),
      ],
    },
    {
      title: "Gespräch über Evaluation",
      script:
        "A: Die Rückmeldungen waren ausgezeichnet. Damit ist der Erfolg bewiesen. B: Die Teilnehmenden waren zufrieden. Ob sie die Methoden später anwenden, wissen wir noch nicht. A: Wir sollten also nach einigen Wochen noch einmal fragen? B: Ja, und auch nach Hindernissen im Alltag.",
      questions: [
        q(
          "B hält Zufriedenheit für den vollständigen Nachweis des Transfers.",
          ["Richtig.", "Falsch."],
          1,
          "B unterscheidet Zufriedenheit und spätere Anwendung.",
        ),
        q(
          "Welche Ergänzung wird vorgeschlagen?",
          [
            "Spätere Fragen zur Anwendung und zu Hindernissen.",
            "Abschaffung aller Rückmeldungen.",
            "Eine sofortige Rangliste der Lehrkräfte.",
          ],
          0,
          "B regt eine spätere Transferbefragung an.",
        ),
      ],
    },
    {
      title: "Erfahrung aus der Beratung",
      script:
        "Eine Online-Buchung ist praktisch, solange sie verständlich ist. Manche Ratsuchende kommen damit aber nicht zurecht. Für sie sollte es weiterhin möglich sein, telefonisch einen Termin zu vereinbaren.",
      questions: [
        q(
          "Welche Position vertritt die Person?",
          [
            "Ausschließlich digitale Buchung.",
            "Digitale Buchung mit erreichbarer Alternative.",
            "Keine Termine mehr vergeben.",
            "Nur spontane Besuche zulassen.",
          ],
          1,
          "Die Person befürwortet eine telefonische Alternative.",
        ),
      ],
    },
    {
      title: "Erfahrung aus einem Kurs",
      script:
        "Im Online-Kurs haben die Partnerübungen überraschend gut funktioniert. Mir fehlte eher die Möglichkeit, vor oder nach dem Unterricht beiläufig Fragen zu stellen. Eine offene Viertelstunde könnte das auffangen.",
      questions: [
        q(
          "Was wird vorgeschlagen?",
          [
            "Die Partnerübungen abschaffen.",
            "Zeit für informelle Fragen einplanen.",
            "Den Kurs vollständig aufzeichnen.",
            "Alle Fragen nur schriftlich zulassen.",
          ],
          1,
          "Eine offene Viertelstunde soll beiläufige Rückfragen ermöglichen.",
        ),
      ],
    },
    {
      title: "Erfahrung aus der Planung",
      script:
        "Ein Kurs mit vielen Anmeldungen ist nicht automatisch gut ausgelastet. Wenn der Raum viel größer ist oder mehr Lehrkräfte eingesetzt werden, sieht das Verhältnis anders aus. Wir sollten die Bezugsgröße immer dazuschreiben.",
      questions: [
        q(
          "Was wird betont?",
          [
            "Absolute Zahlen benötigen eine passende Bezugsgröße.",
            "Hohe Anmeldezahlen sind grundsätzlich schlecht.",
            "Die Raumgröße ist immer irrelevant.",
            "Mehr Lehrkräfte senken stets die Qualität.",
          ],
          0,
          "Der Sprecher fordert nachvollziehbare Verhältnisse.",
        ),
      ],
    },
    {
      title: "Erfahrung aus der Arbeitsgruppe",
      script:
        "Wir haben lange über die Farbe der Vorlage gesprochen. Dabei war der Arbeitsauftrag selbst noch missverständlich. Beim nächsten Treffen sollten wir zuerst prüfen, ob die Teilnehmenden wissen, was sie tun sollen.",
      questions: [
        q(
          "Was soll künftig Vorrang haben?",
          [
            "Die Farbe der Überschriften.",
            "Die Verständlichkeit des Arbeitsauftrags.",
            "Eine längere Sitzung.",
            "Die Zahl der Tabellen.",
          ],
          1,
          "Die inhaltliche Verständlichkeit soll zuerst geprüft werden.",
        ),
      ],
    },
    {
      title: "Präsentation zum Kursangebot",
      script:
        "Im letzten Halbjahr haben wir zwanzig Kurse mit insgesamt 360 Anmeldungen durchgeführt. Im Halbjahr davor waren es sechzehn Kurse mit 320 Anmeldungen. Die Gesamtzahl ist also gestiegen, die durchschnittliche Teilnehmerzahl pro Kurs jedoch von zwanzig auf achtzehn gesunken. Daraus allein lässt sich noch keine wirtschaftliche Bewertung ableiten, denn einige neue Angebote sind bewusst als Kleingruppen geplant. Außerdem unterscheiden sich Dauer und Personaleinsatz. Für den nächsten Bericht schlagen wir deshalb vor, die Angebote nach Kursart zu trennen und die geplante Gruppengröße einzubeziehen. Wir wollen keine pauschale Mindestzahl für alle Formate festlegen. Stattdessen soll bei jeder neuen Planung erläutert werden, welche Gruppengröße pädagogisch sinnvoll und finanziell tragfähig ist. Ein entsprechendes Formular wird zunächst in drei Programmbereichen getestet.",
      questions: [
        q(
          "Wie viele Anmeldungen gab es im letzten Halbjahr?",
          ["320.", "360.", "400."],
          1,
          "Der Vortrag nennt 360 Anmeldungen.",
        ),
        q(
          "Wie entwickelte sich der Durchschnitt je Kurs?",
          [
            "Von zwanzig auf achtzehn.",
            "Von achtzehn auf zwanzig.",
            "Er blieb bei zwanzig.",
          ],
          0,
          "360/20 ergibt 18.",
        ),
        q(
          "Warum reicht der Durchschnitt nicht für eine Gesamtbewertung?",
          [
            "Kursarten, Dauer und Personal unterscheiden sich.",
            "Alle Kurse haben dieselben Kosten.",
            "Es fehlen sämtliche Anmeldezahlen.",
          ],
          0,
          "Die Bedingungen der Angebote sind unterschiedlich.",
        ),
        q(
          "Was soll zunächst getestet werden?",
          [
            "Eine einheitliche Mindestzahl für alle Kurse.",
            "Ein Planungsformular in drei Bereichen.",
            "Die Abschaffung aller Kleingruppen.",
          ],
          1,
          "Das Formular wird begrenzt erprobt.",
        ),
      ],
    },
    {
      title: "Nachricht zum Raum",
      script:
        "Guten Tag, die Reparatur des Raums dauert länger. Für den 8. März können wir ihn nicht bestätigen. Bitte warten Sie mit einer endgültigen Zusage, bis Sie einen Ersatzraum gesichert haben.",
      questions: [
        q(
          "Was ist über den Raum bekannt?",
          [
            "Seine Nutzung am 8. März ist bestätigt.",
            "Seine Verfügbarkeit ist nicht bestätigt.",
            "Er wurde dauerhaft geschlossen.",
          ],
          1,
          "Eine Bestätigung ist derzeit nicht möglich.",
        ),
      ],
    },
    {
      title: "Nachricht zur Vertretung",
      script:
        "Hallo, Kern hier. Die Vertretungen sind jetzt geprüft. Sie können die Liste am Montag veröffentlichen. Zwei freiwillige Meldungen konnten wir wegen anderer Dienste nicht berücksichtigen; die Betroffenen habe ich informiert.",
      questions: [
        q(
          "Was kann am Montag geschehen?",
          [
            "Die bestätigte Liste veröffentlichen.",
            "Erst mit der Vertretungsprüfung beginnen.",
            "Alle freiwilligen Meldungen automatisch übernehmen.",
          ],
          0,
          "Die Prüfung ist abgeschlossen.",
        ),
      ],
    },
    {
      title: "Nachricht einer Interessentin",
      script:
        "Guten Tag, ich kann den späteren Kurstermin wahrnehmen, möchte aber vorher wissen, ob dieselbe praktische Übung enthalten ist. Bitte buchen Sie mich noch nicht um, bevor wir das geklärt haben.",
      questions: [
        q(
          "Was möchte die Anruferin vor einer Umbuchung wissen?",
          [
            "Ob die praktische Übung enthalten ist.",
            "Ob alle Teilnehmenden absagen.",
            "Ob der Kurs kostenlos wird.",
          ],
          0,
          "Die praktische Übung ist ihre Bedingung.",
        ),
      ],
    },
    {
      title: "Nachricht zur Vorlage",
      script:
        "Hallo, die neue Fassung ist noch im Test. Bitte arbeiten Sie bis zur Freigabe mit der bisherigen Vorlage. Dringende inhaltliche Fehler dürfen Sie selbstverständlich sofort berichtigen.",
      questions: [
        q(
          "Welche Vorlage gilt vorerst?",
          [
            "Die ungeprüfte neue Fassung.",
            "Die bisherige Vorlage.",
            "Keine Vorlage mehr.",
          ],
          1,
          "Die bisherige bleibt bis zur Freigabe gültig.",
        ),
      ],
    },
    {
      title: "Nachricht zur Befragung",
      script:
        "Guten Tag, die Transferfragen gehen sechs Wochen nach Kursende raus. Die Teilnahme bleibt freiwillig. Bitte entfernen Sie deshalb die Formulierung, dass alle antworten müssen.",
      questions: [
        q(
          "Welche Änderung ist notwendig?",
          [
            "Die Freiwilligkeit klarstellen.",
            "Die Frist auf sechs Tage verkürzen.",
            "Alle Fragen verpflichtend machen.",
          ],
          0,
          "Die verpflichtende Formulierung widerspricht der freiwilligen Teilnahme.",
        ),
      ],
    },
  ],
  phone: {
    script:
      "Guten Tag, hier spricht Selma Neumann vom Bildungszentrum West. Es geht um Ihren Workshop am 29. März. Wir beginnen um neun Uhr dreißig und treffen uns in Raum C 4. Bitte bringen die Teilnehmenden ein eigenes Informationsblatt mit, das sie überarbeiten möchten. Ein Laptop ist nicht erforderlich; Geräte sind vorhanden. Zurzeit sind zehn Personen angemeldet, die Höchstzahl beträgt vierzehn. Bitte schicken Sie mir bis Freitag die endgültige Zahl. Für Rückfragen erreichen Sie mich unter 030 551 82.",
    reason: q(
      "Was ist der Anlass der Nachricht?",
      [
        "Organisation eines Workshops.",
        "Beschwerde über ein Informationsblatt.",
        "Verkauf privater Laptops.",
      ],
      0,
      "Die Nachricht nennt Vorbereitung und organisatorische Details.",
    ),
    key: [
      "Selma Neumann, Bildungszentrum West",
      "030 551 82",
      "29. März, 9:30 Uhr",
      "Raum C 4",
      "Eigenes Informationsblatt mitbringen; Geräte vorhanden",
      "Zehn angemeldet, höchstens vierzehn",
      "Endgültige Teilnehmerzahl bis Freitag senden",
    ],
  },
  speaking: {
    topic:
      "Beschreiben Sie ein Weiterbildungsangebot, das Beschäftigte bei einer beruflichen Veränderung unterstützen könnte. Erläutern Sie Bedarf, Aufbau und Möglichkeiten der Erfolgskontrolle.",
    followup:
      "Was würden Sie verändern, wenn die Teilnehmenden den Kurs positiv bewerten, die neuen Methoden im Alltag aber kaum anwenden?",
    partner:
      "Ihre Partnerin sagt: „Gleichbehandlung bedeutet nicht immer, allen denselben Zugang aufzuzwingen.“ Erklären Sie die Aussage im Zusammenhang mit digitaler Terminbuchung.",
    conversation:
      "Sie sprechen in der Pause darüber, ob gemeinsames Lernen vor Ort oder online besser zum Berufsalltag passt. Fragen Sie nach Erfahrungen und begründen Sie Ihre eigene Sicht.",
    problem:
      "Ein gebuchter Schulungsraum fällt kurzfristig aus. Ein Online-Angebot und ein späterer Präsenztermin wären möglich. Entwickeln Sie gemeinsam eine Lösung, die die Erwartungen der Teilnehmenden und die betrieblichen Möglichkeiten berücksichtigt.",
  },
});
