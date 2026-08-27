import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createGoal, deleteGoal, listGoals, updateGoalStep } from "../services/goal.service.js";

const goalRouter = Router();
goalRouter.use(requireAuth);

goalRouter.get("/", async (req, res, next) => { try { res.json({ goals: await listGoals(req.user.id) }); } catch (error) { next(error); } });
goalRouter.post("/", async (req, res, next) => { try { res.status(201).json({ goal: await createGoal(req.user.id, req.body) }); } catch (error) { next(error); } });
goalRouter.delete("/:goalId", async (req, res, next) => { try { await deleteGoal(req.user.id, req.params.goalId); res.status(204).send(); } catch (error) { next(error); } });
goalRouter.patch("/:goalId/steps/:stepId", async (req, res, next) => { try { res.json({ step: await updateGoalStep(req.user.id, req.params.goalId, req.params.stepId, req.body) }); } catch (error) { next(error); } });

export { goalRouter };