
// src/utils/user.js

export function getRoleLabel(role) {
  if (role === "COMPANY") return "Azienda";
  if (role === "PROFESSIONAL") return "Professionista";
  return role || "-";
}

/**
 * Rende coerente il FE con la logica del backend:
 */
export function getReputationLabel(level) {
  if (!level) return "-";
  return level; 
}