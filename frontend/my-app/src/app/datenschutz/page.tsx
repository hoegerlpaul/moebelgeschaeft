export default function Datenschutz() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Datenschutzerklärung</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">1. Allgemeine Hinweise</h2>
          <p className="mb-4">
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten
            ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TMG).
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Verantwortliche Stelle</h2>
          <p className="mb-4">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            Möbelgeschäft GmbH<br />
            Musterstraße 1, 12345 Musterstadt<br />
            E-Mail: info@moebelgeschaeft.de
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. Erhebung und Verarbeitung personenbezogener Daten</h2>
          <p className="mb-4">
            Wir erheben und speichern automatisch Informationen, die Ihr Browser an uns übermittelt. Dazu gehören:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit der Anfrage</li>
            <li>Browsertyp und Betriebssystem</li>
            <li>Besuchte Seiten</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">4. Ihre Rechte</h2>
          <p className="mb-4">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten.
            Außerdem steht Ihnen ein Widerspruchsrecht gegen die Verarbeitung sowie das Recht auf Datenübertragbarkeit zu.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Kontakt für Datenschutz-Anfragen</h2>
          <p className="mb-4">
            Wenn Sie Fragen zum Datenschutz haben, kontaktieren Sie uns unter:<br />
            E-Mail: <a href="mailto:datenschutz@moebelgeschaeft.de" className="text-blue-400 hover:underline">
              datenschutz@moebelgeschaeft.de
            </a>
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Stand: {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
