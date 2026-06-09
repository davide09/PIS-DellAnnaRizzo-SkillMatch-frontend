
// src/services/feedbackService.js

import { apiGet, apiPost } from "../hooks/useApi";
import { API_PATHS } from "../api/gateway";

export function createFeedback({ professionalId, contractId, rating, comment }) {
  return apiPost(`${API_PATHS.users}/${professionalId}/feedback`, {
    professionalId,
    contractId,
    rating,
    comment,  
  });
}

export function getFeedbackSummary(professionalId) {
  return apiGet(`${API_PATHS.users}/feedback/${professionalId}`);
}