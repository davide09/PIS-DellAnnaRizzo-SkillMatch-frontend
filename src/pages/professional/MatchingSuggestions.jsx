
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { 
  listContractsForProfessional,
  acceptProposal,
  rejectProposal
} from "../../services/contractService";

export default function MatchingSuggestions() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState([]);

  async function load() {
    if (!user) return;
    const list = await listContractsForProfessional(user.id);
    setProposals(list.filter(c => c.status === "PENDING"));
  }

  async function handleAccept(id) {
    await acceptProposal(id);
    await load();
  }

  async function handleReject(id) {
    await rejectProposal(id);
    await load();
  }

  useEffect(() => {
    load();
  }, [user]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Proposte di collaborazione</h1>

      {proposals.length === 0 && (
        <p className="text-slate-500">Nessuna proposta disponibile.</p>
      )}

      <div className="grid gap-4">
        {proposals.map(p => (
          <div key={p.id} className="p-4 border rounded shadow-sm">
            <p>Progetto #{p.projectId}</p>
            <p className="text-sm text-slate-500">{p.description}</p>

            <div className="flex gap-2 mt-3">
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => handleAccept(p.id)}
              >
                Accetta
              </button>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => handleReject(p.id)}
              >
                Rifiuta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}