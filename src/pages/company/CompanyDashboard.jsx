
// src/pages/company/CompanyDashboard.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { listProjectsByCompany } from "../../services/projectService";
import { listContractsForCompany } from "../../services/contractService";
import ProjectCard from "../../components/ProjectCard";

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (!user) return;

    listProjectsByCompany(user.id)
      .then(setProjects)
      .catch(() => setProjects([]));

    listContractsForCompany(user.id)
      .then(setContracts)
      .catch(() => setContracts([]));
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Dashboard Azienda</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Progetti attivi</h2>
        {projects.length === 0 && (
          <p className="text-sm text-slate-500">
            Nessun progetto. Crea un nuovo progetto dalla sezione Progetti.
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Contratti recenti</h2>
        {contracts.length === 0 && (
          <p className="text-sm text-slate-500">
            Nessun contratto ancora generato.
          </p>
        )}
        <ul className="space-y-2">
          {contracts.map((c) => (
            <li
              key={c.id}
              className="border rounded p-3 bg-white flex justify-between text-sm"
            >
              <span>Contratto #{c.id}</span>
              <span className="text-slate-500">{c.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}