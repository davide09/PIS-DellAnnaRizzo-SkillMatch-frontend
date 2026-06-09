
// src/services/adminUserService.js
import { apiGet, apiPost } from "../hooks/useApi";

export async function getAllUsers() {
  return apiGet("/api/users/admin");
}

export async function getPendingUsers() {
  return apiGet("/api/users/admin/pending");
}

export async function approveUser(id) {
  return apiPost(`/api/users/admin/${id}/approve`);
}

export async function suspendUser(id) {
  return apiPost(`/api/users/admin/${id}/suspend`);
}

export async function unsuspendUser(id) {
  return apiPost(`/api/users/admin/${id}/unsuspend`);
}

export async function getUserFeedback(id) {
  return apiGet(`/api/users/admin/${id}/feedback`);
}