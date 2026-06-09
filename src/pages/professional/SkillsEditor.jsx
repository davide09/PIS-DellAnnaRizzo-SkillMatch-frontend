
// src/pages/professional/SkillsEditor.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { listSkills, addSkill, getFeedbackSummary } from "../../services/userService";
import { getReputationLabel } from "../../utils/user";

export default function SkillsEditor() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [selectedLevel, setSelectedLevel] = useState("");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!user) return;

    listSkills(user.id)
      .then(setSkills)
      .catch(() => setSkills([]));

    getFeedbackSummary(user.id)
      .then(setSummary)
      .catch(() => setSummary(null));
  }, [user]);

  async function handleAddSkill() {
    if (!newSkill.trim()) {
      alert("Inserisci il nome della skill.");
      return;
    }

    if (!selectedLevel.trim()) {
      alert("Seleziona un livello per la skill.");
      return;
    }

    await addSkill(user.id, { 
      name: newSkill,
      level: selectedLevel, 
    });

    const updated = await listSkills(user.id);
    setSkills(updated);

    setNewSkill("");
    setSelectedLevel("");
  }

  const level = summary ? summary.level : "-";
  const avg = summary ? summary.average.toFixed(1) : "-";
  const count = summary ? summary.count : 0;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Gestione Skill</h1>

      {/* BOX REPUTAZIONE */}
      <div className="mb-6 p-3 border rounded bg-white shadow-sm">
        <p className="font-semibold text-slate-700">La tua reputazione</p>

        <p className="text-sm text-slate-500">
          Livello: <strong>{getReputationLabel(level)}</strong>
        </p>

        <p className="text-sm text-slate-500">
          Media voti: {avg}  
          <br />
          Numero feedback: {count}
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="border p-2 rounded flex-1"
          placeholder="Nuova skill..."
        />

        <select
          className="border p-2 rounded"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="" disabled hidden>Livello</option>
          <option value="JUNIOR">Junior</option>
          <option value="MEDIUM">Medium</option>
          <option value="SENIOR">Senior</option>
        </select>

        <button
          onClick={handleAddSkill}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Aggiungi
        </button>
      </div>

      <ul className="space-y-2">
        {skills.map((s, i) => (
          <li key={i} className="px-3 py-2 border rounded bg-gray-50">
            {s.name} - <span className="italic">{s.level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}