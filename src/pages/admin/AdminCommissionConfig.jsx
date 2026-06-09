
import { useEffect, useState } from "react";
import { getCommissionConfig, updateCommission } from "../../services/commissionService";

export default function AdminCommissionConfig() {
  const [percentage, setPercentage] = useState("");
  const [current, setCurrent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getCommissionConfig();
    setCurrent(data.percentage);
  }

  async function handleSave() {
    if (percentage === "" || isNaN(percentage)) {
      setMessage("❌ Inserisci un valore valido.");
      return;
    }

    if (percentage < 0 || percentage > 100) {
      setMessage("❌ La commissione deve essere tra 0 e 100.");
      return;
    }

    const res = await updateCommission(Number(percentage));
    setCurrent(res.percentage);
    setMessage("✅ Commissione aggiornata con successo!");
    setPercentage("");
  }

  return (
    <div className="p-6 max-w-lg">

      <h1 className="text-xl font-bold mb-4">⚙️ Configurazione Commissioni</h1>

      <div className="p-4 rounded border bg-white shadow">
        <p className="text-lg">
          <strong>Commissione attuale:</strong>{" "}
          {current !== null ? `${current}%` : "Caricamento..."}
        </p>
      </div>

      <div className="mt-6 p-4 rounded border bg-white shadow">
        <label className="font-semibold">Nuova percentuale (%)</label>
        <input
          type="number"
          className="border p-2 rounded w-full mt-2"
          placeholder="Es: 8"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSave}
        >
          Aggiorna Commissione
        </button>

        {message && (
          <p className="mt-3 text-sm font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}