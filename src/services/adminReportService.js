
import { apiGet, apiPost } from "../hooks/useApi";

export async function getAllReports() {
  return (await apiGet("/api/users/admin/reports"));
}

export async function getReportById(id) {
  return (await apiGet(`/api/users/admin/reports/${id}`));
}

export async function getUserReports(userId) {
  return (await apiGet(`/api/users/admin/reports/user/${userId}`));
}

export async function getLatestUserReport(userId) {
  return (await apiGet(`/api/users/admin/reports/user/${userId}/latest`));
}

export async function closeReport(id) {
  return (await apiPost(`/api/users/admin/reports/${id}/close`));
}

export async function closeAllReportsForUser(userId) {
  return (await apiPost(`/api/users/admin/reports/user/${userId}/closeAll`));
}