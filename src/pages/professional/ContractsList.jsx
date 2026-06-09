
// src/pages/professional/ContractsList.jsx

import { useEffect, useState } from "react";
import { listContractsForProfessional } from "../../services/contractService";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function ProfessionalContractsList() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (!user) return;
    listContractsForProfessional(user.id).then(setContracts);
  }, [user]);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">I tuoi contratti</h1>

      {contracts.length === 0 && (
        <p className="text-slate-500">Non hai ancora contratti.</p>
      )}

      <div className="space-y-3">
        {contracts.map((c) => (
          <Link
            key={c.id}
            to={`/professional/contracts/${c.id}`}
            className="block border p-4 bg-white rounded shadow-sm hover:bg-slate-50"
          >
            <div className="flex justify-between">
              <span className="font-semibold">Contratto #{c.id}</span>
              <span className="text-sm text-slate-500">{c.status}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Progetto: {c.projectName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}