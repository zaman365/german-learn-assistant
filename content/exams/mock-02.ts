import { authorMock } from "./authoring";
const q = (prompt: string, options: string[], answer: number, why: string) => ({
  prompt,
  options,
  answer,
  why,
});
export const mock02 = authorMock({
  id: "MOCK-02",
  title: "Logistik und Verantwortung",
  description:
    "Ein Logistikunternehmen führt neue Übergaben ein. Lieferinformationen, Schulungen und Zielkonflikte zuverlässig vermitteln.",
  version: 2,
  matchingStatements: [
    "Frühzeitige Information.",
    "Engere Annahmezeiten sollten sofort eingeführt werden.",
    "Eine bessere Anordnung eines wichtigen Feldes.",
    "Verbindliche Ergebnisse und Zuständigkeiten.",
    "Eine zusätzliche Liste für offene Arbeitsschritte.",
    "Zuerst die tatsächlichen Ankunftszeiten prüfen.",
  ],
  teasers: [
    "Was zwischen zwei Schichten verloren geht: Eine Reportage aus einem Versandlager begleitet Früh- und Spätschicht bei der Übergabe offener Aufträge. Früher fehlte oft der nächste Arbeitsschritt. Eine gemeinsam entwickelte Vorlage soll das ändern. Der Text zeigt, welche Angaben beide Teams tatsächlich nutzen und warum die neue Liste zunächst mehr Rückfragen auslöste.",
    "Fünf Minuten vor Publikum: Eine Ingenieurin spricht erstmals auf einer Betriebsversammlung. Sie berichtet, wie ihr eine Probeaufnahme half, zu schnelle Passagen zu erkennen und den Einstieg zu kürzen. Der Beitrag behandelt die Vorbereitung eines kurzen Vortrags; Verhandlungen über Lieferbedingungen und Abläufe im Schichtbetrieb spielen keine Rolle.",
    "Wenn der günstigste Plan der teuerste wird: Das Wirtschaftsmagazin vergleicht drei Investitionsszenarien eines Betriebs. Auslastung, Wartung und gebundenes Kapital führen zu unterschiedlichen Ergebnissen. Der Autor erklärt, welche Annahmen die Rechnung besonders beeinflussen. Grundbegriffe der Kostenrechnung werden vorausgesetzt; eine Einführung für Leser ohne Vorwissen bietet der Beitrag nicht.",
    "Neu im Lager, neu in der Sprache: Ein Porträt begleitet zwei Berufseinsteiger beim Lernen von Mengenangaben und Ortsbezeichnungen. Bilder helfen ihnen, Rückfragen zu stellen, statt eine unklare Anweisung einfach zu bestätigen. Die Reportage zeigt sprachliche Lernwege und betont, dass diese die betriebliche Sicherheitsunterweisung ergänzen, aber nicht ersetzen.",
    "Liefertermin verpasst – Gespräch noch offen: Ein Einkäufer und eine Lieferantin berichten, wie sie nach mehreren Verzögerungen neue Bedingungen vereinbarten. Statt nur einen Nachlass zu verlangen, prüften sie Teillieferungen und verbindliche Rückmeldetermine. Der Bericht macht die unterschiedlichen Interessen sichtbar und erläutert, welche Zusagen am Ende schriftlich festgehalten wurden.",
    "Was sagt eine Kennzahl aus? Unsere neue Erklärreihe beginnt mit einem kleinen fiktiven Betrieb und stellt absolute Zahlen den zugehörigen Anteilen gegenüber. Kurze Rechenbeispiele zeigen, warum mehr Fehler nicht immer eine höhere Fehlerquote bedeuten. Der erste Beitrag richtet sich ausdrücklich an Leser ohne Kenntnisse der Kostenrechnung; fortgeschrittene Investitionsmodelle folgen hier nicht.",
    "Ein Ablauf auf einer einzigen Seite: Neue Beschäftigte verloren bei der Einarbeitung den Überblick über Zuständigkeiten. Daraufhin zeichnete ein Team seinen Arbeitsprozess mit Karten und Pfeilen nach. Der Praxisbericht zeigt die Darstellung und erklärt, wie Bedingungen und Rücksprünge sichtbar werden. Teure Grafiksoftware war dafür nicht nötig; entscheidend waren die Rückfragen der neuen Kollegen.",
    "Wenn ein Transportfall juristische Fragen aufwirft: Eine Beratungsstelle erläutert, wie sie Anfragen aufnimmt und an spezialisierte Fachleute weitergibt. Der Bericht erklärt die organisatorischen Schritte zwischen Erstkontakt und Beratung. Er enthält keine verbindlichen Antworten auf Einzelfälle und keine Sprachübungen für Gespräche mit Lieferbetrieben.",
  ],
  needs: [
    {
      text: "Zwei Schichten suchen einen Praxisbericht darüber, wie offene Arbeitsschritte bei der Übergabe sichtbar bleiben.",
      answer: 0,
      why: "A begleitet zwei Schichten bei der Einführung einer gemeinsamen Übergabevorlage.",
    },
    {
      text: "Hanna möchte lesen, wie Einkauf und Lieferbetrieb bei Verzögerungen zu tragfähigen Vereinbarungen gelangen.",
      answer: 4,
      why: "E beschreibt Interessen, Teillieferungen und schriftlich festgehaltene Zusagen.",
    },
    {
      text: "Pavel sucht ohne Vorwissen eine Erklärung des Unterschieds zwischen Fehlerzahlen und Fehlerquoten.",
      answer: 5,
      why: "F führt anhand einfacher Beispiele in Zahlen und Anteile ein.",
    },
    {
      text: "Aylin möchte einen Erfahrungsbericht über verständliche Prozessdarstellungen ohne aufwendige Software lesen.",
      answer: 6,
      why: "G erklärt eine mit Karten und Pfeilen erstellte Ablaufdarstellung.",
    },
    {
      text: "Mark kennt die Kostenrechnung und möchte erfahren, wie geänderte Annahmen Investitionsszenarien beeinflussen.",
      answer: 2,
      why: "C setzt Grundlagen voraus und vergleicht anspruchsvollere Szenarien.",
    },
  ],
  internal: [
    {
      text: "Mitteilung: Versuch mit digitaler Übergabe\nVom 3. bis 21. November erproben Früh- und Spätschicht die neue Übergabemaske. Erfasst werden ausschließlich Aufträge, bei denen noch ein Arbeitsschritt offen ist. Vollständig abgeschlossene Aufträge bleiben im bisherigen System. Die Person, die den Eintrag erstellt, trägt auch den nächsten Schritt ein; die übernehmende Schicht bestätigt anschließend die Zuständigkeit. Ohne diese Bestätigung gilt eine Aufgabe nicht als übergeben. Bei einem Systemausfall wird die gedruckte Ersatzliste genutzt und später nachgetragen. Bitte führen Sie während des normalen Betriebs keine parallele Papierliste. Die Auswertung betrachtet fehlende Informationen und doppelte Arbeit. Aus den Bearbeitungszeiten werden keine individuellen Leistungsranglisten erstellt.",
      questions: [
        q(
          "Wann gilt ein Auftrag als übergeben?",
          [
            "Sobald ein Eintrag angelegt wurde.",
            "Nach Bestätigung der übernehmenden Schicht.",
            "Erst nach vollständigem Abschluss des Auftrags.",
          ],
          1,
          "Die Bestätigung ist ausdrücklich erforderlich.",
        ),
        q(
          "Wann wird eine Papierliste verwendet?",
          [
            "Bei einem Systemausfall.",
            "Bei jedem Schichtwechsel zusätzlich.",
            "Nur für vollständig erledigte Aufträge.",
          ],
          0,
          "Papier ist ein Ersatzverfahren, kein paralleler Normalbetrieb.",
        ),
      ],
    },
    {
      text: "Mitteilung: Einführung des neuen Scanners\nDie Geräte werden zunächst im Wareneingang eingesetzt. Die Schulung besteht aus einer kurzen Demonstration und einer begleiteten Übung am Arbeitsplatz. Wer bereits ein Vorgängermodell verwendet hat, nimmt ebenfalls teil, da sich die Fehleranzeige geändert hat. Die Gruppenliste wird erst veröffentlicht, wenn die Schichtleitungen die Besetzung bestätigt haben. Bis dahin gelten die genannten Zeiten als Vorschläge. Die alten Geräte bleiben für zwei Wochen einsatzbereit. Eine private Installation der Schulungssoftware ist weder notwendig noch vorgesehen. Rückmeldungen sammeln wir über eine gemeinsame Liste; dringende technische Störungen melden Sie weiterhin direkt an den Support.",
      questions: [
        q(
          "Warum nehmen auch erfahrene Beschäftigte teil?",
          [
            "Weil alle bisherigen Kenntnisse ungültig sind.",
            "Weil die Fehleranzeige anders funktioniert.",
            "Weil die alten Geräte sofort entsorgt werden.",
          ],
          1,
          "Die geänderte Fehleranzeige begründet die Teilnahme.",
        ),
        q(
          "Wie verbindlich sind die bisherigen Schulungszeiten?",
          [
            "Sie sind bereits endgültig.",
            "Sie wurden vollständig abgesagt.",
            "Sie müssen noch bestätigt werden.",
          ],
          2,
          "Die Zeiten sind bis zur Besetzungsbestätigung Vorschläge.",
        ),
      ],
    },
  ],
  advice: [
    "Wenn eine Übergabe unvollständig ist, klären Sie zuerst den nächsten konkreten Schritt und die verantwortliche Person. Ergänzen Sie danach die Vorlage so, dass diese Information künftig nicht fehlt.",
    "Eine Lieferzusage sollte Menge, Termin und Geltungsbedingungen enthalten. Wiederholen Sie mündliche Vereinbarungen schriftlich und bitten Sie um Bestätigung, bevor Sie intern darauf planen.",
    "Kennzahlen mit unterschiedlich großen Ausgangsmengen sind nur bedingt vergleichbar. Ergänzen Sie absolute Werte durch geeignete Anteile und prüfen Sie, ob die Fälle ähnlich zusammengesetzt sind.",
    "Bei einer technischen Störung sichern Sie zuerst den Arbeitsstand. Nutzen Sie das freigegebene Ersatzverfahren und dokumentieren Sie, welche Daten später nachgetragen werden müssen.",
    "Wenn erfahrene Mitarbeitende eine neue Vorgehensweise ablehnen, fragen Sie nach den konkreten Fällen, in denen sie Schwierigkeiten erwarten. Ein begrenzter Versuch mit gemeinsam vereinbarten Kriterien kann Unterschiede sichtbar machen.",
    "Für eine Präsentation wählen Sie wenige Kernaussagen und erläutern diese anhand eines nachvollziehbaren Beispiels. Prüfen Sie nach einem Probelauf, welche Begriffe Außenstehenden unklar bleiben.",
  ],
  adviceQuestions: [
    {
      text: "Ein Zulieferer hat am Telefon einen früheren Termin in Aussicht gestellt. Unsere Planung soll sich darauf stützen.",
      answer: 1,
      why: "B empfiehlt eine präzise schriftliche Bestätigung.",
    },
    {
      text: "Wir vergleichen Fehlerzahlen zweier Standorte, die sehr unterschiedlich viele Aufträge bearbeiten.",
      answer: 2,
      why: "C behandelt unterschiedliche Ausgangsmengen und Anteile.",
    },
    {
      text: "Erfahrene Kollegen halten die neue Übergabe für unpraktisch. Ich möchte ihre Einwände konstruktiv prüfen.",
      answer: 4,
      why: "E schlägt konkrete Fälle und einen begrenzten Versuch vor.",
    },
    {
      text: "Ich möchte wissen, welcher gesetzliche Urlaubsanspruch für meinen konkreten Vertrag gilt.",
      answer: 6,
      why: "Keiner der Beiträge klärt individuelle Urlaubsansprüche.",
    },
  ],
  minutes:
    "Protokoll der Logistikrunde, 7. November\nTOP 1 – Lieferfähigkeit: Bei Standardteilen liegt die Lieferquote unverändert bei 96 Prozent. Die absolute Zahl verspäteter Aufträge ist gestiegen, weil insgesamt mehr bestellt wurde. Frau Damm bittet darum, in künftigen Berichten Quote und Fallzahl nebeneinander zu zeigen. Der Vorschlag wird angenommen.\nTOP 2 – Scanner: In der ersten Schulungsgruppe traten bei zwei Personen Schwierigkeiten mit der neuen Fehleranzeige auf. Eine zusätzliche zehnminütige Übung wird in alle weiteren Gruppen aufgenommen. Eine Wiederholung der gesamten Schulung ist nicht vorgesehen. Herr Weber erstellt bis Dienstag ein Beispielblatt; die technische Prüfung übernimmt der Support.\nTOP 3 – Retouren: Der Vorschlag, Rücksendungen nur noch morgens anzunehmen, wird nicht beschlossen. Zunächst soll eine Woche lang erfasst werden, zu welchen Zeiten tatsächlich Rücksendungen eintreffen. Frau Damm stimmt die Erfassung mit dem Empfang ab.\nTOP 4 – Übergabe: Der Versuch läuft planmäßig. Drei Aufträge waren eingetragen, aber nicht bestätigt worden. Die Runde hält deshalb am bisherigen Kriterium fest: Eine Übergabe ist erst nach Bestätigung abgeschlossen. Herr Weber erinnert beide Schichten daran.\nTOP 5 – Nächster Termin: Die Auswertung wird um eine Woche verschoben, weil die Daten des zweiten Standorts fehlen. Die Maßnahme selbst läuft bis zum ursprünglich vereinbarten Datum weiter.",
  minuteQuestions: [
    q(
      "Warum stieg die Zahl verspäteter Standardaufträge?",
      [
        "Die Lieferquote halbierte sich.",
        "Das Bestellvolumen nahm zu.",
        "Es wurden keine Standardteile mehr geliefert.",
      ],
      1,
      "Bei unveränderter Quote führte das höhere Volumen zu mehr Fällen.",
    ),
    q(
      "Wie wird die Schulung ergänzt?",
      [
        "Durch eine zusätzliche kurze Übung.",
        "Durch eine vollständige Wiederholung für alle.",
        "Durch den Verzicht auf die Fehleranzeige.",
      ],
      0,
      "Es werden zehn Minuten Übung ergänzt.",
    ),
    q(
      "Was wurde zur Annahme von Retouren entschieden?",
      [
        "Sie ist ab sofort nur morgens möglich.",
        "Die Annahme wird eingestellt.",
        "Zunächst werden die tatsächlichen Zeiten erfasst.",
      ],
      2,
      "Der Vorschlag wurde noch nicht beschlossen.",
    ),
    q(
      "Welches Übergabekriterium gilt weiter?",
      [
        "Ein Eintrag reicht aus.",
        "Die übernehmende Schicht muss bestätigen.",
        "Eine mündliche Vermutung genügt.",
      ],
      1,
      "Die Runde bekräftigt das Bestätigungskriterium.",
    ),
    q(
      "Welche Frist wird verschoben?",
      [
        "Nur die Auswertungsbesprechung.",
        "Der gesamte Versuch.",
        "Die Abgabe des Beispielblatts.",
      ],
      0,
      "Die Maßnahme endet weiterhin am ursprünglichen Datum.",
    ),
  ],
  email:
    "Nachricht von Herrn Scholz, Einkauf eines Kundenbetriebs: Von den bestellten 40 Transportboxen sind gestern nur 28 angekommen. Zwölf fehlen. Für die Inventur am Mittwoch brauchen wir mindestens acht weitere. Bitte bestätigen Sie eine Lösung und erklären Sie, warum wir nicht vorab informiert wurden.\nInterne Rückmeldung Lager: Acht Boxen können heute versendet werden. Vier weitere treffen voraussichtlich am Donnerstag bei uns ein; dieser Zuliefertermin ist noch nicht bestätigt. Die Teilmenge wurde versehentlich ohne Hinweis auf dem Lieferschein freigegeben.\nAnweisung Teamleitung: Entschuldigung und transparente Erklärung. Versand der acht verfügbaren Boxen auf unsere Kosten. Zustelltermin vor Zusage beim Transportdienst prüfen. Zur Restmenge bis morgen 15 Uhr verbindlich Rückmeldung geben. Keine erfundene Garantie für Mittwoch.",
  emailQuestions: [
    q(
      "Welche Menge braucht der Kunde für Mittwoch zusätzlich mindestens?",
      ["Vier Boxen.", "Acht Boxen.", "Zwölf Boxen."],
      1,
      "Für die Inventur werden mindestens acht weitere benötigt.",
    ),
    q(
      "Was ist für die letzten vier Boxen bekannt?",
      [
        "Ihre Ankunft beim Kunden ist garantiert.",
        "Sie wurden bereits versandt.",
        "Ihr Zuliefertermin ist noch unbestätigt.",
      ],
      2,
      "Donnerstag ist nur ein voraussichtlicher Zuliefertermin.",
    ),
  ],
  emailPrompt:
    "Antworten Sie Herrn Scholz. Erläutern Sie den Fehler, die verfügbare Teilmenge und die noch offenen Termine. Zeigen Sie, wie und bis wann Sie die verbleibenden Fragen klären.",
  gapText1:
    "Vielen Dank für Ihren Hinweis. Wir entschuldigen uns [1] die fehlende Information. Acht weitere Boxen können heute versendet werden. [2] wir den Zustelltermin bestätigen, fragen wir beim Transportdienst nach. Die restlichen vier Boxen stehen uns [3] noch nicht zur Verfügung. Der Zulieferer hat Donnerstag genannt, [4] diesen Termin bereits verbindlich zu bestätigen. Wir melden uns bis morgen, [5] Sie Ihre Planung anpassen können. Die zusätzlichen Versandkosten werden selbstverständlich [6] uns übernommen.",
  wordBank: [
    "für",
    "Bevor",
    "derzeit",
    "ohne",
    "damit",
    "von",
    "durch",
    "weil",
    "trotz",
    "seit",
  ],
  gaps1: [
    { answer: "für", why: "Sich für etwas entschuldigen." },
    { answer: "Bevor", why: "Die Nachfrage muss vor der Zusage stattfinden." },
    { answer: "derzeit", why: "Derzeit bezeichnet den gegenwärtigen Stand." },
    {
      answer: "ohne",
      why: "Ohne … zu bezeichnet die ausstehende Bestätigung.",
    },
    { answer: "damit", why: "Damit leitet den Zweck ein." },
    {
      answer: "von",
      why: "Der Handelnde im Passiv wird hier mit von genannt.",
    },
  ],
  gapText2:
    "Die Übergabe ist erst abgeschlossen, [1] die nächste Schicht bestätigt hat. [2] ein Eintrag fehlt, muss er ergänzt werden. Eine parallele Liste würde [3] Aufwand erhöhen. Die Beschäftigten wurden gebeten, technische Probleme sofort [4]. Das Ersatzverfahren kommt nur [5] einem Ausfall zum Einsatz. Die Erfahrungen sollen anschließend gemeinsam [6].",
  gaps2: [
    {
      options: ["wenn", "ob", "denn"],
      answer: 0,
      why: "Wenn nennt die notwendige Bedingung.",
    },
    {
      options: ["Falls", "Trotz", "Wegen"],
      answer: 0,
      why: "Falls leitet einen Bedingungssatz ein.",
    },
    {
      options: ["den", "dem", "des"],
      answer: 0,
      why: "Erhöhen verlangt hier den Akkusativ.",
    },
    {
      options: ["zu melden", "melden", "gemeldet"],
      answer: 0,
      why: "Gebeten werden, etwas zu tun.",
    },
    {
      options: ["bei", "seit", "aus"],
      answer: 0,
      why: "Bei einem Ausfall bezeichnet die Situation.",
    },
    {
      options: [
        "ausgewertet werden",
        "auswerten worden",
        "ausgewertet sein werden",
      ],
      answer: 0,
      why: "Sollen bildet mit dem Passivinfinitiv das Prädikat.",
    },
  ],
  statement: [
    "Die Geschäftsleitung will eine tägliche fünfzehnminütige Schichtbesprechung einführen. Bewerten Sie Nutzen und Aufwand.",
    "Für jede verspätete Lieferung soll künftig automatisch ein Preisnachlass gewährt werden. Nehmen Sie begründet Stellung.",
  ],
  listening: [
    {
      title: "Gespräch zur Übergabe",
      script:
        "A: Der Auftrag steht in der Liste. Dann kann ich gehen? B: Hat die Spätschicht die Übernahme bestätigt? A: Noch nicht. B: Dann ist er noch nicht übergeben. Ruf kurz an und klär, wer zuständig ist. A: Gut, ich ergänze danach auch den nächsten Schritt.",
      questions: [
        q(
          "Der Listeneintrag allein schließt die Übergabe ab.",
          ["Richtig.", "Falsch."],
          1,
          "Eine Bestätigung ist zusätzlich erforderlich.",
        ),
        q(
          "Was soll A zunächst tun?",
          [
            "Die Zuständigkeit klären.",
            "Die Liste löschen.",
            "Den Auftrag neu bestellen.",
          ],
          0,
          "B bittet um einen kurzen Anruf zur Zuständigkeit.",
        ),
      ],
    },
    {
      title: "Gespräch zur Schulung",
      script:
        "A: Ich kenne doch das alte Gerät. Muss ich wirklich mitmachen? B: Ja, vor allem wegen der neuen Fehleranzeige. Die Bedienung ist ähnlich, aber die Meldungen bedeuten etwas anderes. A: Dann reicht es nicht, nur das Handbuch zu lesen? B: Die begleitete Übung ist für alle vorgesehen.",
      questions: [
        q(
          "Die neue Fehleranzeige ist ein Grund für die Teilnahme.",
          ["Richtig.", "Falsch."],
          0,
          "B nennt genau diesen Grund.",
        ),
        q(
          "Was ist für alle vorgesehen?",
          [
            "Eine Prüfung zu Hause.",
            "Eine begleitete Übung.",
            "Ein neuer privater Computer.",
          ],
          1,
          "Die Übung findet begleitet am Arbeitsplatz statt.",
        ),
      ],
    },
    {
      title: "Gespräch zur Lieferquote",
      script:
        "A: Mehr verspätete Aufträge – das sieht schlecht aus. B: Wir hatten aber auch mehr Bestellungen. Die Quote ist gleich geblieben. A: Dann sollten wir beides zeigen? B: Genau, Fallzahl und Quote. Sonst könnte man die Entwicklung falsch verstehen.",
      questions: [
        q(
          "Die Verspätungsquote hat sich verschlechtert.",
          ["Richtig.", "Falsch."],
          1,
          "B sagt, dass die Quote gleich blieb.",
        ),
        q(
          "Wie soll berichtet werden?",
          [
            "Nur mit der Fallzahl.",
            "Nur mit einer Bewertung.",
            "Mit Fallzahl und Quote.",
          ],
          2,
          "Beide Größen sollen nebeneinander gezeigt werden.",
        ),
      ],
    },
    {
      title: "Rückmeldung aus dem Lager",
      script:
        "Pia: Die Übergabe wirkt inzwischen vollständiger. Würdest du noch etwas ändern?\nTarek: Die Liste ist hilfreich. Nur den nächsten Arbeitsschritt übersehe ich beim schnellen Ausfüllen manchmal.\nPia: Soll dafür eine zweite Liste entstehen?\nTarek: Nein, bitte nicht. Das Feld steht ganz unten. Wenn es direkt unter dem Auftrag wäre, würde ich eher daran denken.\nPia: Dann testen wir zuerst eine andere Reihenfolge?\nTarek: Genau. Den Inhalt würde ich beibehalten. Wir sollten prüfen, ob die neue Anordnung schon reicht.",
      questions: [
        q(
          "Was wird vorgeschlagen?",
          [
            "Eine bessere Anordnung eines wichtigen Feldes.",
            "Die Abschaffung der Übergabe.",
            "Eine Verlängerung aller Schichten.",
            "Eine neue Leistungsprämie.",
          ],
          0,
          "Das Feld soll sichtbarer platziert werden.",
        ),
      ],
    },
    {
      title: "Rückmeldung vom Empfang",
      script:
        "Milan: Retouren nur am Vormittag anzunehmen würde unsere Planung vereinfachen. Können wir das ab Montag so machen?\nAnne: Ich bin noch nicht überzeugt. Mehrere Fahrer kommen regelmäßig erst nachmittags.\nMilan: Sind das wirklich viele oder nur einzelne Fälle?\nAnne: Das wissen wir gerade nicht. Lass uns eine Woche lang die tatsächlichen Ankunftszeiten notieren.\nMilan: Und danach entscheiden, ob engere Zeiten sinnvoll sind?\nAnne: Ja. Sonst lösen wir unser Planungsproblem vielleicht auf Kosten der Fahrer, ohne die Folgen zu kennen.",
      questions: [
        q(
          "Welche Position wird vertreten?",
          [
            "Sofort nur morgens annehmen.",
            "Zuerst die tatsächlichen Ankunftszeiten prüfen.",
            "Alle Fahrer abweisen.",
            "Den Empfang schließen.",
          ],
          1,
          "Die Daten sollen der Entscheidung vorausgehen.",
        ),
      ],
    },
    {
      title: "Rückmeldung vom Einkauf",
      script:
        "Selin: Der Lieferbetrieb bietet wegen der Verzögerung drei Prozent Nachlass. Das klingt doch entgegenkommend.\nPaul: Schon, aber der Rabatt hilft mir wenig, wenn ich erst am Liefertag von der Verschiebung erfahre.\nSelin: Du würdest lieber einen höheren Nachlass fordern?\nPaul: Mir wäre eine verlässliche frühe Nachricht wichtiger. Dann könnte ich die Montage umplanen.\nSelin: Also sollten wir einen Rückmeldetermin vereinbaren?\nPaul: Genau. Über den Preis können wir zusätzlich reden, aber die Planungssicherheit steht für mich an erster Stelle.",
      questions: [
        q(
          "Was ist besonders wichtig?",
          [
            "Ein möglichst hoher Rabatt.",
            "Frühzeitige Information.",
            "Eine längere Rechnung.",
            "Eine tägliche Lieferung.",
          ],
          1,
          "Der Sprecher gewichtet Planungssicherheit höher.",
        ),
      ],
    },
    {
      title: "Rückmeldung aus der Spätschicht",
      script:
        "Kira: Morgen ist wieder Schichtbesprechung. Sollen wir diesmal mehr Zeit einplanen?\nJan: Die Zeit reicht meistens. Das Problem beginnt hinterher: Niemand weiß genau, was vereinbart wurde.\nKira: Eine Aufnahme des ganzen Gesprächs wäre möglich.\nJan: Dann müsste jeder alles noch einmal anhören. Eine kurze Ergebnisliste mit Verantwortlichen und Terminen wäre nützlicher.\nKira: Ich kann sie führen und am Ende vorlesen.\nJan: Gut. Dann merken wir gleich, wenn wir uns bei einer Zuständigkeit noch nicht einig sind.",
      questions: [
        q(
          "Was fehlt aus Sicht der Sprecherin?",
          [
            "Ein größerer Besprechungsraum.",
            "Mehr Teilnehmende.",
            "Verbindliche Ergebnisse und Zuständigkeiten.",
            "Eine Videoaufzeichnung jedes Gesprächs.",
          ],
          2,
          "Die Sprecherin fordert dokumentierte Zuständigkeiten und Fristen.",
        ),
      ],
    },
    {
      title: "Präsentation zur Kommissionierung",
      script:
        "Im ersten Testmonat wurden 6000 Aufträge mit der neuen Prüfroutine bearbeitet. Bei 90 Aufträgen musste nachgearbeitet werden. Das entspricht eineinhalb Prozent. Vor dem Test lag der Anteil bei zwei Prozent. Die Bearbeitungszeit stieg durchschnittlich um zwölf Sekunden je Auftrag. Wir gewinnen also Genauigkeit, benötigen aber mehr Zeit. Ob sich der zusätzliche Aufwand insgesamt lohnt, können wir noch nicht abschließend sagen. Die Zeit für spätere Korrekturen wurde bisher nicht einheitlich erfasst. Im nächsten Monat wollen wir genau das ergänzen. Außerdem testen wir, ob eine kürzere Prüfliste bei einfachen Aufträgen denselben Nutzen hat. Die vollständige Liste bleibt bei Sonderaufträgen bestehen. Eine sofortige Verkürzung für sämtliche Aufträge wäre deshalb nicht sinnvoll.",
      questions: [
        q(
          "Wie hoch war der Anteil nachzubearbeitender Aufträge?",
          ["1,5 Prozent.", "2 Prozent.", "15 Prozent."],
          0,
          "90 von 6000 sind 1,5 Prozent.",
        ),
        q(
          "Wie veränderte sich die durchschnittliche Bearbeitungszeit?",
          [
            "Sie sank um zwölf Sekunden.",
            "Sie stieg um zwölf Sekunden.",
            "Sie blieb unverändert.",
          ],
          1,
          "Die neue Routine benötigte mehr Zeit.",
        ),
        q(
          "Welche Information fehlt noch?",
          [
            "Die Zahl aller Aufträge.",
            "Die Zeit für spätere Korrekturen.",
            "Die Länge des Testmonats.",
          ],
          1,
          "Die Korrekturzeit wurde nicht einheitlich erfasst.",
        ),
        q(
          "Wo soll eine kürzere Liste getestet werden?",
          [
            "Bei einfachen Aufträgen.",
            "Bei allen Sonderaufträgen.",
            "Nur bei bereits falsch bearbeiteten Aufträgen.",
          ],
          0,
          "Die vollständige Liste bleibt bei Sonderaufträgen.",
        ),
      ],
    },
    {
      title: "Anruf des Transportunternehmens",
      script:
        "Guten Tag, die acht Boxen können wir heute übernehmen. Eine Zustellung am Mittwoch ist möglich, aber erst nach Prüfung der Route verbindlich. Wir melden uns bis 16 Uhr.",
      questions: [
        q(
          "Was ist noch offen?",
          [
            "Die Übernahme heute.",
            "Die verbindliche Zustellung am Mittwoch.",
            "Die Zahl der Boxen.",
          ],
          1,
          "Der Termin hängt noch von der Routenprüfung ab.",
        ),
      ],
    },
    {
      title: "Anruf des Supports",
      script:
        "Hier ist der Support. Das System funktioniert wieder. Bitte übertragen Sie die Einträge aus der Ersatzliste und markieren Sie sie danach als nachgetragen. Die Papierliste soll zur Kontrolle bis Freitag aufbewahrt werden.",
      questions: [
        q(
          "Was soll mit der Ersatzliste geschehen?",
          [
            "Sofort vernichten.",
            "Einträge übertragen und die Liste zunächst aufbewahren.",
            "Unverändert als Hauptsystem weiterführen.",
          ],
          1,
          "Die Übertragung und vorübergehende Aufbewahrung werden verlangt.",
        ),
      ],
    },
    {
      title: "Anruf zur Gruppenplanung",
      script:
        "Hallo, Weber hier. Die Frühschicht hat ihre Besetzung bestätigt, die Spätschicht noch nicht. Bitte veröffentlichen Sie die gesamte Gruppenliste erst, wenn beide Rückmeldungen da sind.",
      questions: [
        q(
          "Wann soll die Liste veröffentlicht werden?",
          [
            "Sofort.",
            "Nach Bestätigung beider Schichten.",
            "Erst nach der Schulung.",
          ],
          1,
          "Beide Rückmeldungen sind erforderlich.",
        ),
      ],
    },
    {
      title: "Anruf zu Retouren",
      script:
        "Guten Tag, wir bringen heute fünf Rücksendungen. Vier sind bereits angekündigt, eine kommt zusätzlich. Bitte prüfen Sie, ob für diese noch eine Vorgangsnummer benötigt wird.",
      questions: [
        q(
          "Was muss geprüft werden?",
          [
            "Ob alle fünf Retouren neu angekündigt werden müssen.",
            "Ob die zusätzliche Retoure eine Vorgangsnummer braucht.",
            "Ob der Fahrer morgen kommen kann.",
          ],
          1,
          "Die Frage betrifft die eine zusätzliche Rücksendung.",
        ),
      ],
    },
    {
      title: "Anruf zur Auswertung",
      script:
        "Hallo, Damm hier. Die Auswertung verschiebt sich auf nächste Woche. Der Versuch endet trotzdem am Freitag. Bitte führen Sie die neue Erfassung danach nicht ohne Rücksprache weiter.",
      questions: [
        q(
          "Welche Aussage stimmt?",
          [
            "Der Versuch wird automatisch verlängert.",
            "Die Auswertung und das Versuchsende verschieben sich.",
            "Nur die Auswertung wird verschoben.",
          ],
          2,
          "Das Ende am Freitag bleibt bestehen.",
        ),
      ],
    },
  ],
  phone: {
    script:
      "Guten Tag, hier spricht Elias Brandt von Transport Nord. Es geht um die Abholung Ihrer Rücksendung am 22. November. Unser Fahrer kommt zwischen zehn und elf Uhr. Bitte stellen Sie die fünf Paletten an Tor drei bereit. Zwei Paletten müssen wegen beschädigter Folie neu gesichert werden. Die Abholnummer lautet 7318. Bitte bestätigen Sie mir heute bis 15 Uhr, dass die Ware bereitsteht. Sie erreichen mich unter 040 782 61. Vielen Dank.",
    reason: q(
      "Weshalb ruft Herr Brandt an?",
      [
        "Zur Abstimmung einer Abholung.",
        "Zur Bestellung neuer Paletten.",
        "Zur Absage einer Rechnung.",
      ],
      0,
      "Er nennt die organisatorischen Details der Abholung.",
    ),
    key: [
      "Elias Brandt, Transport Nord",
      "040 782 61",
      "22. November, zehn bis elf Uhr",
      "Fünf Paletten an Tor drei",
      "Zwei Paletten wegen beschädigter Folie neu sichern",
      "Abholnummer 7318",
      "Bereitstellung heute bis 15 Uhr bestätigen",
    ],
  },
  speaking: {
    topic:
      "Beschreiben Sie einen betrieblichen Ablauf, bei dem eine gute Übergabe besonders wichtig ist. Erläutern Sie die Beteiligten, typische Schwierigkeiten und eine Verbesserung.",
    followup:
      "Wie würden Sie feststellen, ob die vorgeschlagene Verbesserung tatsächlich wirkt und nicht nur zusätzliche Arbeit verursacht?",
    partner:
      "Ihr Partner erklärt: „Eine höhere Fallzahl bedeutet nicht automatisch eine schlechtere Quote.“ Vermitteln Sie diese Aussage anhand eines eigenen kurzen Beispiels.",
    conversation:
      "Ein Kollege überlegt, ob er lieber früh oder spät arbeiten möchte. Tauschen Sie Erfahrungen über Arbeitszeiten und Zusammenarbeit aus.",
    problem:
      "Ein Lieferbetrieb kann einen wichtigen Auftrag nur teilweise erfüllen. Die Kundschaft braucht einen Teil dringend. Entwickeln Sie gemeinsam eine realistische Lösung und legen Sie fest, welche Zusagen vorab geprüft werden müssen.",
  },
});
