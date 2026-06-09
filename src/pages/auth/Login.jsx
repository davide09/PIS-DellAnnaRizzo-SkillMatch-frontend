
// src/pages/auth/Login.jsx

import { useState } from "react";
import { loginRequest } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginRequest(email, password);

      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      login(user, data.token);

      if (user.role === "COMPANY") {
        navigate("/company/dashboard");
      } else if (user.role === "PROFESSIONAL") {
        navigate("/professional/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
        if (err.message.includes("non approvato"))
          setError("Account non approvato. Attendi la verifica dell’amministratore.");
        else if (err.message.includes("sospeso"))
          setError("Account sospeso. Contattare l’amministratore di sistema.");
        else
          setError(err.message || "Errore login");
      }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Accedi</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
          Login
        </button>

        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-600 underline">
            Non hai un account? Registrati
          </Link>
        </div>
      </form>
    </div>
  );
}