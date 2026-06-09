
import { apiGet, apiPost } from "../hooks/useApi";
import { API_PATHS } from "../api/gateway";

export function getCommissionConfig() {
  return apiGet(`${API_PATHS.users}/admin/commission`);
}

export function updateCommission(percentage) {
  return apiPost(
    `${API_PATHS.users}/admin/commission?percentage=${percentage}`
  );
}