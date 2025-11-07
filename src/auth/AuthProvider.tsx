import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthState } from "../types";
import { mockUsers } from "../mock/users";

interface AuthContextType {
  auth: AuthState | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AUTH_STORAGE_KEY = "smartlamp_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null);

  // Load auth from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: AuthState = JSON.parse(stored);
        // Check if token is expired
        if (parsed.exp > Date.now()) {
          setAuth(parsed);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate async login
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const authState: AuthState = {
        email: user.email,
        token: `token_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      setAuth(authState);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
      return true;
    }

    return false;
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        isAuthenticated: !!auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

