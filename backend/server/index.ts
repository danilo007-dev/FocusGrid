import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// GET: Retornar todas as tasks com suas subtasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { subtasks: true },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tasks." });
  }
});

// POST: Criar uma nova task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, duration, estimatedTime, timeOfDay, dueDate, color } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        duration,
        estimatedTime,
        timeOfDay,
        dueDate,
        color,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar task." });
  }
});

// GET: Progresso do dia
app.get("/api/progress/:date", async (req, res) => {
  try {
    const { date } = req.params;
    let progress = await prisma.dayProgress.findUnique({
      where: { date },
    });
    
    // Se não existir, retornar o valor limpo (ou criar na hora)
    if (!progress) {
      progress = await prisma.dayProgress.create({
        data: { date }
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar progresso." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
