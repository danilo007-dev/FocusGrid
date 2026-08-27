import { createContext, useContext, useEffect, useState } from "react";
import { authApi, User } from "./api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("focusgrid_token")) {
      setLoading(false);
      return;
    }
    authApi.me()
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => localStorage.removeItem("focusgrid_token"))
      .finally(() => setLoading(false));
  }, []);

  const saveSession = ({ token, user: nextUser }: { token: string; user: User }) => {
    localStorage.setItem("focusgrid_token", token);
    setUser(nextUser);
  };

  const value: AuthContextValue = {
    user,
    loading,
    login: async (email, password) => saveSession(await authApi.login({ email, password })),
    register: async (name, email, password) => saveSession(await authApi.register({ name, email, password })),
    logout: () => {
      localStorage.removeItem("focusgrid_token");
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}