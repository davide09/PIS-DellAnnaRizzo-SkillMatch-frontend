
// src/pages/admin/AdminDashboard.jsx

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pannello Amministratore</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Link to="/admin/users" className="block p-4 border rounded shadow bg-white">
          👤 Gestione Utenti
        </Link>

        <Link to="/admin/users/pending" className="block p-4 border rounded shadow bg-white">
          ⏳ Utenti in Attesa
        </Link>

        <Link to="/admin/commission" className="block p-4 border rounded shadow bg-white">
          ⚙️ Configura Commissione
        </Link>

        <Link to="/admin/reports" className="block p-4 border rounded shadow bg-white">
          🚨 Gestione Segnalazioni
        </Link>

        <Link to="/admin/feedback" className="block p-4 border rounded shadow bg-white">
          🗣️ Gestione Feedback
        </Link>

        <Link to="/admin/wallets" className="block p-4 border rounded shadow bg-white">
          💰 Wallet degli Utenti
        </Link>

        <Link to="/admin/wallets/transactions" className="block p-4 border rounded shadow bg-white">
          📄 Tutte le Transazioni
        </Link>

        <Link to="/admin/wallets/transactions/filter" className="block p-4 border rounded shadow bg-white">
          🔍 Filtra Transazioni
        </Link>

        <Link to="/admin/contracts" className="block p-4 border rounded shadow bg-white">
          📑 Contratti
        </Link>

      </div>
    </div>
  );
}