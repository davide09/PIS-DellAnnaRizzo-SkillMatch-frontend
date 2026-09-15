

import { apiGet, apiPost } from "../hooks/useApi";
import { getUserById, getUserSkills } from "./userService";

export async function runMatching(projectId) {
  
  const result = await apiPost(`/api/matching/run/${projectId}`);
  const ranking = result.ranking || [];

  const formatted = [];

  for (const r of ranking) {

    const user = await getUserById(r.userId);

    const skills = await getUserSkills(r.userId);

    let reputation = { average: null, count: 0 };
    try {
      reputation = await apiGet(`/api/users/feedback/${r.userId}/summary`);
    } catch (err) {
      console.warn("Impossibile caricare reputazione", err);
    }

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