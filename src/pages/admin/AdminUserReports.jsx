
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserReports, closeReport, closeAllReportsForUser } from "../../services/adminReportService";

export default function AdminUserReports() {
  const { id } = useParams();   // id dell’utente segnalato
  const [reports, setReports] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getUserReports(id);
    setReports(data);
  }

  async function handleClose(reportId) {
    await closeReport(reportId);
    load();
  }

  async function handleCloseAll() {
    await closeAllReportsForUser(id);
    load();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        ⚠️ Segnalazioni di #{id}
      </h1>

      <div className="mb-4">
        <button
          onClick={handleCloseAll}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Chiudi TUTTE le Segnalazioni
        </button>
      </div>

      <table className="table-auto w-full border shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Reporter</th>
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
              <td className="p-2 border">{r.description}</td>
              <td className="p-2 border">
                {r.status === "OPEN" ? "🟡 Aperto" : "🟢 Chiuso"}
              </td>
              <td className="p-2 border">
                {new Date(r.createdAt).toLocaleString()}
              </td>

              <td className="p-2 border">
                {r.status === "OPEN" && (
                  <button
                    onClick={() => handleClose(r.id)}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
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