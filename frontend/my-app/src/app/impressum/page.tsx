export default function Impressum() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Impressum</h1>
        <p className="text-lg mb-4">Angaben gemäß § 5 TMG</p>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Möbelgeschäft GmbH</p>
          <p>Musterstraße 1</p>
          <p>12345 Musterstadt</p>
          <p className="mt-4">
            <strong>Vertreten durch:</strong><br />
            Max Mustermann (Geschäftsführer)
          </p>

          <p className="mt-4">
            <strong>Kontakt:</strong><br />
            E-Mail: <a href="mailto:info@moebelgeschaeft.de" className="text-blue-400 hover:underline">
              info@moebelgeschaeft.de
            </a>
          </p>

          <p className="mt-4">
            <strong>Registereintrag:</strong><br />
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht Musterstadt<br />
            Registernummer: HRB 12345
          </p>

          <p className="mt-4">
            <strong>Umsatzsteuer-ID:</strong><br />
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            DE123456789
          </p>

          <p className="mt-4">
            <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
            Max Mustermann<br />
            Musterstraße 1, 12345 Musterstadt
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Dieses Impressum gilt auch für unsere Social-Media-Profile auf Facebook, Instagram und Twitter.
        </p>
      </div>
    </main>
  );
}
