
// src/pages/wallet/MyWallet.jsx

import { useEffect, useState } from "react";
import { getMyWallet, deposit } from "../../services/walletService";
import { useAuth } from "../../hooks/useAuth";

export default function MyWallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (user) load();
  }, [user]);

  async function load() {
    const data = await getMyWallet(user.id);
    setWallet(data);
  }

  async function handleDeposit() {
    if (!amount) return;
    await deposit(user.id, amount);
    setAmount("");
    load();
  }

  if (!wallet) return <p>Caricamento...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-xl font-bold mb-4">💰 Il mio Wallet</h1>

      <div className="p-4 border rounded bg-white shadow mb-4">
        <p className="text-lg">
          <strong>Saldo:</strong> {wallet.balance.toFixed(2)} €
        </p>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="number"
          className="border p-2 rounded flex-1"
          placeholder="Importo..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleDeposit}
        >
          Deposita
        </button>
      </div>

    </div>
  );
}