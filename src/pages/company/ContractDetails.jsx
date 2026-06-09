
// src/pages/company/ContractDetails.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getContractById,
  acceptProposal,
  rejectProposal,
  startContract,
  completeContract,
  payContract,
  getInvoiceById,
} from "../../services/contractService";

import FeedbackForm from "../../components/FeedbackForm";

import { getUserById } from "../../services/userService";
import { formatDate } from "../../utils/formatDate";

export default function ContractDetails() {
  const { contractId } = useParams();
  const [contract, setContract] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const [showFeedback, setShowFeedback] = useState(false);

  async function load() {
    const c = await getContractById(contractId);

    // il projectName arriva già da backend dentro c.projectName
    const company = await getUserById(c.companyId);

    const professional = await getUserById(c.professionalId);

    setContract({
      ...c,
      companyName: company.name,
      professionalName: professional.name,
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

  async function handleViewInvoice() {
    if (!contract.invoiceId) return;
    const data = await getInvoiceById(contract.invoiceId);
    setInvoice(data);
  }

  async function handleDownloadInvoicePdf() {
    if (!contract.invoiceId) return;

    try {
      const res = await fetch(
        `/api/contracts/invoices/${contract.invoiceId}/pdf`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (!res.ok) {
        alert("Errore nel download della fattura.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `fattura-${contract.invoiceId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Errore nel download della fattura.");
    }
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-xl font-bold">Contratto #{contract.id}</h1>

      <p className="text-green slate-600">Stato: {contract.status}</p>

      {/* BOTTONI */}
      <div className="space-x-0">
        {contract.status === "PENDING" && (
          <>
            <button
              onClick={() => handle(acceptProposal)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Accetta contratto
            </button>
            {'\u00A0'}{'\u00A0'}
            <button
              onClick={() => handle(rejectProposal)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Rifiuta contratto
            </button>
          </>
        )}

        {contract.status === "REJECTED" && (
          <span className="text-red-600 font-semibold">
            Hai rifiutato questo contratto.
          </span>
        )}

        {contract.status === "ACCEPTED" && (
          <button
            onClick={() => handle(startContract)}
            className="px-3 py-1 bg-yellow-600 text-white rounded"
          >
            Avvia contratto
          </button>
        )}

        {contract.status === "ACTIVE" && (
          <button
            onClick={() => handle(completeContract)}
            className="px-3 py-1 bg-emerald-600 text-white rounded"
          >
            Completa contratto
          </button>
        )}

        {contract.status === "COMPLETED" && (
          <button
            onClick={() => handle(payContract)}
            className="px-3 py-1 bg-purple-600 text-white rounded"
          >
            Effettua pagamento
          </button>
        )}

        {contract.status === "PAID" && (
          <>
            <span className="text-green-600 font-semibold">
              Pagamento effettuato. Fattura #{contract.invoiceId}
            </span>

            <button
              onClick={handleViewInvoice}
              className="ml-2 px-2 py-1 text-sm border rounded"
            >
              Vedi fattura
            </button>
          </>
        )}
        <br></br>
        <br></br>
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {showFeedback ? "Chiudi Pannello" : "Lascia Feedback al Professionista"}
        </button>
        {'\u00A0'}{'\u00A0'}
        {/* SEGNALAZIONE COMPANY -> SEGNALA IL PROFESSIONAL */}
        <Link
          to={`/company/report/${contract.professionalId}`}
          className="px-3 py-1.5 bg-yellow-600 text-white rounded"
        >
          Segnala Professionista
        </Link>

        {/* pannello recensione condizionale */}
        {showFeedback && (
          <div className="mt-4">
            <FeedbackForm
              professionalId={contract.professionalId}
              contractId={contract.id}
              onDone={() => {
                load();
                setShowFeedback(false);
              }}
              />
          </div>
        )}
      </div>

      {/* INFO CONTRATTO */}
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

      {/* DETTAGLI FATTURA + DOWNLOAD PDF */}
      {invoice && (
        <div className="mt-4 bg-slate-50 border p-3 rounded text-sm">
          <h3 className="font-semibold mb-1">Dettagli fattura</h3>
          <p>Contratto: {invoice.contractId}</p>
          <p>Importo lordo: {invoice.grossAmount} €</p>
          <p>Commissione SkillMatch: {invoice.commissionFee} €</p>
          <p>Importo netto al professionista: {invoice.netAmount} €</p>
          <p className="text-xs text-slate-500 mt-1">
            Emessa il: {formatDate(invoice.createdAt)}
          </p>

          <button
            onClick={handleDownloadInvoicePdf}
            className="mt-2 px-2 py-1 text-xs border rounded"
          >
            Scarica PDF
          </button>
        </div>
      )}
    </div>
  );
}