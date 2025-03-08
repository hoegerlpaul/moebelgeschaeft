"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';

async function fetchFurnitureDetails(id: string) {
  try {
    const res = await fetch(`http://localhost:3001/furniture/${id}`);
    if (!res.ok) {
      throw new Error("Fehler beim Laden der Möbel-Details");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function saveAsNewFurniture(data: any) {
  try {
    const res = await fetch(`http://localhost:3001/furniture/custom`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Fehler beim Speichern als neues Möbelstück");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateFurniture(id: string, data: any) {
  console.log("Sende Daten an Server:", data);
  try {
    const res = await fetch(`http://localhost:3001/furniture/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Fehler beim Aktualisieren des Möbelstücks");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default function FurnitureDetail() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id as string;
  const [furniture, setFurniture] = useState<any>(null);
  const [configurations, setConfigurations] = useState<Array<{key: string, value: string}>>([{ key: "", value: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    material: "",
    color: "",
    dimensions: { width: 0, height: 0, depth: 0 },
    price: 0,
    basePrice: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchFurnitureDetails(id).then((data) => {
        if (data) {
          setFurniture(data);
          setFormData({
            name: data.name || "",
            material: data.material || "",
            color: data.color || "",
            dimensions: data.dimensions || { width: 0, height: 0, depth: 0 },
            price: data.price || 0,
            basePrice: data.price || 0,
          });
          
          // Bestehende Konfigurationen laden, falls vorhanden
          if (data.configurations && Object.keys(data.configurations).length > 0) {
            const configEntries = Object.entries(data.configurations).map(
              ([key, value]) => ({ key, value: value as string })
            );
            setConfigurations(configEntries);
          }
        }
      });
    }
  }, [id]);

  if (!furniture) {
          return <p className="text-center text-gray-400">Möbel wird geladen...</p>;
  }

  // Berechnung des Preises basierend auf den Konfigurationen
  const calculatePrice = (data: any, selectedMaterial: string, selectedColor: string) => {
    let priceMultiplier = 1.0;
    
    // Material-basierte Preiserhöhungen
    switch (selectedMaterial) {
      case "Massivholz": priceMultiplier += 0.4; break;
      case "Edelstahl": priceMultiplier += 0.35; break;
      case "Glas": priceMultiplier += 0.3; break;
      case "Leder": priceMultiplier += 0.5; break;
      case "Aluminium": priceMultiplier += 0.25; break;
      case "Marmor": priceMultiplier += 0.6; break;
      case "Carbon": priceMultiplier += 0.7; break;
      default: priceMultiplier += 0.1; break;
    }
    
    // Farb-basierte Preiserhöhungen
    switch (selectedColor) {
      case "Mahagoni": priceMultiplier += 0.25; break;
      case "Nussbaum": priceMultiplier += 0.2; break;
      case "Kirsche": priceMultiplier += 0.15; break;
      case "Metallic": priceMultiplier += 0.3; break;
      case "Premium-Weiß": priceMultiplier += 0.15; break;
      case "Schwarz-Matt": priceMultiplier += 0.2; break;
      case "Vintage": priceMultiplier += 0.3; break;
      default: priceMultiplier += 0.05; break;
    }
    
    // Berechnung des neuen Preises
    return Math.round(data.basePrice * priceMultiplier);
  };

  // Änderungen in den Eingabefeldern speichern
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      
      // Wenn Material oder Farbe geändert wurde, berechne neuen Preis
      if (name === 'material' || name === 'color') {
        updatedData.price = calculatePrice(
          updatedData, 
          name === 'material' ? value : updatedData.material,
          name === 'color' ? value : updatedData.color
        );
      }
      
      return updatedData;
    });
  };

  // Änderungen in den Dimensionen speichern
  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: Number(value) },
    }));
  };

  // Neue Konfiguration hinzufügen
  const addConfiguration = () => {
    setConfigurations([...configurations, { key: "", value: "" }]);
  };

  // Speichern der Änderungen am bestehenden Möbelstück
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Konfigurationen filtern und in ein Objekt umwandeln
      const configurationsObj = Object.fromEntries(
        configurations
          .filter((config) => config.key.trim() && config.value.trim())
          .map((config) => [config.key, config.value])
      );
      
      // Alle Daten in einem einzigen Request senden
      const furnitureData = {
        name: formData.name,
        material: formData.material,
        color: formData.color,
        dimensions: formData.dimensions,
        price: Number(formData.price),
        configurations: configurationsObj // Konfigurationen zum Hauptobjekt hinzufügen
      };
      
      // Nur ein PATCH-Request an /furniture/:id
      const updatedFurniture = await updateFurniture(id, furnitureData);
      
      // Furniture-State mit den neuen Werten aktualisieren
      setFurniture(updatedFurniture);
      
      alert("Änderungen erfolgreich gespeichert!");
    } catch (error: any) {
      console.error("Fehler beim Speichern:", error);
      alert(`Fehler beim Speichern der Änderungen: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Als neues Möbelstück speichern
  const handleSaveAsNew = async () => {
    setLoading(true);
    try {
      const newFurnitureData = {
        originalId: furniture._id, // Speichert die Original-ID für Referenz
        name: formData.name.trim() + " (Konfiguriert)",
        material: formData.material,
        color: formData.color,
        dimensions: formData.dimensions,
        price: formData.price, // Preis wird bereits durch Konfigurationen berechnet
        stock: 1, // Da es sich um ein Unikat handelt, wird stock auf 1 gesetzt
        configurations: Object.fromEntries(
          configurations
            .filter((config) => config.key.trim() && config.value.trim())
            .map((config) => [config.key, config.value])
        ),
      };
  
      const newFurniture = await saveAsNewFurniture(newFurnitureData);
      alert("Neues konfiguriertes Möbelstück gespeichert!");
      router.push(`/furniture/${newFurniture._id}`); // Zur neuen Möbel-Detailseite wechseln
    } catch (error: any) {
      console.error("Fehler beim Speichern als neu:", error);
      alert(`Fehler beim Speichern als neues Möbelstück: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Konfigurationsaktualisierungen
  const handleConfigChange = (index: number, field: 'key' | 'value', value: string) => {
    const newConfigs = [...configurations];
    newConfigs[index][field] = value;
    setConfigurations(newConfigs);
  };

  return (
    <main className="w-full min-h-screen bg-gray-900 text-white p-6">
      <button onClick={() => router.push("/furniture")} className="text-blue-400 mb-4">Zurück zu allen Möbeln</button>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-80 h-80 bg-gray-700 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">📷 Bild von {furniture.name}</span>
        </div>

        <div className="w-full max-w-lg">
          <h1 className="text-4xl font-bold">{furniture.name}</h1>
          <p className="text-gray-400">Material: {furniture.material}</p>
          <p className="text-gray-400">Farbe: {furniture.color}</p>
          <p className="text-gray-400">Größe: {furniture.dimensions.width}cm x {furniture.dimensions.height}cm x {furniture.dimensions.depth}cm</p>
          <p className="text-gray-400">Lagerbestand: {furniture.stock} Stück</p>
          <p className="text-center py-3 px-4 border border-gray-600 inline-block rounded bg-gray-800 text-xl font-light mt-2">{furniture.price.toFixed(2)}€</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Konfiguration anpassen</h2>

            <label className="block mt-4">Name:</label>
            <div className="text-xs text-gray-400 mb-1">(bspw. Meine Konfiguration 1)</div>
            <input className="p-2 w-full bg-gray-800 text-white rounded" type="text" name="name" value={formData.name} onChange={handleInputChange} />

            <label className="block mt-4">Farbe:</label>
            <select className="p-2 w-full bg-gray-800 text-white rounded" name="color" value={formData.color} onChange={handleInputChange}>
              <option value="Schwarz">Schwarz</option>
              <option value="Schwarz-Matt">Schwarz-Matt</option>
              <option value="Weiß">Weiß</option>
              <option value="Premium-Weiß">Premium-Weiß</option>
              <option value="Eiche">Eiche</option>
              <option value="Kirsche">Kirsche</option>
              <option value="Mahagoni">Mahagoni</option>
              <option value="Nussbaum">Nussbaum</option>
              <option value="Buche">Buche</option>
              <option value="Grau">Grau</option>
              <option value="Silber">Silber</option>
              <option value="Metallic">Metallic</option>
              <option value="Blau">Blau</option>
              <option value="Marineblau">Marineblau</option>
              <option value="Grün">Grün</option>
              <option value="Olivgrün">Olivgrün</option>
              <option value="Rot">Rot</option>
              <option value="Vintage">Vintage</option>
              <option value="Antik">Antik</option>
              <option value="Natur">Natur</option>
            </select>

            <label className="block mt-4">Material:</label>
            <select className="p-2 w-full bg-gray-800 text-white rounded" name="material" value={formData.material} onChange={handleInputChange}>
              <option value="Holz">Holz</option>
              <option value="Massivholz">Massivholz</option>
              <option value="Eichenholz">Eichenholz</option>
              <option value="Buchenholz">Buchenholz</option>
              <option value="Kirschholz">Kirschholz</option>
              <option value="MDF">MDF</option>
              <option value="Spanplatte">Spanplatte</option>
              <option value="Metall">Metall</option>
              <option value="Aluminium">Aluminium</option>
              <option value="Edelstahl">Edelstahl</option>
              <option value="Gebürstetes Metall">Gebürstetes Metall</option>
              <option value="Glas">Glas</option>
              <option value="Sicherheitsglas">Sicherheitsglas</option>
              <option value="Milchglas">Milchglas</option>
              <option value="Kunststoff">Kunststoff</option>
              <option value="Hochwertige Kunststoffmischung">Hochwertige Kunststoffmischung</option>
              <option value="Leder">Leder</option>
              <option value="Premium-Leder">Premium-Leder</option>
              <option value="Stoff">Stoff</option>
              <option value="Canvas">Canvas</option>
              <option value="Samt">Samt</option>
              <option value="Marmor">Marmor</option>
              <option value="Carbon">Carbon</option>
            </select>

            <label className="block mt-4">Preis (€):</label>
            <div className="flex items-center gap-3">
              <input className="p-2 w-full bg-gray-800 text-white rounded opacity-80" type="number" value={formData.price} disabled />
              <span className="text-sm text-gray-400">Wird automatisch berechnet</span>
            </div>
            <div className="mt-1 text-xs text-gray-400">
              Grundpreis: {formData.basePrice.toFixed(2)}€ • Aufschlag: {(formData.price - formData.basePrice).toFixed(2)}€
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <label className="block">Breite (cm):</label>
                <input className="p-2 w-full bg-gray-800 text-white rounded" type="number" name="width" value={formData.dimensions.width} onChange={handleDimensionChange} />
              </div>
              <div>
                <label className="block">Höhe (cm):</label>
                <input className="p-2 w-full bg-gray-800 text-white rounded" type="number" name="height" value={formData.dimensions.height} onChange={handleDimensionChange} />
              </div>
              <div>
                <label className="block">Tiefe (cm):</label>
                <input className="p-2 w-full bg-gray-800 text-white rounded" type="number" name="depth" value={formData.dimensions.depth} onChange={handleDimensionChange} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold mt-6">Zusätzliche Konfigurationen</h3>
              <span className="text-xs text-gray-400 mt-6">(wir geben unser bestes ohne Gewähr)</span>
            </div>
            {configurations.map((config, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input 
                  type="text" 
                  placeholder="Eigenschaft" 
                  className="p-2 bg-gray-800 text-white rounded w-1/2" 
                  value={config.key} 
                  onChange={(e) => handleConfigChange(index, 'key', e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Wert" 
                  className="p-2 bg-gray-800 text-white rounded w-1/2" 
                  value={config.value} 
                  onChange={(e) => handleConfigChange(index, 'value', e.target.value)} 
                />
              </div>
            ))}
            <button onClick={addConfiguration} className="mt-2 px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
              + Neue Konfiguration hinzufügen
            </button>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button 
                onClick={handleSaveAsNew} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-blue-100 rounded w-full"
                disabled={loading}
              >
                {loading ? "Wird gespeichert..." : "Als neues Möbelstück speichern"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


