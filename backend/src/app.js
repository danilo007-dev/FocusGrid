import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma } from "./config/prisma.js";
import { authRouter } from "./routes/auth.routes.js";
import { taskRouter } from "./routes/task.routes.js";
import { goalRouter } from "./routes/goal.routes.js";
import { routineRouter } from "./routes/routine.routes.js";

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origem não autorizada pelo CORS"));
  }
}));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/goals", goalRouter);
app.use("/api/routines", routineRouter);

app.get("/", (req, res) => {
  res.json({ name: "FocusGrid API", status: "online" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  if (statusCode >= 500) {
    console.error("[ERROR]", error.message, error.stack);
  } else {
    console.warn(`[${statusCode}]`, error.message);
  }
  const message = statusCode >= 500 ? "Erro interno do servidor" : error.message;
  res.status(statusCode).json({ error: message });
});

export { app };