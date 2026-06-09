
// src/services/adminTransactionFilterService.js
import { apiPost } from "../hooks/useApi";

export async function filterTransactions(filters) {
  return apiPost("/api/admin/wallet/transactions/filter", filters);
}