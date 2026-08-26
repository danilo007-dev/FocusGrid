import "dotenv/config";
import { app } from "./app.js";
import { prisma } from "./config/prisma.js";

const PORT = Number(process.env.PORT ?? 3000);

async function startServer() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
