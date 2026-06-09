
// src/pages/professional/ProfessionalDashboard.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { listContractsForProfessional } from "../../services/contractService";
import { Link } from "react-router-dom";

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (!user) return;

    listContractsForProfessional(user.id)
      .then(setContracts)
      .catch(() => setContracts([]));
  }, [user]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard Professionista</h1>

      {contracts.length === 0 && (
        <p className="text-gray-500">Nessun contratto presente.</p>
      )}

      <div className="space-y-3">
        {contracts.map((c) => (
          <Link
            key={c.id}
            to={`/professional/contracts/${c.id}`}
            className="block border p-4 rounded hover:bg-slate-50"
          >
            <div className="font-semibold">
              Contratto #{c.id} — Progetto {c.projectId}
            </div>
            <div className="text-sm text-gray-600">Stato: {c.status}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}