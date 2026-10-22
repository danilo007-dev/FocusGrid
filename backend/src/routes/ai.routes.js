import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { chat } from "../services/ai.service.js";

const aiRouter = Router();
aiRouter.use(requireAuth);

aiRouter.post("/chat", async (req, res, next) => {
  try {
    res.json({ response: await chat(req.body) });
  } catch (error) {
    next(error);
  }
});

export { aiRouter };
