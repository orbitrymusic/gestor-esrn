import React, { createContext, useContext, useState, useCallback } from 'react';
import type { SessionUser } from './auth.types';
import { loginComo } from './auth.service';

type SessionContextValue = {
  user: SessionUser | null;
  isLoading: boolean;
  login: (personalId: string) => Promise<void>;
  logout: () => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Nota: el estado vive solo en memoria, se pierde al recargar la app.
  // Es intencional para esta fase mock; cuando haya sesión real de Supabase
  // se agrega persistencia (token en secure-storage) acá adentro, sin que
  // ninguna pantalla que use useSession() se entere del cambio.
  const login = useCallback(async (personalId: string) => {
    setIsLoading(true);
    try {
      const loggedUser = await loginComo(personalId);
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <SessionContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession debe usarse dentro de un <SessionProvider>');
  }
  return ctx;
}
