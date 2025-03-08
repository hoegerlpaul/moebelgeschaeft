import Image from "next/image";

export default function UeberUns() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Über Uns</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Unsere Geschichte</h2>
          <p className="mb-4">
            Seit über 20 Jahren stehen wir für hochwertige, maßgefertigte Möbelstücke, die Stil und Funktionalität vereinen.
            Unser Ziel ist es, für jeden Kunden das perfekte Möbelstück zu erschaffen – individuell, nachhaltig und mit Liebe zum Detail.
          </p>

          
          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-md">
            <Image
              src="/tueren-fensterbau-moebel-tischlerei-berg-werkstatt-overath-bergisch-gladbach.jpg"
              alt="Unsere Werkstatt"
              layout="fill"
              objectFit="cover" // Bild füllt den Container aus
              className="rounded-md shadow-lg"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Unsere Philosophie</h2>
          <p className="mb-4">
            Nachhaltigkeit und Handwerkskunst stehen bei uns an erster Stelle. Wir setzen auf natürliche Materialien und eine
            präzise Verarbeitung, um Möbel zu schaffen, die Generationen überdauern.
          </p>

          
          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-md">
            <Image
              src="/happy-im-job.jpg"
              alt="Unser Team"
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-lg"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Unser Team</h2>
          <p className="mb-4">
            Unser kreatives und erfahrenes Team besteht aus talentierten Möbeldesignern, Schreinermeistern und Innenarchitekten,
            die mit Leidenschaft an jeder Kreation arbeiten.
          </p>

          
          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-md">
            <Image
              src="/csm_B-Group_Headerbilder_2023_Team_3d6845d845.jpg"
              alt="Unser Team"
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-lg"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Kontaktieren Sie uns</h2>
          <p className="mb-4">
            Haben Sie Fragen oder besondere Wünsche? Wir freuen uns auf Ihre Nachricht!
          </p>
          <a 
            href="/kontakt" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition"
          >
            Jetzt Kontakt aufnehmen
          </a>
        </div>
      </div>
    </main>
  );
}
