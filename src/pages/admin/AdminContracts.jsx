
// src/pages/admin/AdminContracts.jsx

import { useEffect, useState } from "react";
import { getAllContracts } from "../../services/adminContractService";

export default function AdminContracts() {

  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getAllContracts();
    setContracts(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📑 Contratti</h1>

      <table className="table-auto w-full border shadow text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Progetto</th>
            <th className="p-2 border">Azienda</th>
            <th className="p-2 border">Professionista</th>
            <th className="p-2 border">Prezzo</th>
            <th className="p-2 border">Commissione</th>
            <th className="p-2 border">Stato</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map(c => (
            <tr key={c.id}>
              <td className="p-2 border">{c.id}</td>
              <td className="p-2 border">{c.projectName}</td>
              <td className="p-2 border">{c.companyId}</td>
              <td className="p-2 border">{c.professionalId}</td>
              <td className="p-2 border">{c.price} €</td>
              <td className="p-2 border">{c.commissionFee} €</td>
              <td className="p-2 border">{c.status}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}