"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchData(endpoint: string) {
  try {
    const res = await fetch(`http://localhost:3001/${endpoint}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Fehler beim Laden von ${endpoint}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`API-Fehler: ${err}`);
    return [];
  }
}

export default function Home() {
  const [users, setUsers] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDataAll() {
      setLoading(true);
      try {
        // Benutzer abrufen
        const usersData = await fetchData("users");
        setUsers(usersData);
        
        // Möbel abrufen
        const furnitureData = await fetchData("furniture");
        setFurniture(furnitureData);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDataAll();
  }, []);

  return (
    <main className="w-full min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Konfiguriere <span className="text-blue-400">HEUTE</span> dein neues Lieblings-Möbelstück
      </h1>

      {/* Ladeindikator */}
      {loading && <p className="text-center text-gray-400">Daten werden geladen...</p>}

      {/* Möbelstücke */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Unsere Basis-Möbelstücke</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {furniture.length > 0 ? (
            furniture.map((item: { 
              _id: string; 
              name: string; 
              material: string; 
              price: number; 
              color: string;
              dimensions?: { width: number; height: number; depth: number };
              stock?: number;
            }) => (
              <Link key={item._id} href={`/furniture/${item._id}`} className="block">
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-750 transition-all duration-300 border border-gray-700">
                  {/* Bild-Platzhalter */}
                  <div className="w-full h-40 bg-gray-700 flex items-center justify-center rounded-lg mb-4">
                    <span className="text-gray-400">Bild von {item.name}</span>
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
            <p className="text-gray-400">Keine Möbel gefunden.</p>
          )}
        </div>
      </section>
    </main>
  );
}

