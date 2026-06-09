// src/pages/professional/Profile.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserById, updateUserProfile } from "../../services/userService";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    portfolioUrl: "",
    certifications: "",
    notes: "",
  });

  
  useEffect(() => {
    if (!user) return;
    getUserById(user.id).then(data => {
      setForm({
        portfolioUrl: data.portfolioUrl ?? "",
        certifications: data.certifications ?? "",
        notes: data.notes ?? "",
      });
    });
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    if (
      !form.portfolioUrl.trim() &&
      !form.certifications.trim() &&
      !form.notes.trim()
    ) {
      alert("Compila almeno un campo prima di salvare il profilo.");
      return;
    }

    try {
      await updateUserProfile(user.id, form);
      alert("Profilo aggiornato con successo!");
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio.");
    }
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl font-bold mb-4">Profilo Professionista</h1>

      <div>
        <label className="block font-medium">Portfolio (URL)</label>
        <input
          name="portfolioUrl"
          value={form.portfolioUrl}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Github.com/tuo_profilo / sito personale..."
        />
      </div>

      <div>
        <label className="block font-medium">Certificazioni</label>
        <textarea
          name="certifications"
          value={form.certifications}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows={3}
          placeholder="Es: AWS Cloud Practitioner, Java OCP, React Developer..."
        />
      </div>

      <div>
        <label className="block font-medium">Note / Descrizione</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows={4}
          placeholder="Descrizione aggiuntiva del tuo profilo..."
        />
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Salva Profilo
      </button>
    </div>
  );
}
