
// src/services/authService.js
import { buildUrl, API_PATHS } from "../api/gateway";

export async function loginRequest(email, password) {
  const res = await fetch(buildUrl(`${API_PATHS.auth}/login`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  //proviamo a leggere un JSON
  let data = null;
  try {
    data = await res.json();
  } catch {
      //se non è JSON, lo leggiamo come testo
      try {
        const text = await res.text();
        data = { message: text };
      } catch {}
  }

  if (!res.ok) {
    // prende il messaggio reale restituito dal backend
    const message =
      data?.message ||
      data?.error ||
      "Credenziali non valide";

    throw new Error(message);
  }

  return data;
}

export async function registerRequest(data) {
  const res = await fetch(buildUrl(`${API_PATHS.auth}/register`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registrazione fallita");
  }

  return res.json();
}