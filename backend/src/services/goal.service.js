import { prisma } from "../config/prisma.js";

const goalInclude = { steps: { orderBy: { position: "asc" } } };

function titleOf(value) {
  if (typeof value !== "string" || !value.trim()) {
    const error = new Error("title é obrigatório");
    error.statusCode = 400;
    throw error;
  }
  return value.trim();
}

function serializeGoal(goal) {
  return {
    id: goal.id,
    title: goal.title,
    dream: goal.description,
    description: goal.description,
    progress: goal.progress,
    completed: goal.completed,
    type: goal.type,
    scheduledDate: goal.scheduledDate?.toISOString().slice(0, 10) ?? null,
    completedSteps: goal.completedSteps,
    createdAt: goal.createdAt,
    updatedAt: goal.updatedAt,
    steps: goal.steps.map((step) => ({
      id: step.id,
      title: step.title,
      completed: step.completed,
      position: step.position
    }))
  };
}

async function ownedGoal(userId, goalId) {
  const goal = await prisma.goal.findFirst({ where: { id: goalId, userId }, include: goalInclude });
  if (!goal) {
    const error = new Error("Meta não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return goal;
}

async function refreshProgress(goalId) {
  const steps = await prisma.goalStep.findMany({ where: { goalId } });
  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = steps.length ? Math.round((completedSteps / steps.length) * 100) : 0;
  await prisma.goal.update({
    where: { id: goalId },
    data: { completedSteps, progress, completed: steps.length > 0 && completedSteps === steps.length }
  });
}

export async function listGoals(userId) {
  const goals = await prisma.goal.findMany({ where: { userId }, include: goalInclude, orderBy: { createdAt: "desc" } });
  return goals.map(serializeGoal);
}

export async function createGoal(userId, input) {
  const payload = input ?? {};
  const steps = Array.isArray(payload.steps) ? payload.steps : [];
  const goal = await prisma.goal.create({
    data: {
      userId,
      title: titleOf(payload.title),
      description: payload.description?.trim() || payload.dream?.trim() || null,
      type: payload.type ?? null,
      scheduledDate: payload.scheduledDate ? new Date(`${payload.scheduledDate}T00:00:00.000Z`) : null,
      steps: { create: steps.map((step, position) => ({ userId, title: titleOf(step.title ?? step), position })) }
    },
    include: goalInclude
  });
  return serializeGoal(goal);
}

export async function deleteGoal(userId, goalId) {
  await ownedGoal(userId, goalId);
  await prisma.goal.delete({ where: { id: goalId } });
}

export async function updateGoalStep(userId, goalId, stepId, input) {
  await ownedGoal(userId, goalId);
  const step = await prisma.goalStep.findFirst({ where: { id: stepId, goalId, userId } });
  if (!step) {
    const error = new Error("Passo da meta não encontrado");
    error.statusCode = 404;
    throw error;
  }
  const data = {};
  if (input.completed !== undefined) data.completed = input.completed;
  if (input.title !== undefined) data.title = titleOf(input.title);
  const updated = await prisma.goalStep.update({ where: { id: stepId }, data });
  await refreshProgress(goalId);
  return updated;
}