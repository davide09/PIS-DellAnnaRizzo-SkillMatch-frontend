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

  // precaricare i dati già salvati
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
      // niente reset: i valori salvati rimangono visibili nel form
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio.");
    }
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl font-bold mb-4">Profilo Azienda</h1>

      <div>
        <label className="block font-medium">Sito Web / Portfolio</label>
        <input
          name="portfolioUrl"
          value={form.portfolioUrl}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="https://www.tua_azienda.com ..."
        />
      </div>

      <div>
        <label className="block font-medium">Documenti / Certificazioni</label>
        <textarea
          name="certifications"
          value={form.certifications}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows={3}
          placeholder="Licenze, documenti societari..."
        />
      </div>

      <div>
        <label className="block font-medium">Descrizione Azienda</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows={4}
          placeholder="Descrizione dell'azienda e dei servizi..."
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