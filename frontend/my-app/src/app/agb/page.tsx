export default function AGB() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Allgemeine Geschäftsbedingungen (AGB)</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">1. Geltungsbereich</h2>
          <p className="mb-4">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die über unsere Website 
            getätigt werden. Abweichende Bedingungen des Kunden erkennen wir nicht an.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Vertragsabschluss</h2>
          <p className="mb-4">
            Der Kaufvertrag kommt zustande, wenn wir Ihre Bestellung durch eine Bestätigung per E-Mail annehmen.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. Preise und Zahlung</h2>
          <p className="mb-4">
            Alle Preise sind Endpreise und enthalten die gesetzliche Mehrwertsteuer. Zahlungen erfolgen per Vorkasse, 
            Kreditkarte oder PayPal.
          </p>

          <h2 className="text-2xl font-semibold mb-4">4. Lieferung</h2>
          <p className="mb-4">
            Die Lieferung erfolgt innerhalb Deutschlands innerhalb von 7-14 Werktagen, sofern nicht anders angegeben.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Widerrufsrecht</h2>
          <p className="mb-4">
            Kunden haben das Recht, binnen 14 Tagen nach Erhalt der Ware den Kaufvertrag ohne Angabe von Gründen zu 
            widerrufen. Die Rücksendekosten trägt der Kunde.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Gewährleistung</h2>
          <p className="mb-4">
            Es gelten die gesetzlichen Gewährleistungsrechte. Schäden, die durch unsachgemäße Nutzung entstanden sind, 
            sind davon ausgeschlossen.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. Schlussbestimmungen</h2>
          <p className="mb-4">
            Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, 
            bleibt der Vertrag im Übrigen wirksam.
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Stand: {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}

  