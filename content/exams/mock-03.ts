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
  version: 2,
  matchingStatements: [
    "Absolute Zahlen benötigen eine passende Bezugsgröße.",
    "Eine ausführlichere Anleitung soll telefonische Buchungen vollständig ersetzen.",
    "Digitale Buchung mit erreichbarer Alternative.",
    "Die Verständlichkeit des Arbeitsauftrags.",
    "Ein zusätzlicher Vortrag soll die informellen Gespräche ersetzen.",
    "Zeit für informelle Fragen einplanen.",
  ],
  teasers: [
    "Ein digitaler Raum ist noch kein Unterricht: Eine Dozentin berichtet, wie sie eine Online-Einheit nach enttäuschenden ersten Erfahrungen umgestaltet hat. Kürzere Arbeitsaufträge, Rückmeldungen und geplante Austauschphasen stehen im Mittelpunkt des Medienbeitrags. Die technische Bedienung wird vorausgesetzt. Der Text erklärt didaktische Entscheidungen, ohne Programmierkenntnisse zu verlangen.",
    "Ein Informationsblatt wird lesbar: Die Redaktion begleitet eine Verwaltung bei der Überarbeitung ihrer Teilnehmerunterlagen. Zwischenüberschriften, eindeutige Verweise und eine klarere Reihenfolge helfen Lesern, den nächsten Schritt zu finden. Vorher-nachher-Beispiele zeigen die Änderungen. Der Beitrag behandelt verständliche Gestaltung, ohne eine vollständige technische Barrierefreiheitsprüfung zu versprechen.",
    "Freundlich bleiben, Grenzen deutlich machen: Eine Beraterin schildert ein Gespräch mit einem enttäuschten Kunden. Beide rekonstruierten zunächst ihre unterschiedlichen Erwartungen, bevor sie einen neuen Termin vereinbarten. Der Beitrag analysiert die entscheidenden Gesprächsstellen und zeigt alternative Formulierungen. Er erklärt kommunikatives Handeln, bietet aber keine individuelle Beratung oder pauschale Erfolgsgarantie.",
    "Ein kleines Projekt braucht eine Reserve: Ein Finanzredakteur erklärt anhand eines Vereinsprojekts Einnahmen, laufende Ausgaben und unerwartete Kosten. Die Modellrechnung macht sichtbar, was bei verspäteten Zahlungen geschieht. Sie ist eine Einführung in Planung und Liquidität; persönliche Steuerfragen und die pädagogische Wirkung von Fortbildungen werden nicht behandelt.",
    "Eine Woche im Büro: Eine Praktikantin lernt, Termine zu notieren, Unterlagen wiederzufinden und bei unklaren Aufträgen höflich nachzufragen. Ihr Tagebuch zeigt kleine Fortschritte und typische Missverständnisse. Der Erfahrungsbericht richtet sich an Berufseinsteiger und vermittelt keine Methoden der Personalführung oder der Moderation komplexer Projektkonflikte.",
    "Gute Seminarnoten, wenig Veränderung? Ein Unternehmen fragt sechs Wochen nach einer Fortbildung nach konkreten Anwendungen am Arbeitsplatz. Die Personalentwicklung vergleicht Beobachtungen mit den ursprünglichen Lernzielen. Der Bericht zeigt, warum Zufriedenheit allein kein Transfernachweis ist. Er konzentriert sich auf die Wirkung nach der Maßnahme und nicht auf Buchung oder Veranstaltungslogistik.",
    "Eine Stunde ohne Unterbrechung: Beschäftigte eines kleinen Betriebs erproben feste Zeiten für konzentrierte Arbeit. Eine Reportage beschreibt persönliche Strategien, aber auch die Grenzen bei Kundenkontakt. Ob weniger Unterbrechungen bereits bessere Ergebnisse bedeuten, bleibt offen. Die Redaktion stellt keine Kursbewertung vor und empfiehlt keine allgemeingültige Produktivitätszahl.",
    "Koordinieren ohne Chefrolle: In einer Arbeitsgruppe kollidieren die Interessen von Vertrieb und Entwicklung. Eine Projektkoordinatorin beschreibt, wie sie zunächst Entscheidungsspielräume klärte und dann beide Seiten an einer gemeinsamen Alternative arbeiten ließ. Das Porträt untersucht Moderation unter Gleichberechtigten; disziplinarische Weisungen waren dabei gerade kein verfügbares Mittel.",
  ],
  needs: [
    {
      text: "Fatima sucht einen Bericht darüber, wie ein Betrieb die Anwendung von Fortbildungsinhalten im Arbeitsalltag untersucht.",
      answer: 5,
      why: "F trennt Zufriedenheit von beobachtetem Transfer nach einer Fortbildung.",
    },
    {
      text: "Leon möchte anhand von Beispielen lesen, wie ein Informationsblatt verständlicher gestaltet wird.",
      answer: 1,
      why: "B erklärt die Überarbeitung von Teilnehmerunterlagen anhand von Beispielen.",
    },
    {
      text: "Nina möchte erfahren, wie eine Projektkoordinatorin ohne Weisungsbefugnis widersprüchliche Interessen bearbeitet.",
      answer: 7,
      why: "H beschreibt Moderation unter Gleichberechtigten.",
    },
    {
      text: "David interessiert sich für eine Analyse schwieriger Kundengespräche mit möglichen alternativen Formulierungen.",
      answer: 2,
      why: "C untersucht Gesprächsstellen zwischen Beraterin und enttäuschtem Kunden.",
    },
    {
      text: "Rosa beherrscht digitale Werkzeuge und sucht einen Erfahrungsbericht zu didaktischen Entscheidungen in Online-Einheiten.",
      answer: 0,
      why: "A konzentriert sich auf Arbeitsaufträge, Rückmeldungen und Austausch.",
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
        "Sven: Die neue Online-Buchung spart dem Empfang Arbeit. Könnten wir telefonische Buchungen jetzt ganz einstellen?\nAmina: Bei vielen funktioniert das gut. Gestern hat mich aber eine Ratsuchende angerufen, die mit dem Formular nicht zurechtkam.\nSven: Reicht eine ausführlichere Anleitung?\nAmina: Sie hilft manchen, aber nicht allen. Ich würde eine erreichbare telefonische Alternative behalten.\nSven: Dann bleiben beide Wege offen?\nAmina: Ja. Wir können den digitalen Weg fördern, ohne Menschen auszuschließen, die dabei Unterstützung benötigen.",
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
        "Rita: Wie war dein erster Online-Kurs? Waren die Partnerübungen schwierig?\nCem: Im Gegenteil, die Kleingruppen haben gut funktioniert. Was mir fehlte, waren die kurzen Fragen nach dem Unterricht.\nRita: Dafür gibt es doch den schriftlichen Chat.\nCem: Stimmt, aber manche Frage entsteht erst im lockeren Gespräch. Eine offene Viertelstunde wäre hilfreich.\nRita: Du möchtest also keinen zusätzlichen Vortrag?\nCem: Nein. Nur etwas Zeit, in der man ohne vorbereiteten Beitrag eine Rückfrage stellen kann.",
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
        "Dora: Der neue Kurs hat dreißig Anmeldungen. Dann ist er besser ausgelastet als der alte mit zwanzig, oder?\nEnis: Nicht unbedingt. Wie groß sind die Räume, und wie viele Plätze waren geplant?\nDora: Im neuen Raum wären fünfzig möglich, im alten fünfundzwanzig.\nEnis: Dann erzählen die absoluten Zahlen allein nicht die ganze Geschichte. Auch der Personaleinsatz kann unterschiedlich sein.\nDora: Wir sollten die Bezugsgrößen dazuschreiben.\nEnis: Genau. Erst mit diesen Angaben lässt sich der Vergleich sinnvoll einordnen.",
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
        "Iris: Beim nächsten Treffen müssen wir endlich eine Farbe für die Überschriften wählen.\nNoah: Können wir vorher den Arbeitsauftrag prüfen? Zwei Teilnehmende haben gestern ganz unterschiedliche Dinge gemacht.\nIris: Vielleicht haben sie die Hinweise nur übersehen.\nNoah: Möglich. Aber auch nach dem Lesen wussten sie nicht, was abzugeben ist. Eine andere Farbe löst diese Unklarheit kaum.\nIris: Dann testen wir zuerst die Formulierung mit einer kleinen Gruppe.\nNoah: Ja. Wenn die Aufgabe verstanden wird, können wir uns um die Gestaltung kümmern.",
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
