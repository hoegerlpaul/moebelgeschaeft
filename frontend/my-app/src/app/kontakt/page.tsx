"use client"; 

import { useState } from "react";

export default function Kontakt() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Vielen Dank für Ihre Nachricht! Wir werden uns bald melden.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Kontakt</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg mb-4 text-center">
            Haben Sie Fragen? Kontaktieren Sie uns per E-Mail oder über das Formular.
          </p>

          <div className="text-center mb-6">
            <p><strong>E-Mail:</strong> <a href="mailto:kontakt@moebelgeschaeft.de" className="text-blue-400 hover:underline">kontakt@moebelgeschaeft.de</a></p>
            <p><strong>Telefon:</strong> 01234 / 567890</p>
          </div>

          {/* Kontaktformular */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ihr Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ihre E-Mail</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ihre Nachricht</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition"
            >
              Nachricht senden
            </button>
          </form>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Wir antworten in der Regel innerhalb von 24 Stunden.
        </p>
      </div>
    </main>
  );
}

  