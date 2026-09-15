

import { createContext, useContext, useEffect, useState } from "react";
import {
  saveAuthToken,
  getAuthToken,
  clearAuth,
  saveAuthUser,
  getAuthUser,
} from "../utils/auth";
import { getCurrentUser } from "../services/userService";
import { logoutRequest } from "../services/authService";

export const AuthContext = createContext(null);

const stored = getAuthUser();
const initialUser = stored && stored.id ? stored : null;

export function AuthProvider({ children }) {

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((u) => {

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
    saveAuthToken(token);
    saveAuthUser(userPayload);
    setUser(userPayload);
  };

    const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.warn("Logout lato server fallito, procedo comunque a pulire il client", err);
    } finally {
      clearAuth();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);