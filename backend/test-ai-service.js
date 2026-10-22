import assert from "node:assert/strict";
import { chat } from "./src/services/ai.service.js";

delete process.env.GEMINI_API_KEY;

try {
  await chat({ message: "teste", history: [] });
  throw new Error("O serviço deveria rejeitar a ausência da chave");
} catch (error) {
  assert.equal(error.statusCode, 503);
  assert.match(error.message, /GEMINI_API_KEY/);
  console.log("OK: ausência da chave Gemini é reportada sem chamada externa");
}
