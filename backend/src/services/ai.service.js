import { GoogleGenAI } from "@google/genai";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-flash-lite-latest";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_ITEMS = 20;
const MAX_CONTEXT_LENGTH = 6000;
const MODES = new Set(["destravar", "quebrar", "meta", "planejar"]);

const SYSTEM_INSTRUCTION = `
Você é o assistente do FocusGrid, uma assistente executiva pessoal para reduzir a distância entre intenção e ação.
Fale sempre em português brasileiro, com tom calmo, acolhedor, simples e objetivo.
Priorize respostas curtas e um próximo passo pequeno e concreto. Faça perguntas apenas quando uma informação for realmente necessária.
Não julgue, não use culpa nem motivação genérica. Não diagnostique TDAH e não substitua profissionais de saúde.
Não invente tarefas, horários, preferências ou dados pessoais. Não afirme que uma alteração foi salva: você apenas recomenda e conversa.
`;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error("GEMINI_API_KEY não configurada no backend");
    error.statusCode = 503;
    throw error;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

function validateChatInput(input) {
  if (!input || typeof input !== "object") {
    const error = new Error("Corpo da requisição inválido");
    error.statusCode = 400;
    throw error;
  }

  if (typeof input.message !== "string" || !input.message.trim()) {
    const error = new Error("message é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  if (input.message.trim().length > MAX_MESSAGE_LENGTH) {
    const error = new Error(`message deve ter no máximo ${MAX_MESSAGE_LENGTH} caracteres`);
    error.statusCode = 400;
    throw error;
  }

  const history = Array.isArray(input.history) ? input.history : [];
  if (history.length > MAX_HISTORY_ITEMS) {
    const error = new Error(`history deve ter no máximo ${MAX_HISTORY_ITEMS} mensagens`);
    error.statusCode = 400;
    throw error;
  }

  const validHistory = history.map((item) => {
    if (!item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string") {
      const error = new Error("history contém uma mensagem inválida");
      error.statusCode = 400;
      throw error;
    }
    return { role: item.role, content: item.content.slice(0, MAX_MESSAGE_LENGTH) };
  });

  const mode = input.mode ?? "destravar";
  if (!MODES.has(mode)) {
    const error = new Error("mode inválido");
    error.statusCode = 400;
    throw error;
  }

  if (input.context !== undefined && typeof input.context !== "string") {
    const error = new Error("context deve ser texto");
    error.statusCode = 400;
    throw error;
  }

  return {
    message: input.message.trim(),
    history: validHistory,
    mode,
    context: input.context?.slice(0, MAX_CONTEXT_LENGTH) ?? "",
  };
}

export async function chat(input) {
  const { message, history, mode, context } = validateChatInput(input);
  const modeInstruction = {
    destravar: "Ajude a pessoa a começar com uma ação de até 10 minutos.",
    quebrar: "Transforme a tarefa em 3 a 6 passos pequenos, concretos e ordenados.",
    meta: "Conecte a meta a uma próxima ação realista, sem inventar prazo ou compromisso.",
    planejar: "Ajude a escolher o que fazer agora considerando o contexto disponível e poucas opções.",
  }[mode];
  const contextualMessage = `${modeInstruction}\n\nContexto atual do FocusGrid:\n${context || "Nenhum contexto adicional foi fornecido."}\n\nPedido do usuário:\n${message}`;
  const contents = [
    ...history.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content }],
    })),
    { role: "user", parts: [{ text: contextualMessage }] },
  ];

  try {
    const response = await getClient().models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 500,
        temperature: 0.6,
      },
    });
    const text = response.text?.trim();
    if (!text) throw new Error("Resposta vazia do Gemini");
    return { text };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("[AI] Falha ao consultar o Gemini:", error.message);
    const safeError = new Error("Não foi possível obter uma resposta da IA agora");
    safeError.statusCode = 502;
    throw safeError;
  }
}
