
// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  saveAuthToken,
  getAuthToken,
  clearAuth,
  saveAuthUser,
  getAuthUser,
} from "../utils/auth";
import { getCurrentUser } from "../services/userService";

export const AuthContext = createContext(null);

const stored = getAuthUser();
const initialUser = stored && stored.id ? stored : null;

export function AuthProvider({ children }) {

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  // Inizializzazione: se ho un token, cerco il mio profilo
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((u) => {

        // se l'utente non è abilitato o è sospeso → lo butto fuori
        if (u.suspended) {
          console.warn("Utente sospeso");
          clearAuth();
          setUser(null);
          return;
        }

        if (u.enabled === false) {
          console.warn("Utente non ancora approvato dall'admin");
          clearAuth();
          setUser(null);
          return;
        }

        setUser(u);
        saveAuthUser(u);
      })
      .catch(() => {
        clearAuth();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (userPayload, token) => {
    // userPayload è quello che arriva da /login (AuthResponse)
    // poi al primo refresh verrà ricaricato /me con enabled/suspended
    saveAuthToken(token);
    saveAuthUser(userPayload);
    setUser(userPayload);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);