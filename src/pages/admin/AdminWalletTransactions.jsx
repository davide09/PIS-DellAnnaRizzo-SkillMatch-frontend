
// src/pages/admin/AdminWalletTransactions.jsx

import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/walletService";

export default function AdminWalletTransactions() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getAllTransactions();
    setTxs(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📄 Tutte le Transazioni Wallet</h1>

      <table className="table-auto w-full border shadow text-sm">
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
          {txs.map(tx => (
            <tr key={tx.id}>
              <td className="p-2 border">{tx.id}</td>
              <td className="p-2 border">{tx.walletId}</td>
              <td className="p-2 border">{tx.amount} €</td>
              <td className="p-2 border">{tx.type}</td>
              <td className="p-2 border">{tx.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}