
// src/interfaces/Project.js

export class Project {
  constructor(dto) {
    this.id = dto.id;
    this.companyId = dto.companyId;
    this.title = dto.title;
    this.description = dto.description;
    this.budget = dto.budget;

    // dal BE: List<String>
    this.requiredSkills = dto.requiredSkills ?? [];

    this.experienceLevel = dto.experienceLevel ?? null;
    this.status = dto.status ?? "OPEN";

    this.createdAt = dto.createdAt ?? null;
    this.updatedAt = dto.updatedAt ?? null;
  }
}