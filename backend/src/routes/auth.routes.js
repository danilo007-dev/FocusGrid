import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const authRouter = Router();

function validateCredentials(body, includeName = false) {
  const { name, email, password } = body ?? {};

  if (includeName && (typeof name !== "string" || name.trim().length < 2)) {
    return "Nome deve ter pelo menos 2 caracteres";
  }
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    return "E-mail inválido";
  }
  if (typeof password !== "string" || password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres";
  }
  return null;
}

authRouter.post("/register", async (req, res, next) => {
  const validationError = validateCredentials(req.body, true);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  const validationError = validateCredentials(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    res.json(await loginUser(req.body));
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export { authRouter };