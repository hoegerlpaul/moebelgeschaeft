"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchFurniture() {
  try {
    const res = await fetch("http://localhost:3001/furniture", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Fehler beim Laden der Möbel-Daten");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function Moebel() {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFurniture().then((data) => {
      setFurniture(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="w-full min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Alle <span className="text-blue-400">Möbelstücke</span> im Überblick
      </h1>

      <div className="text-center mb-8">
        <Link href="/" className="text-blue-400 hover:underline">⬅ Zurück zur Startseite</Link>
      </div>

      {/* Ladeindikator */}
      {loading && <p className="text-center text-gray-400">Möbel werden geladen...</p>}

      {/* Möbel-Liste */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {furniture.length > 0 ? (
          furniture.map((item: { 
            _id: string; 
            name: string; 
            material: string; 
            price: number; 
            color: string;
            dimensions?: { width: number; height: number; depth: number };
            stock?: number;
            images?: string[];
          }) => (
            <Link key={item._id} href={`/furniture/${item._id}`} className="block">
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-750 transition-all duration-300 border border-gray-700">
                {/* Bild - Jetzt prüfen wir, ob Bilder vorhanden sind */}
                <div className="w-full h-40 bg-gray-700 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img 
                      src={item.images[0]} 
                      alt={`Bild von ${item.name}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">📷 Bild von {item.name}</span>
                  )}
                </div>
                
                {/* Name */}
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>

                {/* Eigenschaften */}
                <div className="space-y-1 text-sm text-gray-300 mb-3">
                  <p><span className="text-gray-400">Material:</span> {item.material}</p>
                  <p><span className="text-gray-400">Farbe:</span> {item.color}</p>
                  <p><span className="text-gray-400">Maße:</span> {item.dimensions?.width || 0}×{item.dimensions?.height || 0}×{item.dimensions?.depth || 0} cm</p>
                  <p><span className="text-gray-400">Verfügbar:</span> {item.stock || 0} Stück</p>
                </div>

                {/* Preis */}
                <div className="text-center mt-4">
                  <span className="py-2 px-4 border border-gray-600 inline-block rounded bg-gray-800 text-gray-200 font-light">
                    {item.price.toFixed(2)}€
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3">Keine Möbel gefunden.</p>
        )}
      </section>
    </main>
  );
}
