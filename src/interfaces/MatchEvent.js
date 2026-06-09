
// src/interfaces/MatchEvent.js

export class MatchEvent {
  constructor(dto) {
    this.projectId = dto.projectId;
    this.topProfessionals = dto.topProfessionals ?? [];
    this.timestamp = dto.timestamp ?? null;
  }
}