
// src/interfaces/Contract.js

export class Contract {
  constructor(dto) {
    this.id = dto.id;
    this.projectId = dto.projectId;
    this.companyId = dto.companyId;
    this.professionalId = dto.professionalId;

    this.description = dto.description ?? "";
    this.status = dto.status;

    this.price = dto.price ?? null;
    this.commissionFee = dto.commissionFee ?? null;

    this.invoiceId = dto.invoiceId ?? null;

    this.createdAt = dto.createdAt ?? null;
    this.updatedAt = dto.updatedAt ?? null;
  }
}