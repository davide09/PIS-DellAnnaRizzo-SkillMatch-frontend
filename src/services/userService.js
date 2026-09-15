
import { apiGet, apiPost, apiPut } from "../hooks/useApi";
import { API_PATHS } from "../api/gateway";



export function getCurrentUser() {
  return apiGet(`${API_PATHS.users}/me`);
}

export function getUserById(userId) {
  return apiGet(`${API_PATHS.users}/${userId}`);
}



export function getUserSkills(professionalId) {
  return apiGet(`${API_PATHS.users}/${professionalId}/skills`);
}

export const listSkills = getUserSkills;

export function addSkill(professionalId, payload) {
  return apiPost(`${API_PATHS.users}/${professionalId}/skills`, payload);
}

export function getFeedbackSummary(professionalId) {
  return apiGet(`${API_PATHS.users}/feedback/${professionalId}/summary`);
}

export function updateUserProfile(userId, payload) {
  return apiPut(`${API_PATHS.users}/${userId}`, payload);
}
