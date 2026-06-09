
// src/pages/admin/AdminUsersPending.jsx
import { useEffect, useState } from "react";
import { getPendingUsers, approveUser } from "../../services/adminUserService";

export default function AdminUsersPending() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getPendingUsers();
    setList(data);
  }

  async function approve(id) {
    await approveUser(id);
    load();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">⏳ Utenti in Attesa</h1>

      {list.length === 0 && <p>Nessun utente in attesa.</p>}

      <ul className="space-y-2">
        {list.map(u => (
          <li key={u.id} className="p-3 border rounded flex justify-between bg-white shadow">
            <div>
              <p><strong>{u.name}</strong></p>
              <p>{u.email}</p>
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => approve(u.id)}
            >
              Approva
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}