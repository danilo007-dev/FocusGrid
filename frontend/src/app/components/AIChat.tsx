import { useEffect, useRef, useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { aiApi } from "../api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Estou aqui para te ajudar a começar. O que você precisa fazer hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionWarning, setConnectionWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getFallbackResponse = (userMessage: string) => {
    const lower = userMessage.toLowerCase();
    if (lower.includes("não consigo") || lower.includes("difícil")) {
      return "Vamos deixar isso menor: qual é a primeira ação de dois minutos que você consegue fazer agora? Pode ser abrir o arquivo, separar o material ou escrever uma frase.";
    }
    if (lower.includes("estudar")) {
      return "Comece assim:\n1. Separe o material\n2. Abra o conteúdo\n3. Leia apenas um parágrafo\n\nQuando terminar o primeiro passo, me conte como foi.";
    }
    if (lower.includes("cansado")) {
      return "Tudo bem diminuir o ritmo. Escolha uma tarefa pequena, de menos de cinco minutos, e faça somente o primeiro movimento.";
    }
    return "Vamos escolher um passo pequeno e possível. Qual parte dessa tarefa você consegue iniciar agora?";
  };

  const callAssistantAPI = async (userMessage: string, history: Message[]) => {
    try {
      const apiMessages = history
        .filter((message) => message.id !== "1")
        .slice(-12)
        .map(({ role, content }) => ({ role, content }));
      const { response } = await aiApi.chat({
        message: userMessage,
        mode: "destravar",
        history: apiMessages,
      });
      setConnectionWarning(false);
      return response.text;
    } catch {
      setConnectionWarning(true);
      return getFallbackResponse(userMessage);
    }
  };

  const handleSend = async () => {
    const message = input.trim();
    if (!message || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    const responseText = await callAssistantAPI(message, messages);
    setMessages([
      ...nextMessages,
      { id: `${Date.now()}-assistant`, role: "assistant", content: responseText },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] max-w-2xl flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Assistente IA</h1>
        <p className="mt-1 text-gray-500">Converse comigo sobre suas tarefas</p>
      </header>

      <div className="mb-4 flex-1 space-y-4 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="mr-3 mt-1 flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-600">
                  <Sparkles className="size-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "rounded-br-sm bg-purple-600 text-white"
                    : "rounded-bl-sm border border-gray-200 bg-white text-gray-900 shadow-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex size-9 items-center justify-center rounded-full bg-purple-600">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex h-4 items-center gap-1.5">
                {[0, 0.2, 0.4].map((delay) => (
                  <motion.div
                    key={delay}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay }}
                    className="size-2 rounded-full bg-purple-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm transition-colors focus:border-purple-500 focus:outline-none"
            disabled={isTyping}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            aria-label="Enviar mensagem"
            className="flex size-14 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="size-5" />
          </motion.button>
        </div>

        <div className="rounded-xl border border-purple-100 bg-purple-50 px-4 py-3">
          <p className="text-xs text-purple-700">
            <strong>Dica:</strong> Pergunte como começar uma tarefa ou compartilhe o que está dificultando seu próximo passo.
          </p>
        </div>

        {connectionWarning && (
          <p className="text-xs text-amber-700">
            A IA está temporariamente indisponível. Mostrando uma sugestão local enquanto a conexão volta.
          </p>
        )}
      </div>
    </div>
  );
}
