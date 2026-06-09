
import { apiPost, apiGet } from "../hooks/useApi";

// CREA PROPOSTA (con payload completo)
export async function createProposal(payload) {
  return apiPost("/api/contracts/proposals", payload);
}

export async function getProposalsForProfessional(professionalId) {
  return apiGet(`/api/contracts/proposals/ofProfessional/${professionalId}`);
}

export async function acceptProposal(contractId) {
  return apiPost(`/api/contracts/proposals/${contractId}/accept`);
}

export async function rejectProposal(contractId) {
  return apiPost(`/api/contracts/proposals/${contractId}/reject`);
}

export async function listContractsForCompany(companyId) {
  return apiGet(`/api/contracts/company/${companyId}`);
}

export async function listContractsForProfessional(professionalId) {
  return apiGet(`/api/contracts/professional/${professionalId}`);
}

export async function getContractById(id) {
  return apiGet(`/api/contracts/${id}`);
}

export async function startContract(id) {
  return apiPost(`/api/contracts/${id}/start`);
}

export async function completeContract(id) {
  return apiPost(`/api/contracts/${id}/complete`);
}

export async function payContract(id) {
  return apiPost(`/api/contracts/${id}/pay`);
}

export function getInvoiceById(invoiceId) {
  return apiGet(`/api/contracts/invoices/${invoiceId}`);
}