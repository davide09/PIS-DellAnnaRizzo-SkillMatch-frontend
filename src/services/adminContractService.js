
import { apiGet } from "../hooks/useApi";

export async function getAllContracts() {
  return apiGet("/api/contracts/admin");
}