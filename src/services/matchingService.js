
// src/services/matchingService.js

import { apiGet, apiPost } from "../hooks/useApi";
import { getUserById, getUserSkills } from "./userService";

// Algoritmo di matching con reputazione inclusa
export async function runMatching(projectId) {
  
  // 1) Chiamata al BE (ranking utenti)
  const result = await apiPost(`/api/matching/run/${projectId}`);
  const ranking = result.ranking || [];

  const formatted = [];

  for (const r of ranking) {

    // --- DATI UTENTE ---
    const user = await getUserById(r.userId);

    // --- SKILL UTENTE ---
    const skills = await getUserSkills(r.userId);

    // --- REPUTAZIONE ---
    let reputation = { average: null, count: 0 };
    try {
      reputation = await apiGet(`/api/users/feedback/${r.userId}/summary`);
    } catch (err) {
      console.warn("Impossibile caricare reputazione", err);
    }

    // --- FORMATTAZIONE RISULTATO ---
    formatted.push({
      professional: {
        ...user,
        reputationAverage: reputation.average,
        reputationCount: reputation.count,
      },
      score: r.matchedSkills / r.totalSkills,
      skillsMatched: skills.map(s => s.name),
    });
  }

  return formatted;
}