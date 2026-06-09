
// src/pages/company/ContractsList.jsx

import { useEffect, useState } from "react";
import { listContractsForCompany } from "../../services/contractService";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function ContractsList() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (!user) return;
    listContractsForCompany(user.id).then(setContracts);
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Contratti</h1>

      {contracts.length === 0 && (
        <p className="text-slate-500">Nessun contratto generato.</p>
      )}

      <div className="space-y-3">
        {contracts.map((c) => (
          <Link
            key={c.id}
            to={`/company/contracts/${c.id}`}
            className="block border bg-white p-4 rounded shadow-sm hover:bg-slate-50"
          >
            <div className="flex justify-between">
              <span className="font-semibold">Contratto #{c.id}</span>
              <span className="text-sm text-slate-500">{c.status}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Progetto: {c.projectName}
            </p>
            <p className="text-xs text-slate-500">
              Professionista: {c.professionalId}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}