"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ _id: string; name: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:3001/users", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Benutzer");
        }
        const data = await res.json();
        setUsers(data);

        // Falls Benutzer existieren, setze den ersten als Standard
        if (data.length > 0) {
          setSelectedUser(data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Dropdown-Menü für Benutzer */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center transition hover:bg-gray-700"
          >
            {selectedUser ? selectedUser.name : "👤 Benutzer wählen"}
            <span className="ml-2">▼</span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md overflow-hidden">
              {users.length > 0 ? (
                users.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left transition"
                  >
                    {user.name}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-400">Keine Benutzer gefunden</p>
              )}
            </div>
          )}
        </div>

        {/* Navigationslinks */}
        <ul className="flex space-x-8 text-lg">
          <li>
            <Link
              href="/"
              className="relative hover:text-gray-400 transition duration-300 before:block before:absolute before:h-0.5 before:bg-blue-500 before:w-0 before:bottom-0 before:left-0 before:transition-all before:duration-300 hover:before:w-full"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/furniture"
              className="relative hover:text-gray-400 transition duration-300 before:block before:absolute before:h-0.5 before:bg-blue-500 before:w-0 before:bottom-0 before:left-0 before:transition-all before:duration-300 hover:before:w-full"
            >
              Möbel
            </Link>
          </li>
          <li>
            <Link
              href="/ueber-uns"
              className="relative hover:text-gray-400 transition duration-300 before:block before:absolute before:h-0.5 before:bg-blue-500 before:w-0 before:bottom-0 before:left-0 before:transition-all before:duration-300 hover:before:w-full"
            >
              Über Uns
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


