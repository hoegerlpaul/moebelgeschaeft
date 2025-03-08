"use client";

async function getUsers() {
    const res = await fetch("http://localhost:3001/users", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Fehler beim Laden der Benutzer");
    }
    return res.json();
  }
  
  export default async function UsersPage() {
    const users = await getUsers();
  
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Benutzerliste</h1>
        <ul className="mt-4 space-y-2">
          {users.map((user: { _id: string; name: string; email: string }) => (
            <li key={user._id} className="p-2 bg-gray-100 rounded-md">
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </main>
    );
  }
  