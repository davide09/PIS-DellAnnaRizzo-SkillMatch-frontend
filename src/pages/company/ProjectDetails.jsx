
// src/pages/company/ProjectDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { getProjectById } from "../../services/projectService";
import { runMatching } from "../../services/matchingService";
import { createProposal } from "../../services/contractService";
import { getReputationLabel } from "../../utils/user";

export default function ProjectDetails() {
  const { user } = useAuth();             // Azienda loggata
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [matches, setMatches] = useState([]);

  // Carica progetto
  useEffect(() => {
    getProjectById(projectId).then(setProject);
    setMatches([]);
  }, [projectId]);

  // Avvia matching
  async function handleRunMatching() {
    try {
      const result = await runMatching(projectId);
      setMatches(result);
    } catch (err) {
      console.error("Errore nel matching: ", err);
    }
  }

  // INVIA PROPOSTA
  async function handleSendProposal(professionalId) {
    if (!project || !user) return;

    const priceString = prompt("Inserisci il compenso da offrire (€):");
    if (!priceString) return;

    const price = Number(priceString);
    if (isNaN(price) || price <= 0) {
      alert("Compenso non valido.");
      return;
    }

    const payload = {
      projectId: project.id,
      professionalId,
      companyId: user.id,
      description: `Proposta per il progetto "${project.title}"`,
      price
    };

    try {
      await createProposal(payload);
      alert("Proposta inviata!");
    } catch (err) {
      console.error(err);
      alert("Errore durante l'invio della proposta.");
    }
  }

  if (!project) return <p>Caricamento...</p>;

  return (
    <div className="space-y-6">

      {/* TITOLI */}
      <div>
        <h1 className="text-xl font-bold">{project.title}</h1>

        <p className="text-slate-600 mt-1">{project.description}</p>
        <p className="text-slate-600 mt-1">Budget: €{project.budget}</p>
        <p className="text-slate-600 mt-1">
          Livello richiesto: {project.experienceLevel}
        </p>

        <div className="mt-3 flex gap-1 flex-wrap">
          {project.requiredSkills?.map((s, i) => (
            <span key={i} className="text-xs bg-blue-50 px-2 py-1 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* MATCHING */}
      <button
        onClick={handleRunMatching}
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Avvia matching
      </button>

      <section>
        <h2 className="text-lg font-semibold mb-2">Candidati suggeriti</h2>

        {matches.length === 0 ? (
          <p className="text-slate-500">Nessun suggerimento ancora.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">

            {matches.map((m, i) => (
              <div key={i} className="border p-3 rounded shadow-sm">
                <p className="text-lg font-semibold">
                  {m.professional.name}
                </p>

                {/* REPUTAZIONE */}
                <div className="text-sm text-slate-700">
                  <div className="text-sm text-slate-600">
                    Livello candidato: <strong>{m.professional.reputationLevel}</strong>
                  </div>
                  <span className="text-xs text-slate-500">
                    ({m.professional.reputationAverage?.toFixed(1) ?? "-"}) —{" "}
                    {m.professional.reputationCount ?? 0} feedback
                  </span>
                </div>

                {/* MATCH */}
                <p className="text-sm text-slate-600">
                  Match: {Math.round(m.score * 100)}%
                </p>

                <button
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                  onClick={() => handleSendProposal(m.professional.id)}
                >
                  Invia proposta
                </button>
              </div>
            ))}

          </div>
        )}
      </section>
    </div>
  );
}