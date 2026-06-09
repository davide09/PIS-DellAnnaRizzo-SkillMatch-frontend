
// src/services/projectService.js
import { apiGet, apiPost, apiPut, apiDelete } from "../hooks/useApi";
import { API_PATHS } from "../api/gateway";

// Crea un progetto
export function createProject(payload) {
  return apiPost(API_PATHS.projects, payload);
}

// Un singolo progetto
export function getProjectById(id) {
  return apiGet(`${API_PATHS.projects}/${id}`);
}

// Tutti i progetti
export function listProjects() {
  return apiGet(API_PATHS.projects);
}

// Progetti di una specifica azienda
export function listProjectsByCompany(companyId) {
  return apiGet(`${API_PATHS.projects}/company/${companyId}`);
}

// Aggiorna progetto
export function updateProject(id, payload) {
  return apiPut(`${API_PATHS.projects}/${id}`, payload);
}

// Cancella progetto
export function deleteProject(id) {
  return apiDelete(`${API_PATHS.projects}/${id}`);
}