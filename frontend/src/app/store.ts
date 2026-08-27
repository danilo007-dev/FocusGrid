import { Task } from "./types";
import { tasksApi } from "./api";

// Simple in-memory store for demo purposes
class TaskStore {
  private tasks: Task[] = [];

  private listeners: Array<() => void> = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  getTask(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  async loadTasks() {
    const result = await tasksApi.list();
    this.tasks = result.tasks;
    this.notify();
    return this.tasks;
  }

  async loadTask(id: string) {
    const result = await tasksApi.get(id);
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) this.tasks.push(result.task);
    else this.tasks[index] = result.task;
    this.notify();
    return result.task;
  }

  async addTask(task: Omit<Task, "id">) {
    const { task: newTask } = await tasksApi.create(task);
    this.tasks.push(newTask);
    this.notify();
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>) {
    const { task } = await tasksApi.update(id, updates);
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index !== -1) this.tasks[index] = task;
    else this.tasks.push(task);
    this.notify();
    return task;
  }

  async toggleSubtask(taskId: string, subtaskId: string) {
    const task = this.tasks.find((item) => item.id === taskId);
    const subtask = task?.subtasks.find((item) => item.id === subtaskId);
    if (!subtask) return;
    await tasksApi.updateSubtask(taskId, subtaskId, !subtask.completed);
    return this.loadTask(taskId);
  }

  async completeTask(id: string) {
    return this.updateTask(id, { completed: true, progress: 100 });
  }

  getCompletedTasksCount(): number {
    return this.tasks.filter((t) => t.completed).length;
  }

  getTotalTasksCount(): number {
    return this.tasks.length;
  }

  // Mock AI task breakdown
  breakdownTask(taskTitle: string): { 
    task: string; 
    subtasks: string[]; 
    estimatedTime: string;
    encouragement: string;
  } {
    const keywords = taskTitle.toLowerCase();
    
    if (keywords.includes("estudar") || keywords.includes("study")) {
      return {
        task: taskTitle,
        subtasks: [
          "Separar material necessário",
          "Ler o conteúdo",
          "Fazer anotações",
          "Revisar pontos principais",
        ],
        estimatedTime: "30 min",
        encouragement: "Vamos começar pequeno. Apenas abra o material primeiro!",
      };
    }
    
    if (keywords.includes("trabalho") || keywords.includes("project")) {
      return {
        task: taskTitle,
        subtasks: [
          "Abrir o documento",
          "Escrever o primeiro parágrafo",
          "Pesquisar informações",
          "Organizar ideias",
        ],
        estimatedTime: "45 min",
        encouragement: "Um passo de cada vez. Que tal apenas abrir o documento?",
      };
    }
    
    // Default breakdown
    return {
      task: taskTitle,
      subtasks: [
        "Preparar o que é necessário",
        "Começar a primeira parte",
        "Continuar o trabalho",
        "Finalizar",
      ],
      estimatedTime: "15 min",
      encouragement: "Vamos tornar isso simples. Comece com o primeiro passo!",
    };
  }
}

export const taskStore = new TaskStore();
