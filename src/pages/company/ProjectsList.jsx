
// src/pages/company/ProjectsList.jsx

import { useEffect, useState } from "react";
import { listProjectsByCompany } from "../../services/projectService";
import { useAuth } from "../../hooks/useAuth";
import ProjectCard from "../../components/ProjectCard";
import { Link } from "react-router-dom";

export default function ProjectsList() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!user) return;
    listProjectsByCompany(user.id)
      .then(setProjects)
      .catch(() => setProjects([]));
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">I tuoi progetti</h1>
        <Link
          to="/company/projects/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Nuovo progetto
        </Link>
      </div>

      {projects.length === 0 && (
        <p className="text-slate-500">Non hai ancora creato nessun progetto.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}