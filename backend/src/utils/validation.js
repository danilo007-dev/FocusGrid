export function validateString(value, fieldName, minLength = 1, maxLength = 255) {
  if (typeof value !== "string" || !value.trim()) {
    const error = new Error(`${fieldName} é obrigatório`);
    error.statusCode = 400;
    throw error;
  }
  if (value.trim().length < minLength) {
    const error = new Error(`${fieldName} deve ter pelo menos ${minLength} caracteres`);
    error.statusCode = 400;
    throw error;
  }
  if (value.trim().length > maxLength) {
    const error = new Error(`${fieldName} deve ter no máximo ${maxLength} caracteres`);
    error.statusCode = 400;
    throw error;
  }
  return value.trim();
}

export function validateEmail(email) {
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    const error = new Error("E-mail inválido");
    error.statusCode = 400;
    throw error;
  }
  return email.trim().toLowerCase();
}

export function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    const error = new Error("A senha deve ter pelo menos 8 caracteres");
    error.statusCode = 400;
    throw error;
  }
  if (password.length > 128) {
    const error = new Error("A senha não pode exceder 128 caracteres");
    error.statusCode = 400;
    throw error;
  }
  return password;
}

export function validatePositiveInteger(value, fieldName) {
  if (value === undefined || value === null || value === "") return null;
  if (!Number.isInteger(value) || value < 1) {
    const error = new Error(`${fieldName} deve ser um inteiro positivo`);
    error.statusCode = 400;
    throw error;
  }
  return value;
}

export function validateBoolean(value) {
  if (typeof value !== "boolean") {
    const error = new Error("Valor deve ser um booleano");
    error.statusCode = 400;
    throw error;
  }
  return value;
}

export function validateDate(value) {
  if (value === null || value === undefined || value === "") return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    const error = new Error("Data inválida. Use o formato YYYY-MM-DD");
    error.statusCode = 400;
    throw error;
  }
  return date;
}

export function createResourceNotFoundError(resourceName) {
  const error = new Error(`${resourceName} não encontrado`);
  error.statusCode = 404;
  return error;
}

export function createValidationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}
