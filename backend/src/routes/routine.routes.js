import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createRoutine, listRoutines, updateRoutine, updateRoutineStep } from "../services/routine.service.js";

const routineRouter = Router();
routineRouter.use(requireAuth);

routineRouter.get("/", async (req, res, next) => { try { res.json({ routines: await listRoutines(req.user.id) }); } catch (error) { next(error); } });
routineRouter.post("/", async (req, res, next) => { try { res.status(201).json({ routine: await createRoutine(req.user.id, req.body) }); } catch (error) { next(error); } });
routineRouter.patch("/:routineId", async (req, res, next) => { try { res.json({ routine: await updateRoutine(req.user.id, req.params.routineId, req.body) }); } catch (error) { next(error); } });
routineRouter.patch("/:routineId/steps/:stepId", async (req, res, next) => { try { res.json({ step: await updateRoutineStep(req.user.id, req.params.routineId, req.params.stepId, req.body) }); } catch (error) { next(error); } });

export { routineRouter };