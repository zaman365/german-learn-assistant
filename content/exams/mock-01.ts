import { authorMock } from "./authoring";
const q = (prompt: string, options: string[], answer: number, why: string) => ({
  prompt,
  options,
  answer,
  why,
});
export const mock01 = authorMock({
  id: "MOCK-01",
  title: "Service und Zusammenarbeit",
  description:
    "Ein Servicebetrieb verändert seine Abläufe. Informationen abwägen, Beschwerden lösen und Entscheidungen begründen.",
  version: 2,
  matchingStatements: [
    "Der Prüfaufwand sollte zum Risiko passen.",
    "Auch einfache Bestätigungen müssen immer von einer zweiten Person geprüft werden.",
    "Ein Feld zur Verantwortung sollte verbindlich sein.",
    "Änderungen sollten rechtzeitig angekündigt werden.",
    "Aufzeichnungen sollten vollständig durch feste Schulungstermine ersetzt werden.",
    "Selbstlernen ist nützlich, persönliche Rückfragen bleiben wichtig.",
  ],
  teasers: [
    "Wenn niemand das letzte Wort hat: In vielen Projektgruppen koordinieren Beschäftigte die Arbeit, ohne Vorgesetzte zu sein. Unsere Reporterin begleitet ein Serviceteam, das sich bei strittigen Fragen regelmäßig festfuhr. Wie eine wechselnde Moderation und klar benannte Entscheidungswege die Gespräche verändert haben – und warum nicht jede Diskussion einen Konsens braucht.",
    "Weniger Tabellen, mehr Orientierung: Ein Monatsbericht kann korrekt sein und dennoch an den Fragen der Geschäftsleitung vorbeigehen. An zwei anonymisierten Berichten zeigt die Wirtschaftsredaktion, wie Zahlen, Bezugsgrößen und eine begründete Empfehlung zusammenwirken. Die verwendeten Rechenfunktionen werden vorausgesetzt; im Mittelpunkt steht die verständliche Darstellung einer Entscheidung.",
    "Führung zwischen Früh- und Spätschicht: Dienstpläne sollen fair sein, doch kurzfristige Ausfälle machen gute Vorsätze schnell zunichte. Zwei Personalverantwortliche schildern, wie sie Vertretungen organisieren und Konflikte über Wochenenddienste besprechen. Der Beitrag beleuchtet Entscheidungen von Vorgesetzten mit Personalverantwortung; die Moderation gleichberechtigter Projektgruppen steht nicht im Zentrum.",
    "Der erste Anruf am Empfang: Eine Auszubildende erzählt von ihrer ersten Woche in einem Handwerksbetrieb. Anfangs wollte sie jede Frage sofort beantworten. Inzwischen weiß sie, wann sie weiterleiten sollte und welche Angaben eine brauchbare Telefonnotiz enthält. Der Erfahrungsbericht erklärt einfache Gesprächsschritte; schwierige Reklamationen werden an erfahrene Kolleginnen abgegeben.",
    "Eine Antwort, die Ärger nicht vergrößert: Wie reagieren Unternehmen schriftlich auf berechtigte Beschwerden, ohne ungesicherte Zusagen zu machen? Eine Sprachtrainerin kommentiert drei fiktive Kundenbriefe und erläutert, warum eine konkrete nächste Handlung mehr hilft als eine lange Entschuldigung. Leser können die Überarbeitungen Schritt für Schritt nachvollziehen; ein persönliches Beratungsangebot ist der Artikel nicht.",
    "Wer muss diese Nachricht wirklich erhalten? Beim Weiterleiten von Kundenanfragen gelangen häufig mehr Daten in Umlauf als für die Bearbeitung nötig wären. Ein Datenschutzbeauftragter erläutert typische organisatorische Fehler und berichtet über eine neue interne Verteilerregel. Der Artikel vermittelt Einblicke in einen Betrieb und ersetzt weder eine individuelle Rechtsprüfung noch ein Schreibtraining.",
    "Wie ein Vortrag auf dem Bildschirm wirkt: Blickkontakt, Pausen und verständliche Übergänge verändern die Wahrnehmung einer Videopräsentation. Eine Projektleiterin vergleicht zwei Aufnahmen ihres eigenen Vortrags. Der Medienbeitrag erklärt an ihrem Beispiel, was sie bei Sprechtempo und Aufbau verändert hat. Die Auswahl von Kamera und Beleuchtung bleibt dabei eine Nebenfrage.",
    "Die erste eigene Tabelle: Wer bisher mit Papierlisten arbeitet, braucht beim Umstieg vor allem überschaubare Schritte. Eine Bürokauffrau zeigt an einer kleinen Materialliste, wie Sortieren und einfache Summen funktionieren. Der Technikbeitrag richtet sich an Einsteiger; die sprachliche Qualität von Berichten und das Präsentieren von Ergebnissen werden nicht behandelt.",
  ],
  needs: [
    {
      text: "Mara koordiniert ohne Vorgesetztenrolle eine Arbeitsgruppe. Sie möchte lesen, wie Teams strittige Diskussionen strukturieren.",
      answer: 0,
      why: "A beschreibt Moderation und Entscheidungswege ohne Personalverantwortung.",
    },
    {
      text: "Omar sucht einen Artikel mit kommentierten Beispielen für schriftliche Antworten auf Kundenbeschwerden.",
      answer: 4,
      why: "E analysiert fiktive Beschwerdeantworten. Es ist kein Kursangebot.",
    },
    {
      text: "Lina beherrscht Tabellenkalkulation. Sie möchte erfahren, wie ein Bericht der Geschäftsleitung eine Entscheidung erleichtert.",
      answer: 1,
      why: "B verbindet Zahlen und Bezugsgrößen mit einer begründeten Empfehlung.",
    },
    {
      text: "Jens möchte anhand eines Erfahrungsberichts verstehen, wie Sprechtempo und Aufbau bei Videovorträgen wirken.",
      answer: 6,
      why: "G vergleicht zwei Vortragsaufnahmen und ihre Wirkung.",
    },
    {
      text: "Sofia beginnt am Empfang. Sie interessiert sich für Erfahrungen mit einfachen Telefonaten und brauchbaren Notizen.",
      answer: 3,
      why: "D behandelt die ersten Gesprächsschritte einer Auszubildenden.",
    },
  ],
  internal: [
    {
      text: "Betreff: Gemeinsamer Eingang für Serviceanfragen\nAb Montag beginnt der vierwöchige Versuch mit einem gemeinsamen Postfach. Standardanfragen werden dort von der jeweils eingetragenen Person übernommen. Diese Zuordnung bedeutet noch keine fachliche Freigabe: Bei Vertragsänderungen bleibt die Fachabteilung zuständig. Bitte leiten Sie solche Fälle weiter, ohne der Kundschaft eine Entscheidung zuzusagen. Die bisherige Liste wird während des Versuchs nur lesend bereitgestellt. Neue Fälle gehören ausschließlich in das gemeinsame System. Am Ende jeder Woche prüft Frau Seidel doppelte Bearbeitungen und offene Zuständigkeiten. Eine Bewertung der individuellen Arbeitsleistung ist mit dieser Auswertung nicht verbunden. Ob wir das Verfahren dauerhaft übernehmen, entscheiden wir erst nach der gemeinsamen Besprechung am Monatsende.",
      questions: [
        q(
          "Welche Aussage über Vertragsänderungen trifft zu?",
          [
            "Die eingetragene Person darf sie sofort genehmigen.",
            "Sie müssen weiterhin fachlich entschieden werden.",
            "Sie werden bis zum Monatsende nicht bearbeitet.",
          ],
          1,
          "Eine Zuordnung ersetzt die fachliche Freigabe nicht.",
        ),
        q(
          "Wozu dient die wöchentliche Auswertung?",
          [
            "Sie bestimmt die persönliche Leistungsprämie.",
            "Sie ersetzt die Abschlussbesprechung.",
            "Sie zeigt Probleme bei Bearbeitung und Zuständigkeit.",
          ],
          2,
          "Geprüft werden doppelte Bearbeitungen und offene Zuständigkeiten.",
        ),
      ],
    },
    {
      text: "Betreff: Rückmeldung zum Schulungsentwurf\nVielen Dank für Ihre Hinweise. Die ursprünglich geplante Pflichtveranstaltung wird in zwei Teile aufgeteilt. Die zwanzigminütige Einführung sehen alle Beschäftigten innerhalb der nächsten zwei Wochen an; die Aufzeichnung steht ab Dienstag bereit. Für die anschließende Fallwerkstatt melden sich nur Personen an, die regelmäßig schwierige Beschwerden bearbeiten. Ihre Teilnahme muss mit der jeweiligen Teamleitung abgestimmt werden, damit die Erreichbarkeit gewährleistet bleibt. Die Werkstatt wird nicht aufgezeichnet, weil wir anonymisierte, aber dennoch sensible Fälle besprechen. Wer keinen Platz erhält, wird für einen Zusatztermin vorgemerkt. Die Unterlagen der Einführung bleiben nach Ablauf der Frist zugänglich; die Frist betrifft das erstmalige Ansehen.",
      questions: [
        q(
          "Wer soll an der Fallwerkstatt teilnehmen?",
          [
            "Alle Beschäftigten ohne Ausnahme.",
            "Beschäftigte mit regelmäßig komplexen Beschwerdefällen nach Abstimmung.",
            "Ausschließlich die Teamleitungen.",
          ],
          1,
          "Die Werkstatt richtet sich an einen bestimmten Personenkreis und erfordert Abstimmung.",
        ),
        q(
          "Was geschieht nach zwei Wochen mit der Einführung?",
          [
            "Die Unterlagen bleiben abrufbar.",
            "Die Aufzeichnung wird gelöscht.",
            "Ein erneutes Ansehen wird verpflichtend.",
          ],
          0,
          "Nur das erstmalige Ansehen hat eine Frist.",
        ),
      ],
    },
  ],
  advice: [
    "Dokumentieren Sie zunächst, welche Aufgaben Sie tatsächlich übernehmen und welche Fristen kollidieren. Bitten Sie dann um eine Priorisierung durch die zuständige Führungskraft. Eine solche Übersicht ersetzt keine Entscheidung, macht sie aber möglich.",
    "Bei einer unklaren Nachricht hilft eine knappe Zusammenfassung des eigenen Verständnisses mit einer gezielten Rückfrage. Vermeiden Sie es, mehrere vermutete Fehler zugleich zu unterstellen.",
    "Für wiederkehrende Übergaben eignet sich eine gemeinsame Vorlage mit Bearbeitungsstand, nächstem Schritt und verantwortlicher Person. Prüfen Sie nach zwei Wochen, ob wichtige Informationen fehlen.",
    "Ein Konflikt sollte zunächst unter vier Augen anhand konkreter Beobachtungen besprochen werden. Beschreiben Sie auch die Wirkung auf Ihre Arbeit, ohne der anderen Person eine Absicht zuzuschreiben.",
    "Bei der Auswahl einer Fortbildung sollten Sie Lernziel, Übungsanteil und Rückmeldung getrennt vergleichen. Ein bekannter Titel allein sagt wenig darüber aus, ob der Kurs die konkrete Lücke schließt.",
    "Wenn Sie einen Termin nicht halten können, informieren Sie frühzeitig, nennen Sie den realistischen neuen Zeitpunkt und erklären Sie, welche Zwischenergebnisse dennoch verfügbar sind.",
  ],
  adviceQuestions: [
    {
      text: "Ich habe gleichzeitig drei dringende Aufträge bekommen. Ich darf nicht selbst entscheiden, welcher zurückgestellt wird.",
      answer: 0,
      why: "A empfiehlt eine nachvollziehbare Übersicht und Priorisierung durch die Führungskraft.",
    },
    {
      text: "Bei der Schichtübergabe fehlt häufig der nächste Arbeitsschritt. Wir brauchen ein verlässliches gemeinsames Verfahren.",
      answer: 2,
      why: "C nennt eine strukturierte Übergabevorlage.",
    },
    {
      text: "Eine Kollegin hat meine Arbeit mehrfach im Teammeeting kritisiert. Ich möchte das Verhältnis klären.",
      answer: 3,
      why: "D empfiehlt ein konkretes Gespräch unter vier Augen.",
    },
    {
      text: "Ich brauche eine verbindliche Auskunft dazu, welche Reisekosten ich steuerlich absetzen darf.",
      answer: 6,
      why: "Kein Beitrag behandelt verbindliche steuerliche Auskünfte.",
    },
  ],
  minutes:
    "Protokoll der Servicebesprechung, 12. September\nAnwesend: Seidel, Baum, Malik und Roth. Frau Kern ist entschuldigt.\nTOP 1: Die Zahl offener Anfragen ist von 84 auf 63 gesunken. Herr Baum führt dies auf die neue Vorlage zurück. Frau Malik weist darauf hin, dass gleichzeitig weniger Anfragen eingegangen sind. Die Runde beschließt deshalb, künftig zusätzlich den Anteil offener Fälle zu erfassen. Eine eindeutige Ursache wird noch nicht festgestellt.\nTOP 2: Für zwei Wochen wird vormittags eine zusätzliche Person am Telefon eingesetzt. Herr Roth erstellt bis Mittwoch einen Vorschlag zur Besetzung. Der Vorschlag gilt erst nach Freigabe durch Frau Seidel. Die Nachmittagsschicht bleibt unverändert.\nTOP 3: Die Wissensdatenbank enthält mehrere veraltete Antworten. Jeder Fachbereich benennt bis Freitag eine zuständige Person. Diese prüft zunächst die zehn am häufigsten aufgerufenen Einträge. Eine vollständige Überarbeitung ist für diesen Monat nicht vorgesehen.\nTOP 4: Die Kundenbefragung wird verschoben, weil der Entwurf noch keine Antwortmöglichkeit für gelöste Anliegen enthält. Frau Malik ergänzt diese bis Dienstag. Danach prüft der Datenschutzbeauftragte den Entwurf. Ein Versandtermin wurde nicht beschlossen.\nNächste Besprechung: in drei Wochen. Herr Baum führt das Protokoll.",
  minuteQuestions: [
    q(
      "Was lässt sich über den Rückgang offener Anfragen sagen?",
      [
        "Die neue Vorlage ist nachweislich die einzige Ursache.",
        "Seine Ursache ist noch nicht eindeutig geklärt.",
        "Er betrifft ausschließlich die Nachmittagsschicht.",
      ],
      1,
      "Das geringere Anfragevolumen ist ein weiterer möglicher Einfluss.",
    ),
    q(
      "Welche Aufgabe übernimmt Herr Roth?",
      [
        "Er genehmigt den Personaleinsatz.",
        "Er stellt sofort eine neue Person ein.",
        "Er entwirft einen Besetzungsplan zur Freigabe.",
      ],
      2,
      "Er erstellt einen Vorschlag, den Frau Seidel freigeben muss.",
    ),
    q(
      "Was prüfen die Fachbereiche zuerst?",
      [
        "Die zehn am häufigsten genutzten Einträge.",
        "Sämtliche Einträge der Datenbank.",
        "Nur noch nicht veröffentlichte Antworten.",
      ],
      0,
      "Der erste Umfang ist ausdrücklich auf zehn Einträge begrenzt.",
    ),
    q(
      "Warum wird die Befragung verschoben?",
      [
        "Es fehlen geeignete Antwortmöglichkeiten.",
        "Es wurden bereits alle Kunden befragt.",
        "Der Versanddienstleister hat abgesagt.",
      ],
      0,
      "Der Entwurf berücksichtigt gelöste Anliegen noch nicht.",
    ),
    q(
      "Welche Aussage zum Versandtermin stimmt?",
      [
        "Er liegt unmittelbar nach Dienstag.",
        "Er wurde auf Freitag festgelegt.",
        "Er bleibt offen.",
      ],
      2,
      "Ein Versandtermin wurde nicht beschlossen.",
    ),
  ],
  email:
    "Von: Kundenservice an Teamleitung\nDie Kundin Frau Berger meldet, dass bei ihrer Bestellung 5721 zwei Anschlüsse fehlen. Der Rest ist vollständig und unbeschädigt. Sie braucht die Anlage am Freitag und verlangt die sofortige Nachlieferung sowie die Erstattung der Expresskosten. Lagerauskunft: Die Anschlüsse sind vorhanden; eine Übergabe an den Versand ist morgen möglich. Ob eine Zustellung am Freitag gelingt, muss der Versanddienst noch bestätigen. Teamleitung: Bitte entschuldigen Sie die unvollständige Lieferung. Wir übernehmen die Kosten unserer Nachlieferung. Eine Erstattung früherer Expresskosten kann ich erst nach Prüfung der Rechnung zusagen. Bitten Sie Frau Berger um die Rechnung und bestätigen Sie bis morgen 12 Uhr das tatsächliche Lieferfenster.",
  emailQuestions: [
    q(
      "Was fehlt der Kundin?",
      [
        "Die gesamte Anlage.",
        "Zwei Anschlüsse.",
        "Die Rechnung des Versanddienstes.",
      ],
      1,
      "Die Lieferung ist bis auf zwei Anschlüsse vollständig.",
    ),
    q(
      "Welche Zusage ist bereits freigegeben?",
      [
        "Die Nachlieferung erfolgt auf Kosten des Unternehmens.",
        "Die früheren Expresskosten werden ohne Prüfung erstattet.",
        "Die Zustellung am Freitag ist garantiert.",
      ],
      0,
      "Nur die Kostenübernahme für die Nachlieferung ist bestätigt.",
    ),
  ],
  emailPrompt:
    "Antworten Sie Frau Berger. Gehen Sie auf die fehlenden Teile, das noch unbestätigte Lieferfenster und ihre Forderung nach Kostenerstattung ein. Nennen Sie den nächsten verbindlichen Rückmeldezeitpunkt.",
  gapText1:
    "Sehr geehrte Frau Berger, vielen Dank für Ihre Nachricht. Wir bedauern, [1] Ihre Lieferung unvollständig war. Die fehlenden Anschlüsse stehen [2] Verfügung. Wir haben den Versand beauftragt, [3] wir Ihnen noch kein bestätigtes Zustellfenster nennen können. [4] wir die Rückmeldung erhalten, informieren wir Sie. Bitte senden Sie uns außerdem eine Kopie Ihrer Rechnung, [5] wir die geltend gemachten Expresskosten prüfen können. [6] der Nachlieferung entstehen Ihnen keine weiteren Kosten.",
  wordBank: [
    "dass",
    "zur",
    "wobei",
    "Sobald",
    "damit",
    "Durch",
    "obwohl",
    "zum",
    "Bevor",
    "trotz",
  ],
  gaps1: [
    {
      answer: "dass",
      why: "Der Inhalt des Bedauerns wird durch einen dass-Satz angeschlossen.",
    },
    { answer: "zur", why: "Die feste Verbindung lautet zur Verfügung stehen." },
    {
      answer: "wobei",
      why: "Wobei ergänzt die Einschränkung zum Versandauftrag.",
    },
    {
      answer: "Sobald",
      why: "Die Rückmeldung löst die sofortige Information aus.",
    },
    {
      answer: "damit",
      why: "Damit leitet den Zweck der Rechnungsübersendung ein.",
    },
    {
      answer: "Durch",
      why: "Durch bezeichnet hier den Anlass der möglichen Kosten.",
    },
  ],
  gapText2:
    "Die neue Vorlage wurde eingeführt, [1] die Bearbeitung zu vereinheitlichen. [2] der ersten Rückmeldungen haben wir zwei Felder ergänzt. Nicht alle Fälle lassen sich standardisieren; [3] bleibt eine fachliche Prüfung notwendig. Für Ausnahmen ist [4] kurze Begründung erforderlich. Die Teamleitung bat darum, offene Fragen bis Freitag [5]. Erst danach soll entschieden werden, ob die Vorlage dauerhaft [6].",
  gaps2: [
    {
      options: ["um", "ohne", "anstatt"],
      answer: 0,
      why: "Um … zu nennt das Ziel.",
    },
    {
      options: ["Aufgrund", "Trotzdem", "Währenddessen"],
      answer: 0,
      why: "Aufgrund regiert den Genitiv und nennt die Grundlage.",
    },
    {
      options: ["dennoch", "sodass", "obwohl"],
      answer: 0,
      why: "Dennoch verbindet selbstständige Sätze mit einer Einschränkung.",
    },
    {
      options: ["eine", "einen", "einer"],
      answer: 0,
      why: "Eine Begründung steht im Nominativ.",
    },
    {
      options: ["zu sammeln", "sammeln", "gesammelt"],
      answer: 0,
      why: "Darum bitten verlangt hier den Infinitiv mit zu.",
    },
    {
      options: ["eingesetzt wird", "einzusetzen", "eingesetzt worden"],
      answer: 0,
      why: "Der indirekte Fragesatz braucht ein finites Passivprädikat.",
    },
  ],
  statement: [
    "Künftig soll jede Kundenantwort vor dem Versand von einer zweiten Person geprüft werden. Nehmen Sie zu diesem Vorschlag Stellung.",
    "Das Unternehmen möchte Schulungen nur noch als Aufzeichnungen anbieten. Beurteilen Sie den Vorschlag aus Sicht der Beschäftigten und des Betriebs.",
  ],
  listening: [
    {
      title: "Gespräch über Zuständigkeiten",
      script:
        "A: Ich habe den Fall im Postfach übernommen. Kann ich die Vertragsänderung gleich bestätigen? B: Die Übernahme zeigt nur, wer sich kümmert. Die Fachabteilung muss die Änderung freigeben. A: Dann bestätige ich der Kundin heute den Eingang und sage eine Rückmeldung für morgen zu. B: Genau. Versprich aber noch kein Ergebnis.",
      questions: [
        q(
          "Darf A die Vertragsänderung selbst freigeben?",
          ["Ja.", "Nein."],
          1,
          "Die Freigabe bleibt bei der Fachabteilung.",
        ),
        q(
          "Was will A heute tun?",
          [
            "Den Eingang bestätigen.",
            "Den Vertrag rückgängig machen.",
            "Die Rückfrage bis nächste Woche verschieben.",
          ],
          0,
          "A kündigt eine Eingangsbestätigung an.",
        ),
      ],
    },
    {
      title: "Gespräch über die Schulung",
      script:
        "A: Die Einführung habe ich schon angesehen. Die Fallwerkstatt wäre auch interessant. B: Bearbeitest du regelmäßig Beschwerden? A: Seit diesem Monat, ja. B: Dann sprich mit der Teamleitung. Du musst nicht noch einmal die Einführung besuchen, aber der Dienst muss während der Werkstatt abgedeckt sein.",
      questions: [
        q(
          "A hat die Einführung bereits angesehen.",
          ["Richtig.", "Falsch."],
          0,
          "A sagt dies ausdrücklich.",
        ),
        q(
          "Was muss A noch klären?",
          [
            "Die Finanzierung eines neuen Kurses.",
            "Die Abstimmung der Teilnahme mit der Teamleitung.",
            "Die Löschung der Aufzeichnung.",
          ],
          1,
          "Die Erreichbarkeit im Dienst muss gewährleistet sein.",
        ),
      ],
    },
    {
      title: "Gespräch über einen Bericht",
      script:
        "A: Die offenen Fälle sind gesunken. Dann hat unsere Vorlage geholfen. B: Vielleicht, aber wir hatten auch weniger Anfragen. Vergleichen wir erst die Anteile. A: Du meinst, die Zahlen reichen noch nicht für diese Schlussfolgerung? B: Genau. Der Rückgang ist real, die Ursache aber noch offen.",
      questions: [
        q(
          "B bestreitet den Rückgang der offenen Fälle.",
          ["Richtig.", "Falsch."],
          1,
          "B unterscheidet Rückgang und Ursache.",
        ),
        q(
          "Was schlägt B vor?",
          [
            "Die Anteile vergleichen.",
            "Die Vorlage sofort abschaffen.",
            "Die letzten Zahlen löschen.",
          ],
          0,
          "Die Anteile liefern einen aussagekräftigeren Vergleich.",
        ),
      ],
    },
    {
      title: "Rückmeldung 1",
      script:
        "Mara: Bei drei offenen Fällen wusste ich heute nicht, wen ich fragen sollte. Fehlt uns eine weitere Liste?\nJonas: Eher nicht. In der vorhandenen Liste steht zwar der Stand, aber das Feld für die verantwortliche Person bleibt oft leer.\nMara: Also die Liste abschaffen und wieder direkt anrufen?\nJonas: Dann fehlt der nächsten Schicht dieselbe Information. Ich würde das Verantwortungsfeld zur Pflicht machen.\nMara: Einverstanden. Für die Übergangszeit müssten wir noch klären, wer unvollständige Einträge ergänzt.\nJonas: Das nehmen wir als offene Frage ins nächste Treffen mit.",
      questions: [
        q(
          "Welche Aussage passt?",
          [
            "Ein Feld zur Verantwortung sollte verbindlich sein.",
            "Die Liste sollte abgeschafft werden.",
            "Alle Felder sind überflüssig.",
            "Eine Schulung muss verschoben werden.",
          ],
          0,
          "Die Sprecherin fordert eine verbindliche Zuständigkeitsangabe.",
        ),
      ],
    },
    {
      title: "Rückmeldung 2",
      script:
        "Lea: Hast du die Aufzeichnungen inzwischen angesehen? Ich überlege, ob wir sie durch feste Termine ersetzen sollten.\nOmar: Bitte nicht vollständig. Ich kann schwierige Stellen wiederholen, wenn es im Dienst ruhiger wird.\nLea: Dann brauchen wir die Trainerin eigentlich nicht mehr?\nOmar: Doch. Bei zwei eigenen Fällen wusste ich trotz Video nicht weiter. Dafür wäre eine kurze Sprechzeit hilfreich.\nLea: Also selbstständig lernen und bei Bedarf nachfragen?\nOmar: Genau. Für die Grundlagen passt die Aufzeichnung, für besondere Fälle brauche ich ein Gespräch.",
      questions: [
        q(
          "Welche Aussage passt?",
          [
            "Aufzeichnungen sind grundsätzlich unbrauchbar.",
            "Selbstlernen ist nützlich, persönliche Rückfragen bleiben wichtig.",
            "Die Trainerin soll alle Gespräche aufzeichnen.",
            "Es gibt keine schwierigen Fälle.",
          ],
          1,
          "Die Vorteile und Grenzen des Selbstlernens werden kombiniert.",
        ),
      ],
    },
    {
      title: "Rückmeldung 3",
      script:
        "Nora: Seit gestern wartet jede Kundenmail auf eine zweite Freigabe. Das dauert ziemlich lange.\nBen: Die zusätzliche Prüfung soll falsche Zusagen verhindern. Dagegen habe ich nichts.\nNora: Würdest du auch eine reine Eingangsbestätigung prüfen lassen?\nBen: Eben nicht. Eine Bestätigung verspricht noch keine Erstattung. Wir sollten zwischen Information und verbindlicher Zusage unterscheiden.\nNora: Dann brauchen wir klare Beispiele für beide Gruppen.\nBen: Ja. Bei hohem Risiko gründlich prüfen, einfache Antworten aber nicht unnötig aufhalten.",
      questions: [
        q(
          "Welche Aussage passt?",
          [
            "Alle Nachrichten brauchen dieselbe Kontrolle.",
            "Verbindliche Zusagen sollten ohne Prüfung verschickt werden.",
            "Der Prüfaufwand sollte zum Risiko passen.",
            "Kurze Nachrichten dürfen nicht beantwortet werden.",
          ],
          2,
          "Der Sprecher plädiert für abgestufte Kontrolle.",
        ),
      ],
    },
    {
      title: "Rückmeldung 4",
      script:
        "Eva: Du klangst vorhin genervt. Sind dir die neuen Verfahren grundsätzlich zu viel?\nMalik: Nicht die Änderungen selbst. Heute hat mich eine Kundin nach dem neuen Ablauf gefragt, und ich wusste noch gar nichts davon.\nEva: Sollen wir vor jeder Änderung eine Schulung organisieren?\nMalik: Für diese kleine Änderung hätte eine kurze Mitteilung gestern gereicht.\nEva: Also informieren, bevor die neue Regel gilt?\nMalik: Genau. Dann kann ich mich vorbereiten und muss die Kundschaft nicht erst warten lassen.",
      questions: [
        q(
          "Welche Aussage passt?",
          [
            "Verfahren dürfen nie geändert werden.",
            "Änderungen sollten rechtzeitig angekündigt werden.",
            "Telefonate sollen nur vormittags stattfinden.",
            "Eine lange Schulung ist immer nötig.",
          ],
          1,
          "Das Problem ist die verspätete Information.",
        ),
      ],
    },
    {
      title: "Präsentation zur Servicequalität",
      script:
        "Im vergangenen Quartal haben wir 2400 Anfragen bearbeitet, im Quartal davor 2000. Die Zahl der Beschwerden stieg von 80 auf 84. Absolut sind es also vier mehr; bezogen auf alle Anfragen sank der Anteil von vier auf dreieinhalb Prozent. Das ist erfreulich, erlaubt aber noch keine Aussage über die Zufriedenheit aller Kundinnen und Kunden. Beschwerden sind nur eine Informationsquelle. Außerdem wurde während des Quartals unser Formular verkürzt. Ob dadurch mehr Menschen Rückmeldung geben, wissen wir noch nicht. Ich schlage deshalb vor, zusätzlich eine kurze Zufriedenheitsfrage nach abgeschlossenen Fällen zu testen. Der Test soll sechs Wochen dauern. Teilnehmen sollen zunächst nur zwei Teams, damit wir den Aufwand beobachten können. Eine unternehmensweite Einführung ist noch nicht beschlossen.",
      questions: [
        q(
          "Wie entwickelte sich die absolute Beschwerdezahl?",
          ["Sie sank.", "Sie blieb gleich.", "Sie stieg leicht."],
          2,
          "Sie stieg von 80 auf 84.",
        ),
        q(
          "Wie hoch war die neue Beschwerdequote?",
          ["3,5 Prozent.", "4 Prozent.", "8,4 Prozent."],
          0,
          "84 von 2400 entsprechen 3,5 Prozent.",
        ),
        q(
          "Welche Einschränkung nennt der Vortrag?",
          [
            "Beschwerden bilden die gesamte Zufriedenheit nicht ab.",
            "Alle Kunden haben das Formular ausgefüllt.",
            "Die Formularänderung wurde nicht durchgeführt.",
          ],
          0,
          "Beschwerden sind nur eine Informationsquelle.",
        ),
        q(
          "Was ist vorgeschlagen?",
          [
            "Sofortige Einführung in allen Teams.",
            "Ein sechswöchiger Test mit zwei Teams.",
            "Abschaffung aller Rückfragen.",
          ],
          1,
          "Der Test ist zeitlich und organisatorisch begrenzt.",
        ),
      ],
    },
    {
      title: "Nachricht zur Lieferung",
      script:
        "Guten Tag, hier ist der Versand. Die fehlenden Anschlüsse gehen heute raus. Der Transportdienst hat die Zustellung für Freitag noch nicht bestätigt. Bitte nennen Sie der Kundin deshalb noch kein festes Zeitfenster.",
      questions: [
        q(
          "Was ist bereits sicher?",
          [
            "Der Versand erfolgt heute.",
            "Die Zustellung erfolgt Freitag um neun.",
            "Die Kundin holt die Teile selbst ab.",
          ],
          0,
          "Der Versand ist bestätigt, das Zustellfenster nicht.",
        ),
      ],
    },
    {
      title: "Nachricht zur Besprechung",
      script:
        "Hallo, hier ist Malik. Unsere Besprechung findet wie geplant um zehn statt, aber im Raum 204. Im bisherigen Raum wird noch die Technik repariert. Die Unterlagen müssen Sie nicht neu ausdrucken.",
      questions: [
        q(
          "Was hat sich geändert?",
          ["Die Uhrzeit.", "Der Raum.", "Die Unterlagen."],
          1,
          "Nur der Raum wurde geändert.",
        ),
      ],
    },
    {
      title: "Nachricht zur Datenbank",
      script:
        "Hier ist Seidel. Bitte prüfen Sie bis Freitag nur die zehn meistgenutzten Einträge. Für die restlichen Beiträge planen wir einen eigenen Termin. Schicken Sie mir zunächst die Namen der zuständigen Personen.",
      questions: [
        q(
          "Was wird zuerst benötigt?",
          [
            "Die vollständige Datenbank.",
            "Die Namen der Verantwortlichen.",
            "Ein Termin mit allen Kunden.",
          ],
          1,
          "Die Sprecherin bittet zunächst um die Namen.",
        ),
      ],
    },
    {
      title: "Nachricht zur Rechnung",
      script:
        "Guten Tag, Berger hier. Die Rechnung habe ich gerade per E-Mail geschickt. Bitte prüfen Sie die Expresskosten. Die Nachlieferung allein löst dieses Anliegen für mich noch nicht.",
      questions: [
        q(
          "Worum bittet die Kundin?",
          [
            "Um Stornierung der Nachlieferung.",
            "Um Prüfung der Expresskosten.",
            "Um eine neue Rechnung für die Anschlüsse.",
          ],
          1,
          "Die Expresskosten bleiben ein gesondertes Anliegen.",
        ),
      ],
    },
    {
      title: "Nachricht zum Test",
      script:
        "Hallo, Baum hier. Die Erprobung endet nächste Woche. Bitte ändern Sie das Verfahren bis zur Auswertung noch nicht. Notieren Sie Probleme in der gemeinsamen Liste, damit wir sie anschließend vergleichen können.",
      questions: [
        q(
          "Wie soll mit Problemen umgegangen werden?",
          [
            "Das Verfahren sofort ersetzen.",
            "Probleme bis zur Auswertung dokumentieren.",
            "Die gemeinsame Liste schließen.",
          ],
          1,
          "Probleme werden zunächst dokumentiert.",
        ),
      ],
    },
  ],
  phone: {
    script:
      "Guten Tag, hier ist Nora Feld vom Schulungsbüro. Ich rufe wegen Ihrer Fallwerkstatt am 18. Oktober an. Der Termin beginnt erst um 14 Uhr, nicht um 13 Uhr. Der Raum bleibt B 12. Bitte bringen alle Teilnehmenden einen anonymisierten Kundenbrief mit. Im Moment haben wir zwölf Anmeldungen; zwei weitere Plätze sind noch frei. Ich brauche bis morgen Mittag die endgültige Teilnehmerliste per E-Mail. Für Rückfragen erreichen Sie mich unter der Durchwahl 426. Vielen Dank.",
    reason: q(
      "Warum ruft Frau Feld hauptsächlich an?",
      [
        "Sie sagt die Werkstatt ab.",
        "Sie informiert über die Organisation der Werkstatt.",
        "Sie beschwert sich über einen Kundenbrief.",
      ],
      1,
      "Die Nachricht betrifft Zeit, Raum, Vorbereitung und Anmeldung.",
    ),
    key: [
      "Nora Feld",
      "Durchwahl 426",
      "18. Oktober",
      "Beginn 14 Uhr statt 13 Uhr; Raum B 12",
      "Anonymisierten Kundenbrief mitbringen",
      "Zwölf Anmeldungen, zwei freie Plätze",
      "Endgültige Teilnehmerliste bis morgen Mittag per E-Mail senden",
    ],
  },
  speaking: {
    topic:
      "Stellen Sie eine berufliche Schulung vor, die Sie für sinnvoll halten. Erläutern Sie Zielgruppe, Inhalte, Übungsformen und ein Kriterium für ihren Erfolg. Sprechen Sie etwa zwei Minuten.",
    followup:
      "Eine Kollegin bezweifelt, dass für die Schulung Zeit bleibt. Antworten Sie auf die Nachfrage: Wie würden Sie den Aufwand begrenzen, ohne das Lernziel aufzugeben?",
    partner:
      "Ihre Gesprächspartnerin sagt: „Eine Kontrolle schützt vor Fehlern, kann aber neue Wartezeiten verursachen.“ Erklären Sie einer dritten Person, welchen Zielkonflikt sie damit beschreibt.",
    conversation:
      "Sie treffen einen Kollegen in der Pause. Er meint, kurze Besprechungen seien oft produktiver als lange. Tauschen Sie Erfahrungen aus und gehen Sie auf Rückfragen ein.",
    problem:
      "Eine wichtige Kundenantwort ist liegen geblieben, weil zwei Teams die Zuständigkeit unterschiedlich verstanden haben. Vereinbaren Sie mit Ihrer Gesprächspartnerin eine Sofortmaßnahme und eine dauerhafte Verbesserung. Klären Sie Verantwortung, Frist und Kontrolle.",
  },
});
