import { FormEvent, useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../auth";

export function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "register") await register(name, email, password);
      else await login(email, password);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível entrar");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-5">
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
            {mode === "login" ? <LogIn className="size-7" /> : <UserPlus className="size-7" />}
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-4">{mode === "login" ? "Entrar no FocusGrid" : "Criar sua conta"}</h1>
          <p className="text-gray-600 mt-1">Seus dados ficam sincronizados com o backend.</p>
        </div>
        {mode === "register" && <input required minLength={2} value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome" className="w-full rounded-xl border border-gray-200 px-4 py-3" />}
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-mail" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
        <input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha (mínimo 8 caracteres)" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <button disabled={submitting} className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium disabled:opacity-50">
          {submitting ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
        </button>
        <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="w-full text-gray-600 py-2 text-sm">
          {mode === "login" ? "Ainda não tenho uma conta" : "Já tenho uma conta"}
        </button>
      </form>
    </div>
  );
}