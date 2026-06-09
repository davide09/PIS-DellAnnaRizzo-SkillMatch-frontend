
// src/utils/validators.js

export function isNotEmpty(value) {
  return value != null && String(value).trim().length > 0;
}

export function isValidEmail(email) {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(email);
}

export function minLength(value, len) {
  if (!value) return false;
  return String(value).trim().length >= len;
}

export function isPositiveNumber(value) {
  const n = Number(value);
  return !Number.isNaN(n) && n > 0;
}