
// src/pages/report/ReportCreate.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import { getUserById } from "../../services/userService";

export default function ReportCreate() {
  const { id } = useParams();          // id dell'utente SEGNALATO
  const { user } = useAuth();          // utente loggato = reporter
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  // 🔍 Carico l’utente segnalato per capire ruolo e nome
  useEffect(() => {
    async function load() {
      const u = await getUserById(id);
      setTargetUser(u);
    }
    load();
  }, [id]);

  // Fallback in attesa caricamento
  if (!targetUser)
    return <div className="p-6">Caricamento...</div>;

  const isCompany = targetUser.role === "COMPANY";

  async function submit() {
    if (!description.trim()) {
      alert("Inserisci una descrizione della segnalazione.");
      return;
    }

    await apiPost(
      `/api/users/reports?reporterId=${user.id}&reportedUserId=${id}&description=${encodeURIComponent(
        description
      )}`,
      {}
    );

    alert("Segnalazione inviata con successo.");
    navigate(-1);
  }

  return (
    <div className="p-6 w-full max-w-2xl">

      {/* TITOLO */}
      <h1 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <span>🚨</span>
        <span>
          {isCompany ? "Segnala Azienda" : "Segnala Professionista"} #{id}
        </span>
      </h1>

      {/* CARD */}
      <div className="bg-white border rounded-lg shadow p-6">

        <p className="text-gray-700 mb-4">
          Inserisci la descrizione del comportamento scorretto o del problema riscontrato.
        </p>

        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-red-200 mb-6"
          rows="6"
          placeholder="Descrivi il problema in modo dettagliato..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {/* BOTTONI */}
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            Annulla
          </button>

          <button
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow"
            onClick={submit}
          >
            Invia segnalazione
          </button>
        </div>
      </div>
    </div>
  );
}