
// src/services/walletService.js
import { apiGet, apiPost, apiDelete } from "../hooks/useApi";

// ======================
// USER WALLET
// ======================

export async function getMyWallet(userId) {
  return apiGet(`/api/wallet/${userId}`);
}

export async function deposit(userId, amount) {
  return apiPost(`/api/wallet/${userId}/deposit`, { amount });
}

export async function getMyTransactions(userId) {
  return apiGet(`/api/wallet/${userId}/transactions`);
}

// ======================
// ADMIN WALLET ACTIONS
// ======================

export async function getAllWallets() {
  return apiGet("/api/admin/wallet");
}

export async function getAllTransactions() {
  return apiGet("/api/admin/wallet/transactions");
}

export async function adminGetTransactionsByType(type) {
  return apiGet(`/api/admin/wallet/transactions/${type}`);
}

export async function adminForceDeposit(userId, amount) {
  return apiPost(`/api/admin/wallet/${userId}/force-deposit`, { amount });
}

export async function adminResetWallet(userId) {
  return apiPost(`/api/admin/wallet/${userId}/reset`);
}

export async function adminDeleteWallet(userId) {
  return apiDelete(`/api/admin/wallet/${userId}`);
}

// ======================
// ADMIN – FILTRO TRANSAZIONI (MANCANTE)
// ======================
export async function filterTransactions(filterReq) {
  return apiPost("/api/admin/wallet/transactions/filter", filterReq);
}