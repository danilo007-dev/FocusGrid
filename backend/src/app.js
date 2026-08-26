import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma } from "./config/prisma.js";
import { authRouter } from "./routes/auth.routes.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL ?? "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ name: "FocusGrid API", status: "online" });
});

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      database: "conectado",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "desconectado"
    });
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode ?? 500).json({
    error: error.statusCode ? error.message : "Erro interno do servidor"
  });
});

export { app };