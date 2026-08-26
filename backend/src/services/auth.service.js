import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

const TOKEN_EXPIRES_IN = "7d";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não configurado");
  }
  return secret;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

function createToken(user) {
  return jwt.sign({ sub: user.id }, getJwtSecret(), {
    expiresIn: TOKEN_EXPIRES_IN
  });
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name: name.trim(), email: normalizedEmail, passwordHash }
  });

  return { user: sanitizeUser(user), token: createToken(user) };
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() }
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    const error = new Error("E-mail ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  return { user: sanitizeUser(user), token: createToken(user) };
}

export async function getUserById(id) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? sanitizeUser(user) : null;
}

export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}