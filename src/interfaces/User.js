
// src/interfaces/User.js

export class User {
  constructor(dto) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
    this.role = dto.role;

    this.reputationAverage = dto.reputationAverage ?? 0;
    this.reputationCount = dto.reputationCount ?? 0;
    this.reputationLevel = dto.reputationLevel ?? "—";
    this.portfolioUrl = dto.portfolioUrl ?? null;
    this.certifications = dto.certifications ?? null;
    this.notes = dto.notes ?? null;
    this.skills = dto.skills ?? [];
  }
}