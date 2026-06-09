
// src/hooks/useApi.js

import { buildUrl } from "../api/gateway";
import { getAuthToken } from "../utils/auth";

/**
 * Richiesta generica verso il Gateway.
 *
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method
 * @param {string} path es: "/api/users/me"
 * @param {object} options
 *   - body: oggetto JSON
 *   - auth: boolean (default true) -> allega Authorization: Bearer <token>
 */

export async function apiRequest(method, path, options = {}) {
  const { body, auth = true } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
  }

  const res = await fetch(buildUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Se il backend restituisce 204 o body vuoto
  if (res.status === 204) {
    return null;
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      (data && data.message) ||
      data?.error ||
      `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const apiGet = (path, opts) =>
  apiRequest("GET", path, { ...opts, body: undefined });

export const apiPost = (path, body, opts) =>
  apiRequest("POST", path, { ...opts, body });

export const apiPut = (path, body, opts) =>
  apiRequest("PUT", path, { ...opts, body });

export const apiDelete = (path, opts) =>
  apiRequest("DELETE", path, { ...opts, body: undefined });