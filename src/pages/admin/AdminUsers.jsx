
// src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import { getAllUsers, suspendUser, unsuspendUser } from "../../services/adminUserService";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getAllUsers();
    setUsers(data);
  }

  async function suspend(id) {
    await suspendUser(id);
    load();
  }

  async function unsuspend(id) {
    await unsuspendUser(id);
    load();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">👤 Tutti gli Utenti</h1>

      <table className="table-auto w-full border shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Ruolo</th>
            <th className="p-2 border">Abilitato</th>
            <th className="p-2 border">Sospeso</th>
            <th className="p-2 border">Eventi</th>
            <th className="p-2 border">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.enabled ? "✔" : "❌"}</td>
              <td className="p-2 border">{u.suspended ? "❌ Sospeso" : "✔ Attivo"}</td>
              {/* COLONNA SEGNALAZIONI */}
              <td className="p-2 border">
                {u.role !== "ADMIN" && (
                  <>
                    <Link 
                      to={`/admin/users/${u.id}/reports`}
                      className="px-2 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                    >
                      ⚠️ Segnalazioni
                    </Link>

                    {' '}

                    <Link 
                      to={`/admin/users/${u.id}/feedback`}
                      className="px-2 py-1 bg-blue-300 rounded hover:bg-blue-400"
                    >
                      🗣️ Feedback
                    </Link>
                  </>
                )}
              </td>
              <td className="p-2 border">
                {u.role === "ADMIN" ? (
                  <span className="text-gray-400 italic"></span>
                ) : (
                  !u.suspended ? (
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => suspend(u.id)}
                  >
                    Sospendi
                  </button>
                  ) : (
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => unsuspend(u.id)}
                  >
                    Riattiva
                  </button>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}