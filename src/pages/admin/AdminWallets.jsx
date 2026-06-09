
// src/pages/admin/AdminWallets.jsx

import { useEffect, useState } from "react";
import { getAllWallets, adminResetWallet, adminDeleteWallet } from "../../services/walletService";

export default function AdminWallets() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getAllWallets();
    setWallets(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">💰 Wallet degli Utenti</h1>

      <table className="table-auto w-full border shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID Utente</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Azioni</th>
          </tr>
        </thead>

        <tbody>
          {wallets.map(w => (
            <tr key={w.userId}>
              <td className="p-2 border">{w.userId}</td>
              <td className="p-2 border">{w.balance.toFixed(2)} €</td>
              <td className="p-2 border space-x-2">

                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => adminResetWallet(w.userId).then(load)}
                >
                  Azzera
                </button>

                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => adminDeleteWallet(w.userId).then(load)}
                >
                  Elimina
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}