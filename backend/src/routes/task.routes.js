import { Router } from "express";
import {
  createSubtask,
  createTask,
  deleteSubtask,
  deleteTask,
  getTask,
  listTasks,
  updateSubtask,
  updateTask
} from "../services/task.service.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const taskRouter = Router();
taskRouter.use(requireAuth);

taskRouter.get("/", async (req, res, next) => {
  try {
    res.json({ tasks: await listTasks(req.user.id, req.query.date) });
  } catch (error) {
    next(error);
  }
});

taskRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).json({ task: await createTask(req.user.id, req.body) });
  } catch (error) {
    next(error);
  }
});

taskRouter.get("/:taskId", async (req, res, next) => {
  try {
    res.json({ task: await getTask(req.user.id, req.params.taskId) });
  } catch (error) {
    next(error);
  }
});

taskRouter.patch("/:taskId", async (req, res, next) => {
  try {
    res.json({ task: await updateTask(req.user.id, req.params.taskId, req.body) });
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/:taskId", async (req, res, next) => {
  try {
    await deleteTask(req.user.id, req.params.taskId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

taskRouter.post("/:taskId/subtasks", async (req, res, next) => {
  try {
    res.status(201).json({
      subtask: await createSubtask(req.user.id, req.params.taskId, req.body)
    });
  } catch (error) {
    next(error);
  }
});

taskRouter.patch("/:taskId/subtasks/:subtaskId", async (req, res, next) => {
  try {
    res.json({
      subtask: await updateSubtask(
        req.user.id,
        req.params.taskId,
        req.params.subtaskId,
        req.body
      )
    });
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/:taskId/subtasks/:subtaskId", async (req, res, next) => {
  try {
    await deleteSubtask(req.user.id, req.params.taskId, req.params.subtaskId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { taskRouter };