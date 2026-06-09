
// src/pages/wallet/MyTransactions.jsx

import { useEffect, useState } from "react";
import { getMyTransactions } from "../../services/walletService";
import { useAuth } from "../../hooks/useAuth";
import TransactionList from "../../components/TransactionList";

export default function MyTransactions() {
  const { user } = useAuth();
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (user) load();
  }, [user]);

  async function load() {
    const list = await getMyTransactions(user.id);
    setTxs(list);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">📄 Le mie Transazioni</h1>

      <TransactionList transactions={txs} />
    </div>
  );
}