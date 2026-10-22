import { Task } from "./types";

const API_URL = (import.meta.env.VITE_API_URL ?? "/api").replace(/\/$/, "");

async function request<T>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("focusgrid_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(body?.error ?? "Não foi possível completar a operação");
  return body as T;
}

export const authApi = {
  register: (input: { name: string; email: string; password: string }) =>
    request<{ token: string; user: User }>("/auth/register", { method: "POST", body: JSON.stringify(input) }),
  login: (input: { email: string; password: string }) =>
    request<{ token: string; user: User }>("/auth/login", { method: "POST", body: JSON.stringify(input) }),
  me: () => request<{ user: User }>("/auth/me"),
};

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const tasksApi = {
  list: (date?: string) => request<{ tasks: Task[] }>(date ? `/tasks?date=${date}` : "/tasks"),
  get: (id: string) => request<{ task: Task }>(`/tasks/${id}`),
  create: (task: Omit<Task, "id">) => request<{ task: Task }>("/tasks", { method: "POST", body: JSON.stringify(task) }),
  update: (id: string, updates: Partial<Task>) => request<{ task: Task }>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(updates) }),
  updateSubtask: (taskId: string, subtaskId: string, completed: boolean) =>
    request<{ subtask: Task["subtasks"][number] }>(`/tasks/${taskId}/subtasks/${subtaskId}`, { method: "PATCH", body: JSON.stringify({ completed }) }),
};

export interface GoalStep {
  id: string;
  title: string;
  completed: boolean;
  position: number;
}

export interface Goal {
  id: string;
  title: string;
  dream: string | null;
  description: string | null;
  progress: number;
  completed: boolean;
  completedSteps: number;
  createdAt: string;
  steps: GoalStep[];
}

export const goalsApi = {
  list: () => request<{ goals: Goal[] }>("/goals"),
  create: (input: { title: string; dream?: string }) => request<{ goal: Goal }>("/goals", { method: "POST", body: JSON.stringify(input) }),
  remove: (id: string) => request<null>(`/goals/${id}`, { method: "DELETE" }),
};

export interface RoutineStep {
  id: string;
  title: string;
  duration: string | null;
  completed: boolean;
  position: number;
}

export interface Routine {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  colorKey: string | null;
  isFavorite: boolean;
  steps: RoutineStep[];
}

export const routinesApi = {
  list: () => request<{ routines: Routine[] }>("/routines"),
  create: (input: { title: string; description?: string; icon?: string; colorKey?: string; steps: Array<{ title: string; duration?: string }> }) => request<{ routine: Routine }>("/routines", { method: "POST", body: JSON.stringify(input) }),
  update: (id: string, input: Partial<Pick<Routine, "title" | "description" | "isFavorite">>) => request<{ routine: Routine }>(`/routines/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  updateStep: (routineId: string, stepId: string, completed: boolean) => request<{ step: RoutineStep }>(`/routines/${routineId}/steps/${stepId}`, { method: "PATCH", body: JSON.stringify({ completed }) }),
};