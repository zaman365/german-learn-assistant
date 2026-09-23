import { lexicalSchema, type LexicalEntry } from "../src/content/types";

// Each row is explicitly authored. The compact storage format is expanded and validated before publication.
const nouns = `
firma|Firma|die|Firmen|company|FIR-ma|bei einer Firma arbeiten|Die Firma entwickelt Software.|The company develops software.
vertrag|Vertrag|der|Verträge|contract|Ver-TRAG|einen Vertrag unterschreiben|Wir unterschreiben den Vertrag morgen.|We will sign the contract tomorrow.
angebot|Angebot|das|Angebote|offer; quotation|AN-ge-bot|ein Angebot prüfen|Bitte prüfen Sie unser Angebot.|Please review our offer.
lieferung|Lieferung|die|Lieferungen|delivery|LIE-fe-rung|eine Lieferung erhalten|Die Lieferung trifft am Montag ein.|The delivery arrives on Monday.
rechnung|Rechnung|die|Rechnungen|invoice|RECH-nung|eine Rechnung bezahlen|Die Rechnung ist noch offen.|The invoice is still outstanding.
kunde|Kunde|der|Kunden|customer (masculine noun)|KUN-de|einen Kunden beraten|Wir schicken dem Kunden eine Bestätigung.|We send the customer a confirmation.
ergebnis|Ergebnis|das|Ergebnisse|result|Er-GEB-nis|ein Ergebnis auswerten|Das Ergebnis bestätigt unsere Annahme.|The result confirms our assumption.
termin|Termin|der|Termine|appointment; scheduled date|Ter-MIN|einen Termin vereinbaren|Können wir den Termin verschieben?|Can we postpone the appointment?
kollege|Kollege|der|Kollegen|colleague (masculine noun)|Kol-LE-ge|mit einem Kollegen sprechen|Ich bespreche den Entwurf mit einem Kollegen.|I discuss the draft with a colleague.
team|Team|das|Teams|team|TEAM|ein Team leiten|Zwei Teams arbeiten an dem Projekt.|Two teams are working on the project.
mitarbeiter|Mitarbeiter|der|Mitarbeiter|employee (masculine noun)|MIT-ar-bei-ter|Mitarbeiter einarbeiten|Der neue Mitarbeiter beginnt am Dienstag.|The new employee starts on Tuesday.
projekt|Projekt|das|Projekte|project|Pro-JEKT|ein Projekt abschließen|Wir schließen das Projekt im Mai ab.|We will finish the project in May.
konto|Konto|das|Konten|account|KON-to|ein Konto eröffnen|Die Zahlung ist auf unserem Konto eingegangen.|The payment has arrived in our account.
service|Service|der|Services|service; customer care|SER-vice|guten Service bieten|Guter Service schafft Vertrauen.|Good service creates trust.
qualitat|Qualität|die|Qualitäten|quality|Qua-li-TÄT|die Qualität sichern|Wir prüfen die Qualität jeder Lieferung.|We check the quality of every delivery.
material|Material|das|Materialien|material|Ma-te-ri-AL|geeignetes Material auswählen|Das Material ist besonders robust.|The material is especially robust.
plan|Plan|der|Pläne|plan|PLAN|einen Plan erstellen|Unser Plan berücksichtigt die Risiken.|Our plan takes the risks into account.
meeting|Meeting|das|Meetings|meeting|MEE-ting|ein Meeting vorbereiten|Das Meeting beginnt um neun Uhr.|The meeting starts at nine.
frist|Frist|die|Fristen|deadline; time limit|FRIST|eine Frist einhalten|Bitte halten Sie die vereinbarte Frist ein.|Please meet the agreed deadline.
antwort|Antwort|die|Antworten|answer; response|ANT-wort|auf eine Antwort warten|Vielen Dank für Ihre schnelle Antwort.|Thank you for your quick response.
buro|Büro|das|Büros|office|Bü-RO|ins Büro gehen|Die Unterlagen liegen im Büro.|The documents are in the office.
besprechung|Besprechung|die|Besprechungen|meeting; discussion|Be-SPRE-chung|an einer Besprechung teilnehmen|Die Besprechung findet online statt.|The meeting takes place online.
unternehmen|Unternehmen|das|Unternehmen|company; enterprise|Un-ter-NEH-men|ein Unternehmen gründen|Das Unternehmen beschäftigt zwanzig Personen.|The company employs twenty people.
wochenende|Wochenende|das|Wochenenden|weekend|WO-chen-en-de|über das Wochenende|Die Unterlagen bleiben über das Wochenende hier.|The documents stay here over the weekend.
verzogerung|Verzögerung|die|Verzögerungen|delay|Ver-ZÖ-ge-rung|eine Verzögerung bedauern|Wir bedauern die Verzögerung.|We regret the delay.
ruckmeldung|Rückmeldung|die|Rückmeldungen|feedback; reply|RÜCK-mel-dung|um Rückmeldung bitten|Wir bitten um Rückmeldung bis Freitag.|We request a reply by Friday.
freigabe|Freigabe|die|Freigaben|approval; release|FREI-ga-be|eine Freigabe erteilen|Die Freigabe steht noch aus.|Approval is still pending.
unterlage|Unterlage|die|Unterlagen|document; supporting material|UN-ter-la-ge|Unterlagen einreichen|Bitte reichen Sie die Unterlagen vollständig ein.|Please submit all documents.
entwurf|Entwurf|der|Entwürfe|draft; design|Ent-WURF|einen Entwurf überarbeiten|Der Entwurf enthält zwei Varianten.|The draft contains two alternatives.
anforderung|Anforderung|die|Anforderungen|requirement|AN-for-de-rung|Anforderungen erfüllen|Die Lösung erfüllt alle Anforderungen.|The solution meets all requirements.
losung|Lösung|die|Lösungen|solution|LÖ-sung|eine Lösung vorschlagen|Wir suchen eine langfristige Lösung.|We are looking for a long-term solution.
aufgabe|Aufgabe|die|Aufgaben|task|AUF-ga-be|eine Aufgabe übernehmen|Wer übernimmt diese Aufgabe?|Who will take on this task?
verantwortung|Verantwortung|die|Verantwortungen (uncommon)|responsibility|Ver-ANT-wor-tung|Verantwortung übernehmen|Sie übernimmt die Verantwortung für den Versand.|She takes responsibility for shipping.
vorschlag|Vorschlag|der|Vorschläge|suggestion; proposal|VOR-schlag|einen Vorschlag machen|Ihr Vorschlag klingt überzeugend.|Your proposal sounds convincing.
entscheidung|Entscheidung|die|Entscheidungen|decision|Ent-SCHEI-dung|eine Entscheidung treffen|Wir treffen die Entscheidung gemeinsam.|We make the decision together.
grund|Grund|der|Gründe|reason|GRUND|einen Grund nennen|Bitte nennen Sie den Grund für die Änderung.|Please state the reason for the change.
anderung|Änderung|die|Änderungen|change; modification|ÄN-de-rung|eine Änderung vornehmen|Die Änderung betrifft nur den Zeitplan.|The change affects only the schedule.
risiko|Risiko|das|Risiken|risk|RI-si-ko|ein Risiko bewerten|Das Risiko lässt sich reduzieren.|The risk can be reduced.
vorteil|Vorteil|der|Vorteile|advantage|VOR-teil|Vorteile abwägen|Ein Vorteil ist die kürzere Lieferzeit.|One advantage is the shorter delivery time.
nachteil|Nachteil|der|Nachteile|disadvantage|NACH-teil|einen Nachteil berücksichtigen|Der höhere Preis ist ein Nachteil.|The higher price is a disadvantage.
prozess|Prozess|der|Prozesse|process|Pro-ZESS|einen Prozess verbessern|Der neue Prozess spart Zeit.|The new process saves time.
ablauf|Ablauf|der|Abläufe|procedure; sequence|AB-lauf|einen Ablauf erklären|Ich erkläre Ihnen den weiteren Ablauf.|I will explain the next steps.
auftrag|Auftrag|der|Aufträge|order; assignment|AUF-trag|einen Auftrag bestätigen|Wir bestätigen Ihren Auftrag schriftlich.|We confirm your order in writing.
bestellung|Bestellung|die|Bestellungen|order (purchase)|Be-STEL-lung|eine Bestellung aufgeben|Ihre Bestellung wird heute bearbeitet.|Your order is being processed today.
beschwerde|Beschwerde|die|Beschwerden|complaint|Be-SCHWER-de|eine Beschwerde bearbeiten|Wir nehmen Ihre Beschwerde ernst.|We take your complaint seriously.
preis|Preis|der|Preise|price|PREIS|einen Preis vergleichen|Der Preis versteht sich ohne Versandkosten.|The price excludes shipping costs.
kosten|Kosten|die|plural only|costs|KOS-ten|Kosten senken|Die Kosten sind um zehn Prozent gestiegen.|Costs have risen by ten percent.
budget|Budget|das|Budgets|budget|Bud-GET|ein Budget einhalten|Das Budget reicht für zwei weitere Tests.|The budget covers two more tests.
umsatz|Umsatz|der|Umsätze|revenue; turnover|UM-satz|den Umsatz steigern|Der Umsatz ist deutlich gestiegen.|Revenue has risen considerably.
gewinn|Gewinn|der|Gewinne|profit; gain|Ge-WINN|einen Gewinn erzielen|Das Unternehmen erzielt einen kleinen Gewinn.|The company makes a small profit.
ziel|Ziel|das|Ziele|goal; target|ZIEL|ein Ziel erreichen|Unser Ziel ist eine zuverlässige Lieferung.|Our goal is reliable delivery.
erfahrung|Erfahrung|die|Erfahrungen|experience|Er-FAH-rung|Erfahrung sammeln|Ich habe Erfahrung in der Softwareentwicklung.|I have experience in software development.
kenntnis|Kenntnis|die|Kenntnisse|knowledge; skill|KENNT-nis|Kenntnisse vertiefen|Sie verfügt über gute Deutschkenntnisse.|She has good German language skills.
moglichkeit|Möglichkeit|die|Möglichkeiten|possibility; option|MÖG-lich-keit|eine Möglichkeit prüfen|Wir prüfen alle Möglichkeiten.|We are considering all options.
sicherheit|Sicherheit|die|Sicherheiten (context-dependent)|safety; security; certainty|SI-cher-heit|Sicherheit gewährleisten|Sicherheit hat bei uns Vorrang.|Safety takes priority here.
belegschaft|Belegschaft|die|Belegschaften|workforce|Be-LEG-schaft|die Belegschaft informieren|Die Belegschaft wurde rechtzeitig informiert.|The workforce was informed in good time.
schulung|Schulung|die|Schulungen|training session|SCHU-lung|eine Schulung besuchen|Die Schulung richtet sich an neue Mitarbeitende.|The training is aimed at new employees.
bewerbung|Bewerbung|die|Bewerbungen|job application|Be-WER-bung|eine Bewerbung einreichen|Vielen Dank für Ihre Bewerbung.|Thank you for your application.
stelle|Stelle|die|Stellen|position; job vacancy|STEL-le|sich um eine Stelle bewerben|Die Stelle ist ab sofort zu besetzen.|The position is available immediately.
fuhrungskraft|Führungskraft|die|Führungskräfte|manager; leader|FÜH-rungs-kraft|eine Führungskraft unterstützen|Eine gute Führungskraft hört aufmerksam zu.|A good leader listens carefully.
`.trim();
const verbs = `
schicken|schicken|send|SCHI-cken|schickte · hat geschickt; jemandem etwas schicken|ein Angebot schicken|Wir schicken Ihnen das Angebot heute.|We will send you the offer today.
bestatigen|bestätigen|confirm|be-STÄ-ti-gen|bestätigte · hat bestätigt; etwas bestätigen|einen Termin bestätigen|Bitte bestätigen Sie den Termin.|Please confirm the appointment.
verschieben|verschieben|postpone; move|ver-SCHIE-ben|verschob · hat verschoben; etwas verschieben|eine Besprechung verschieben|Wir müssen die Besprechung verschieben.|We need to postpone the meeting.
prufen|prüfen|check; examine|PRÜ-fen|prüfte · hat geprüft; etwas prüfen|eine Rechnung prüfen|Ich prüfe die Rechnung sorgfältig.|I check the invoice carefully.
teilnehmen|teilnehmen|participate|TEIL-neh-men|nahm teil · hat teilgenommen; separable; an + dative|an einer Schulung teilnehmen|Sie nimmt an der Schulung teil.|She participates in the training.
warten|warten|wait|WAR-ten|wartete · hat gewartet; auf + accusative|auf eine Antwort warten|Wir warten auf Ihre Rückmeldung.|We are waiting for your response.
bewerben|sich bewerben|apply (for a job)|be-WER-ben|bewarb sich · hat sich beworben; reflexive; um + accusative, bei + dative|sich um eine Stelle bewerben|Ich bewerbe mich um die ausgeschriebene Stelle.|I am applying for the advertised position.
vereinbaren|vereinbaren|agree; arrange|ver-EIN-ba-ren|vereinbarte · hat vereinbart; etwas mit jemandem vereinbaren|einen Termin vereinbaren|Wir haben einen neuen Termin vereinbart.|We have arranged a new appointment.
bedauern|bedauern|regret|be-DAU-ern|bedauerte · hat bedauert; etwas bedauern|eine Verzögerung bedauern|Wir bedauern die entstandenen Unannehmlichkeiten.|We regret the inconvenience caused.
empfehlen|empfehlen|recommend|emp-FEH-len|empfahl · hat empfohlen; jemandem etwas empfehlen|eine Lösung empfehlen|Welche Lösung empfehlen Sie uns?|Which solution do you recommend to us?
vermeiden|vermeiden|avoid|ver-MEI-den|vermied · hat vermieden; etwas vermeiden|Missverständnisse vermeiden|Eine klare Absprache vermeidet Missverständnisse.|A clear agreement prevents misunderstandings.
berucksichtigen|berücksichtigen|take into account|be-RÜCK-sich-ti-gen|berücksichtigte · hat berücksichtigt; etwas berücksichtigen|Risiken berücksichtigen|Wir berücksichtigen Ihre Wünsche.|We take your wishes into account.
ubernehmen|übernehmen|take over; assume|über-NEH-men|übernahm · hat übernommen; inseparable; etwas übernehmen|Verantwortung übernehmen|Ich übernehme die Abstimmung mit dem Kunden.|I will take responsibility for coordination with the customer.
einhalten|einhalten|comply with; meet|EIN-hal-ten|hielt ein · hat eingehalten; separable; etwas einhalten|eine Frist einhalten|Wir können die Frist einhalten.|We can meet the deadline.
erhalten|erhalten|receive; preserve|er-HAL-ten|erhielt · hat erhalten; etwas erhalten|eine Bestätigung erhalten|Sie erhalten morgen eine Bestätigung.|You will receive a confirmation tomorrow.
`.trim();
const adjectives = `
verbindlich|verbindlich|binding; definite|ver-BIND-lich|ein verbindliches Angebot|Wir benötigen eine verbindliche Zusage.|We need a firm commitment.
zuverlassig|zuverlässig|reliable|zu-ver-LÄS-sig|eine zuverlässige Lieferung|Unsere Partnerin arbeitet zuverlässig.|Our partner works reliably.
voraussichtlich|voraussichtlich|expected; probably|vo-RAUS-sicht-lich|der voraussichtliche Termin|Die Ware kommt voraussichtlich am Freitag.|The goods are expected to arrive on Friday.
geeignet|geeignet|suitable|ge-EIG-net|für die Aufgabe geeignet|Das Material ist für diesen Zweck geeignet.|The material is suitable for this purpose.
zustandig|zuständig|responsible (assigned remit)|ZU-stän-dig|für den Versand zuständig|Wer ist für den Versand zuständig?|Who is responsible for shipping?
`.trim();
export const vocabulary: LexicalEntry[] = [
  ...nouns.split("\n").map((line) => {
    const [
      id,
      word,
      article,
      plural,
      meaning,
      stress,
      phrase,
      example,
      translation,
    ] = line.split("|");
    return lexicalSchema.parse({
      id,
      word,
      type: "noun",
      article,
      plural,
      meaning,
      stress,
      phrase,
      example,
      translation,
      register: "neutral / professional",
    });
  }),
  ...verbs.split("\n").map((line) => {
    const [id, word, meaning, stress, forms, phrase, example, translation] =
      line.split("|");
    return lexicalSchema.parse({
      id,
      word,
      type: "verb",
      meaning,
      stress,
      forms,
      phrase,
      example,
      translation,
      register: "neutral / professional",
    });
  }),
  ...adjectives.split("\n").map((line) => {
    const [id, word, meaning, stress, phrase, example, translation] =
      line.split("|");
    return lexicalSchema.parse({
      id,
      word,
      type: "adjective",
      meaning,
      stress,
      phrase,
      example,
      translation,
      register: "neutral / professional",
    });
  }),
];
