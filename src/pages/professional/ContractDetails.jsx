
// src/pages/professional/ContractDetails.jsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getContractById,
  acceptProposal,
  rejectProposal,
  startContract,
  completeContract,
} from "../../services/contractService";

import FeedbackForm from "../../components/FeedbackForm";

import { getUserById } from "../../services/userService";
import { formatDate } from "../../utils/formatDate";

export default function ProfessionalContractDetails() {
  const { contractId } = useParams();
  const [contract, setContract] = useState(null);

  // toggle pannello recensione
  const [showFeedback, setShowFeedback] = useState(false);

  async function load() {
    const c = await getContractById(contractId);
    const company = await getUserById(c.companyId);

    setContract({
      ...c,
      companyName: company.name,
    });
  }

  useEffect(() => {
    load();
  }, [contractId]);

  if (!contract) return <p>Caricamento...</p>;

  async function handle(action) {
    await action(contractId);
    load();
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-xl font-bold">Contratto #{contract.id}</h1>

      <p className="text-green slate-600">Stato: {contract.status}</p>

      {/* BOTTONI IN BASE ALLO STATO */}
      <div className="space-x-0">

        {contract.status === "PENDING" && (
          <>
            <button
              onClick={() => handle(acceptProposal)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Accetta
            </button>
            {'\u00A0'}{'\u00A0'}
            <button
              onClick={() => handle(rejectProposal)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Rifiuta
            </button>
          </>
        )}

        {contract.status === "ACCEPTED" && (
          <button
            onClick={() => handle(startContract)}
            className="px-3 py-1 bg-yellow-600 text-white rounded"
          >
            Inizia lavoro
          </button>
        )}

        {contract.status === "ACTIVE" && (
          <button
            onClick={() => handle(completeContract)}
            className="px-3 py-1 bg-emerald-600 text-white rounded"
          >
            Completa lavoro
          </button>
        )}

        {contract.status === "REJECTED" && (
          <span className="text-red-600 font-semibold">
            Hai rifiutato questa proposta.
          </span>
        )}

        {contract.status === "COMPLETED" && (
          <span className="text-green-600 slate-500">
            Lavoro completato. Attendi il pagamento dell'azienda.
          </span>
        )}

        {contract.status === "PAID" && (
          <>
            <span className="text-green-600 font-semibold">
              Pagamento ricevuto. Fattura #{contract.invoiceId}
            </span>
            <br></br>
            <br></br>
            {/*  BOTTONE RECENSIONE */}
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {showFeedback ? "Chiudi Pannello" : "Lascia Feedback all'Azienda"}
            </button>
            {'\u00A0'}{'\u00A0'}
            {/* SEGNALAZIONE PROFESSIONAL -> SEGNALA LA COMPANY */}
            <Link
              to={`/professional/report/${contract.companyId}`}
              className="px-3 py-1.5 bg-yellow-600 text-white rounded"
            >
              Segnala Azienda
            </Link>

            {/* pannello recensione condizionale */}
            {showFeedback && (
              <div className="mt-4">
                <FeedbackForm
                  professionalId={contract.companyId}
                  contractId={contract.id}
                  onDone={() => {
                    load();
                    setShowFeedback(false);
                  }}
                />
              </div>
            )}
          </>
        )}

      </div>

      {/* DETTAGLI COMPLETI */}
      <div className="bg-white border p-4 rounded shadow-sm">
        <h2 className="font-semibold mb-2">Dettagli</h2>

        <p>
          Progetto: <strong>{contract.projectName}</strong>
        </p>
        <p>
          Azienda: <strong>{contract.companyName}</strong>
        </p>

        <p>Compenso: {contract.price ?? "-"} €</p>
        <p>Commissione: {contract.commissionFee ?? "-"} €</p>
        {contract.invoiceId && <p>Fattura n°: {contract.invoiceId}</p>}

        <p className="text-xs text-slate-500 mt-2">
          Creato il: {formatDate(contract.createdAt)}
        </p>
      </div>
    </div>
  );
}