
// src/components/ProjectCard.jsx

import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        {project.status && (
          <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">
            {project.status}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1 mt-2">
        {Array.isArray(project.requiredSkills) &&
          project.requiredSkills.map((s, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
            >
              {typeof s === "string" ? s : s.name}
            </span>
          ))}
      </div>
      <div className="mt-3">
        <Link
          to={`/company/projects/${project.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Dettagli progetto →
        </Link>
      </div>
    </div>
  );
}