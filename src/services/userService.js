
import { apiGet, apiPost, apiPut } from "../hooks/useApi";
import { API_PATHS } from "../api/gateway";

// ==========================
// USER INFO
// ==========================

// Dati dell’utente corrente
export function getCurrentUser() {
  return apiGet(`${API_PATHS.users}/me`);
}

// Utente per ID
export function getUserById(userId) {
  return apiGet(`${API_PATHS.users}/${userId}`);
}

// ==========================
// SKILLS
// ==========================

// Lista skill del professionista (nome corretto usato nel matching)
export function getUserSkills(professionalId) {
  return apiGet(`${API_PATHS.users}/${professionalId}/skills`);
}

// Alias per retrocompatibilità con SkillsEditor.jsx
export const listSkills = getUserSkills;

// Aggiungi una nuova skill
export function addSkill(professionalId, payload) {
  return apiPost(`${API_PATHS.users}/${professionalId}/skills`, payload);
}

// Rendi visibile la reputazione dell'utente
export function getFeedbackSummary(professionalId) {
  return apiGet(`${API_PATHS.users}/feedback/${professionalId}/summary`);
}

// Aggiorna profilo utente
export function updateUserProfile(userId, payload) {
  return apiPut(`${API_PATHS.users}/${userId}`, payload);
}
