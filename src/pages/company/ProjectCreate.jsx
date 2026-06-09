
// src/pages/company/ProjectCreate.jsx

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";

export default function ProjectCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    budget: "",
    experienceLevel: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // VALIDAZIONI 
    if (
      !form.title.trim() &&
      !form.description.trim() &&
      !form.budget.trim() &&
      !form.experienceLevel.trim() &&
      !form.requiredSkills.trim()
    ) {
      alert("Inserisci tutti i campi obbligatori.");
      return;
    }

    if (!form.title.trim()) {
      alert("Inserisci il titolo del progetto.");
      return;
    }

    if (!form.description.trim()) {
      alert("Inserisci la descrizione del progetto.");
      return;
    }

    if (!form.budget || Number(form.budget) <= 0) {
      alert("Inserisci un budget valido.");
      return;
    }

    if (!form.experienceLevel.trim()) {
      alert("Seleziona il livello di esperienza richiesto.");
      return;
    }

    if (!form.requiredSkills.trim()) {
      alert("Inserisci almeno una skill richiesta.");
      return;
    }

    try {
      const payload = {
        companyId: user.id,
        title: form.title,
        description: form.description,
        budget: Number(form.budget),
        requiredSkills: form.requiredSkills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        experienceLevel: form.experienceLevel,
      };

      await createProject(payload);
      navigate("/company/projects");
    } catch (err) {
      setError("Errore nella creazione del progetto.");
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 border rounded shadow-sm">
      <h1 className="text-xl font-bold mb-4">Crea nuovo progetto</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITOLO */}
        <div>
          <label className="font-medium">Titolo</label>
          <input
            name="title"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* DESCRIZIONE */}
        <div>
          <label className="font-medium">Descrizione</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            rows={4}
            onChange={handleChange}
          />
        </div>

        {/* BUDGET */}
        <div>
          <label className="font-medium">Budget (€)</label>
          <input
            name="budget"
            type="number"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* LIVELLO ESPERIENZA */}
        <div>
          <label className="font-medium">Livello esperienza richiesto</label>
          <select
            name="experienceLevel"
            className="w-full border p-2 rounded"
            value={form.experienceLevel}
            onChange={handleChange}
          >
            
            <option value="" disabled hidden>
              Livello
            </option>

            <option value="JUNIOR">Junior</option>
            <option value="MID">Mid</option>
            <option value="SENIOR">Senior</option>
          </select>
        </div>

        {/* SKILL */}
        <div>
          <label className="font-medium">Skill richieste (separate da virgola)</label>
          <input
            name="requiredSkills"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* SUBMIT */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Crea progetto
        </button>
      </form>
    </div>
  );
}