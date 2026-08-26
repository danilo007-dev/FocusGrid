import { getUserById, verifyToken } from "../services/auth.service.js";

export async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Token de autenticação ausente" });
  }

  try {
    const payload = verifyToken(token);
    const user = await getUserById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido" });
  }
}