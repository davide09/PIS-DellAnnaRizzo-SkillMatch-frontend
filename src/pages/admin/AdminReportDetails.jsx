
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportById, closeReport } from "../../services/adminReportService";

export default function AdminReportDetails() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getReportById(id);
    setReport(data);
  }

  async function handleClose() {
    await closeReport(id);
    load();
  }

  if (!report) return <div className="p-6">Caricamento...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📝 Dettagli Segnalazione #{id}</h1>

      <div className="border shadow p-4 bg-white rounded">
        <p className="mb-2"><strong>ID:</strong> {report.id}</p>
        <p className="mb-2"><strong>Reporter (Segnalante):</strong> {report.reporterId}</p>
        <p className="mb-2"><strong>Segnalato:</strong> {report.reportedUserId}</p>
        <p className="mb-2"><strong>Stato:</strong> {report.status}</p>
        <p className="mb-2"><strong>Descrizione:</strong> {report.description}</p>
        <p className="mb-2"><strong>Data:</strong> {new Date(report.createdAt).toLocaleString()}</p>

        {report.status === "OPEN" && (
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
          >
            Chiudi Segnalazione
          </button>
        )}
      </div>
    </div>
  );
}