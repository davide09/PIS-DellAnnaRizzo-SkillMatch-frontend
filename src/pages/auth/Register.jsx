
// src/pages/auth/Register.jsx

import { useState } from "react";
import { registerRequest } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // --------------------------------------------------------
    // VALIDAZIONE
    // --------------------------------------------------------

    const { name, email, password, role } = form;

    // TUTTI I CAMPI VUOTI
    if (!name && !email && !password && !role) {
      setError("Compila tutti i campi per registrarti.");
      return;
    }

    // NOME
    if (!name.trim()) {
      setError("Inserisci il nome.");
      return;
    }

    // EMAIL
    if (!email.trim()) {
      setError("Inserisci l'email.");
      return;
    }
    if (!email.includes("@")) {
      setError("Inserisci un'email valida (manca '@').");
      return;
    }

    // PASSWORD
    if (!password.trim()) {
      setError("Inserisci la password.");
      return;
    }
    if (password.length < 6) {
      setError("La password deve contenere almeno 6 caratteri.");
      return;
    }

    // ROLE / TIPOLOGIA
    if (!role || role === "") {
      setError("Seleziona se sei un Professionista o un'Azienda.");
      return;
    }

    // --------------------------------------------------------
    // Se tutto ok → REGISTRAZIONE
    // --------------------------------------------------------

    try {
      await registerRequest(form);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Errore durante la registrazione.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrati</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          name="name"
          placeholder="Nome"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        />

        <select
          name="role"
          value={form.role}
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Sei un?
          </option>
          <option value="PROFESSIONAL">Professionista</option>
          <option value="COMPANY">Azienda</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Registrati
        </button>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 underline">
            Hai già un account? Accedi
          </Link>
        </div>
      </form>
    </div>
  );
}