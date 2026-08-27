import { prisma } from "../config/prisma.js";

const taskInclude = { subtasks: { orderBy: { position: "asc" } } };

function toDate(value) {
  if (value === null || value === undefined || value === "") return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    const error = new Error("scheduledDate deve ser uma data válida");
    error.statusCode = 400;
    throw error;
  }
  return date;
}

function serializeTask(task) {
  return {
    id: task.id,
    title: task.title,
    duration: task.duration,
    estimatedTime: task.estimatedTime,
    dueDate: task.scheduledDate?.toISOString().slice(0, 10) ?? null,
    completed: task.completed,
    completedAt: task.completedAt,
    progress: task.progress,
    timeOfDay: task.timeOfDay,
    color: task.color,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    subtasks: task.subtasks.map((subtask) => ({
      id: subtask.id,
      title: subtask.title,
      completed: subtask.completed,
      position: subtask.position
    }))
  };
}

function ensureTitle(title) {
  if (typeof title !== "string" || !title.trim()) {
    const error = new Error("title é obrigatório");
    error.statusCode = 400;
    throw error;
  }
  if (title.trim().length > 255) {
    const error = new Error("title deve ter no máximo 255 caracteres");
    error.statusCode = 400;
    throw error;
  }
  return title.trim();
}

function ensureOptionalNumber(value, field) {
  if (value === undefined || value === null || value === "") return value ?? null;
  if (!Number.isInteger(value) || value < 1) {
    const error = new Error(`${field} deve ser um inteiro positivo`);
    error.statusCode = 400;
    throw error;
  }
  return value;
}

async function findOwnedTask(userId, taskId) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
    include: taskInclude
  });
  if (!task) {
    const error = new Error("Tarefa não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return task;
}

export async function listTasks(userId, scheduledDate) {
  const where = { userId };
  if (scheduledDate) where.scheduledDate = toDate(scheduledDate);
  const tasks = await prisma.task.findMany({
    where,
    include: taskInclude,
    orderBy: [{ scheduledDate: "asc" }, { createdAt: "desc" }]
  });
  return tasks.map(serializeTask);
}

export async function getTask(userId, taskId) {
  return serializeTask(await findOwnedTask(userId, taskId));
}

export async function createTask(userId, input) {
  const payload = input ?? {};
  const title = ensureTitle(payload.title);
  const subtasks = payload.subtasks ?? [];
  if (!Array.isArray(subtasks)) {
    const error = new Error("subtasks deve ser uma lista");
    error.statusCode = 400;
    throw error;
  }

  const task = await prisma.task.create({
    data: {
      userId,
      title,
      duration: ensureOptionalNumber(payload.duration, "duration"),
      estimatedTime: payload.estimatedTime ?? null,
      scheduledDate: toDate(payload.dueDate ?? payload.scheduledDate),
      timeOfDay: payload.timeOfDay ?? null,
      color: payload.color ?? null,
      subtasks: {
        create: subtasks.map((subtask, position) => ({
          userId,
          title: ensureTitle(subtask.title ?? subtask),
          position
        }))
      }
    },
    include: taskInclude
  });
  return serializeTask(task);
}

export async function updateTask(userId, taskId, input) {
  const payload = input ?? {};
  await findOwnedTask(userId, taskId);
  const data = {};
  if (payload.title !== undefined) data.title = ensureTitle(payload.title);
  if (payload.duration !== undefined) data.duration = ensureOptionalNumber(payload.duration, "duration");
  if (payload.estimatedTime !== undefined) data.estimatedTime = payload.estimatedTime;
  if (payload.dueDate !== undefined || payload.scheduledDate !== undefined) {
    data.scheduledDate = toDate(payload.dueDate ?? payload.scheduledDate);
  }
  if (payload.timeOfDay !== undefined) data.timeOfDay = payload.timeOfDay;
  if (payload.color !== undefined) data.color = payload.color;
  if (payload.completed !== undefined) {
    if (typeof payload.completed !== "boolean") {
      const error = new Error("completed deve ser booleano");
      error.statusCode = 400;
      throw error;
    }
    data.completed = payload.completed;
    data.completedAt = payload.completed ? new Date() : null;
    if (payload.completed) data.progress = 100;
  }
  if (payload.completed === true) {
    await prisma.subtask.updateMany({
      where: { taskId, userId },
      data: { completed: true }
    });
  }
  const task = await prisma.task.update({
    where: { id: taskId },
    data,
    include: taskInclude
  });
  return serializeTask(task);
}

export async function deleteTask(userId, taskId) {
  await findOwnedTask(userId, taskId);
  await prisma.task.delete({ where: { id: taskId } });
}

async function findOwnedSubtask(userId, taskId, subtaskId) {
  const task = await findOwnedTask(userId, taskId);
  const subtask = task.subtasks.find((item) => item.id === subtaskId);
  if (!subtask) {
    const error = new Error("Subtarefa não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return subtask;
}

async function refreshTaskProgress(taskId) {
  const subtasks = await prisma.subtask.findMany({ where: { taskId } });
  const completedCount = subtasks.filter((subtask) => subtask.completed).length;
  const progress = subtasks.length ? (completedCount / subtasks.length) * 100 : 0;
  await prisma.task.update({
    where: { id: taskId },
    data: {
      progress,
      completed: subtasks.length > 0 && completedCount === subtasks.length,
      completedAt: subtasks.length > 0 && completedCount === subtasks.length ? new Date() : null
    }
  });
}

export async function createSubtask(userId, taskId, input) {
  await findOwnedTask(userId, taskId);
  const title = ensureTitle(input?.title);
  const subtask = await prisma.subtask.create({
    data: { taskId, userId, title, position: input.position ?? 0 }
  });
  await refreshTaskProgress(taskId);
  return subtask;
}

export async function updateSubtask(userId, taskId, subtaskId, input) {
  await findOwnedSubtask(userId, taskId, subtaskId);
  const data = {};
  if (input.title !== undefined) data.title = ensureTitle(input.title);
  if (input.position !== undefined) data.position = input.position;
  if (input.completed !== undefined) {
    if (typeof input.completed !== "boolean") {
      const error = new Error("completed deve ser booleano");
      error.statusCode = 400;
      throw error;
    }
    data.completed = input.completed;
  }
  const subtask = await prisma.subtask.update({ where: { id: subtaskId }, data });
  await refreshTaskProgress(taskId);
  return subtask;
}

export async function deleteSubtask(userId, taskId, subtaskId) {
  await findOwnedSubtask(userId, taskId, subtaskId);
  await prisma.subtask.delete({ where: { id: subtaskId } });
  await refreshTaskProgress(taskId);
}