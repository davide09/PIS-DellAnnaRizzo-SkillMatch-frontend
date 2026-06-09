
// src/interfaces/Skill.js

export class Skill {
  constructor(dto) {
    this.id = dto.id;
    this.name = dto.name;
   // this.professionalId = dto.professionalId ?? null;
    this.level = dto.level ?? null;
  }
}