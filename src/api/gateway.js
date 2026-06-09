
// src/api/gateway.js

// Base URL del Gateway Spring (porta 8080 nel docker-compose)
export const GATEWAY_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const API_PATHS = {
  auth: "/api/auth",
  users: "/api/users",
  projects: "/api/projects",
  matching: "/api/matching",
  contracts: "/api/contracts",
  wallet: "/api/wallet",
  adminWallet: "/api/admin/wallet"
};

export function buildUrl(path) {
  return `${GATEWAY_BASE_URL}${path}`;
}