
// src/pages/admin/AdminReports.jsx

import { useEffect, useState } from "react";
import { getAllReports, closeReport } from "../../services/adminReportService";
import { Link } from "react-router-dom";

export default function AdminReports() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getAllReports();
    setReports(data);
  }

  async function handleClose(id) {
    await closeReport(id);
    load();
  }

  if (!reports) return <div className="p-6">Caricamento...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🚨 Gestione Segnalazioni</h1>

      <table className="table-auto w-full border shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Reporter</th>
            <th className="p-2 border">Segnalato</th>
            <th className="p-2 border">Descrizione</th>
            <th className="p-2 border">Stato</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Azioni</th>
          </tr>
        </thead>

        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td className="p-2 border">{r.id}</td>
              <td className="p-2 border">{r.reporterId}</td>
              <td className="p-2 border">{r.reportedUserId}</td>
              <td className="p-2 border">{r.description}</td>
              <td className="p-2 border">
                {r.status === "OPEN" ? "🟡 Aperto" : "🟢 Chiuso"}
              </td>
              <td className="p-2 border">
                {new Date(r.createdAt).toLocaleString()}
              </td>

              <td className="p-2 border">
                <Link 
                  to={`/admin/reports/${r.id}`}
                  className="px-2 py-1 bg-blue-200 rounded mr-2"
                >
                  Dettagli
                </Link>

                {r.status === "OPEN" && (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleClose(r.id)}
                  >
                    Chiudi
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}