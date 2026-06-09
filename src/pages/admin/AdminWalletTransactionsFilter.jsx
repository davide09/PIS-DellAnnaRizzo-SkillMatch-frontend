
// src/pages/admin/AdminWalletTransactionsFilter.jsx

import { useState } from "react";
import { filterTransactions } from "../../services/walletService";

export default function AdminWalletTransactionsFilter() {

  const [req, setReq] = useState({
    userId: "",
    type: "",
    fromDate: "",
    toDate: "",
    minAmount: "",
    maxAmount: ""
  });

  const [results, setResults] = useState([]);

  function update(name, value) {
    setReq(prev => ({ ...prev, [name]: value }));
  }

  async function applyFilter() {
    const cleanReq = {
      ...req,
      userId: req.userId || null,
      minAmount: req.minAmount || null,
      maxAmount: req.maxAmount || null,
      fromDate: req.fromDate || null,
      toDate: req.toDate || null
    };

    const data = await filterTransactions(cleanReq);
    setResults(data);
  }

  function resetFilter() {
    setReq({
      userId: "",
      type: "",
      fromDate: "",
      toDate: "",
      minAmount: "",
      maxAmount: ""
    });
    setResults([]); //svuota anche la tabella risultati
  }

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">🔍 Filtro Transazioni</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <input className="border p-2 rounded"
          placeholder="ID Utente"
          value={req.userId}
          onChange={e => update("userId", e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={req.type}
          onChange={e => update("type", e.target.value)}
        >
          <option value="">-- Tipo --</option>
          <option value="CREDIT">CREDIT</option>
          <option value="COMMISSION_FEE">COMMISSION_FEE</option>
        </select>

        <input type="datetime-local"
          className="border p-2 rounded"
          value={req.fromDate}
          onChange={e => update("fromDate", e.target.value)}
        />

        <input type="datetime-local"
          className="border p-2 rounded"
          value={req.toDate}
          onChange={e => update("toDate", e.target.value)}
        />

        <input className="border p-2 rounded"
          placeholder="Importo Min"
          type="number"
          value={req.minAmount}
          onChange={e => update("minAmount", e.target.value)}
        />

        <input className="border p-2 rounded"
          placeholder="Importo Max"
          type="number"
          value={req.maxAmount}
          onChange={e => update("maxAmount", e.target.value)}
        />

      </div>

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={applyFilter}
        >
          Applica Filtro
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={resetFilter}
        >
          Ripristina
        </button>
      </div>

      {results.length > 0 && (
        <table className="table-auto w-full border shadow text-sm mt-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Utente</th>
              <th className="p-2 border">Importo</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Data</th>
            </tr>
          </thead>

          <tbody>
            {results.map(tx => (
              <tr key={tx.id}>
                <td className="p-2 border">{tx.id}</td>
                <td className="p-2 border">{tx.walletId}</td>
                <td className="p-2 border">{tx.amount}</td>
                <td className="p-2 border">{tx.type}</td>
                <td className="p-2 border">{tx.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}