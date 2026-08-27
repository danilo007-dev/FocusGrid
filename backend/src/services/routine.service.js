import { prisma } from "../config/prisma.js";

const routineInclude = { steps: { orderBy: { position: "asc" } } };

function titleOf(value) {
  if (typeof value !== "string" || !value.trim()) {
    const error = new Error("title é obrigatório");
    error.statusCode = 400;
    throw error;
  }
  return value.trim();
}

function serializeRoutine(routine) {
  return {
    id: routine.id,
    title: routine.title,
    description: routine.description,
    icon: routine.icon,
    colorKey: routine.colorKey,
    isFavorite: routine.isFavorite,
    scheduledDate: routine.scheduledDate?.toISOString().slice(0, 10) ?? null,
    createdAt: routine.createdAt,
    updatedAt: routine.updatedAt,
    steps: routine.steps.map((step) => ({
      id: step.id,
      title: step.title,
      duration: step.duration,
      completed: step.completed,
      position: step.position
    }))
  };
}

async function ownedRoutine(userId, routineId) {
  const routine = await prisma.routine.findFirst({ where: { id: routineId, userId }, include: routineInclude });
  if (!routine) {
    const error = new Error("Rotina não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return routine;
}

export async function listRoutines(userId) {
  const routines = await prisma.routine.findMany({ where: { userId }, include: routineInclude, orderBy: { createdAt: "desc" } });
  return routines.map(serializeRoutine);
}

export async function createRoutine(userId, input) {
  const steps = Array.isArray(input?.steps) ? input.steps : [];
  if (steps.length === 0) {
    const error = new Error("A rotina precisa de pelo menos um passo");
    error.statusCode = 400;
    throw error;
  }
  const routine = await prisma.routine.create({
    data: {
      userId,
      title: titleOf(input?.title),
      description: input.description?.trim() || null,
      icon: input.icon ?? null,
      colorKey: input.colorKey ?? null,
      isFavorite: Boolean(input.isFavorite),
      steps: { create: steps.map((step, position) => ({ userId, title: titleOf(step.title), duration: step.duration?.trim() || null, position })) }
    },
    include: routineInclude
  });
  return serializeRoutine(routine);
}

export async function updateRoutine(userId, routineId, input) {
  await ownedRoutine(userId, routineId);
  const data = {};
  if (input.isFavorite !== undefined) data.isFavorite = Boolean(input.isFavorite);
  if (input.title !== undefined) data.title = titleOf(input.title);
  if (input.description !== undefined) data.description = input.description;
  const routine = await prisma.routine.update({ where: { id: routineId }, data, include: routineInclude });
  return serializeRoutine(routine);
}

export async function updateRoutineStep(userId, routineId, stepId, input) {
  await ownedRoutine(userId, routineId);
  const step = await prisma.routineStep.findFirst({ where: { id: stepId, routineId, userId } });
  if (!step) {
    const error = new Error("Passo da rotina não encontrado");
    error.statusCode = 404;
    throw error;
  }
  const data = {};
  if (input.completed !== undefined) data.completed = Boolean(input.completed);
  if (input.title !== undefined) data.title = titleOf(input.title);
  const updated = await prisma.routineStep.update({ where: { id: stepId }, data });
  return updated;
}