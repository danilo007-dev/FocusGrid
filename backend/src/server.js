import "dotenv/config";
import { app } from "./app.js";
import { prisma } from "./config/prisma.js";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

async function startServer() {
  app.listen(PORT, HOST, async () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
    try {
      await prisma.$connect();
      console.log("Conexão com o banco de dados estabelecida");
    } catch (error) {
      console.error("Erro ao conectar com o banco de dados:", error.message);
    }
  });
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
