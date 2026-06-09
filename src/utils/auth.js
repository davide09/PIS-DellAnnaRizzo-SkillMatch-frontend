
// src/utils/auth.js

const TOKEN_KEY = "skillmatch_token";
const USER_KEY = "skillmatch_user";

// ---- TOKEN ----
export function saveAuthToken(token) {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// ---- USER ----
export function saveAuthUser(user) {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuthUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuthUser() {
  localStorage.removeItem(USER_KEY);
}

// Logout completo
export function clearAuth() {
  clearAuthToken();
  clearAuthUser();
}