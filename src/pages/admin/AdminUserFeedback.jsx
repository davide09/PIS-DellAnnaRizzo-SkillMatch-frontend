
// src/pages/admin/AdminUserFeedback.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserFeedback, getAllUsers } from "../../services/adminUserService";

export default function AdminUserFeedback() {
  const { id } = useParams(); // opzionale
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        // Caso 1: ho un id -> feedback per uno specifico utente
        if (id) {
          const data = await getUserFeedback(id);
          const withUser = data.map((f) => ({
            ...f,
            professionalId: id,
            professionalName: `Utente #${id}`,
          }));
          setFeedback(withUser);
        } else {
          // Caso 2: nessun id -> carico TUTTI i PROFESSIONAL e i loro feedback
          const users = await getAllUsers();
          const targets = users.filter(
            (u) => u.role !== "ADMIN"
          );

          const all = [];

          for (const u of targets) {
            const data = await getUserFeedback(u.id);
            data.forEach((f) =>
              all.push({
                ...f,
                professionalId: u.id,
                professionalName: u.name,
              })
            );
          }

          setFeedback(all);
        }
      } catch (err) {
        console.error(err);
        setFeedback([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <div className="p-6">Caricamento feedback...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        💬 Feedback
      </h1>

      {feedback.length === 0 && (
        <p className="text-sm text-slate-500">
          Nessun feedback presente.
        </p>
      )}

      {feedback.length > 0 && (
        <table className="table-auto w-full border shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Utente</th>
              <th className="p-2 border">Voto</th>
              <th className="p-2 border">Commento</th>
              <th className="p-2 border">Data</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((f) => (
              <tr key={f.id}>
                <td className="p-2 border">{f.id}</td>
                <td className="p-2 border">
                  #{f.professionalId} - {f.professionalName || "N/D"}
                </td>
                <td className="p-2 border">{f.rating}</td>
                <td className="p-2 border">
                  {f.comment || "(nessun commento)"}
                </td>
                <td className="p-2 border">
                  {f.createdAt
                    ? new Date(f.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}