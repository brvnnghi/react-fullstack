import { createContext, useContext, useState, useEffect, useCallback } from "react";

import type { UserType } from "@/shared/types";

interface AuthContextType {
    // empty string means not logged in
    username: string;
    // login returns an error message if login fails, otherwise empty object
    login: (user: UserType) => Promise<{ error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('');

  // On mount, check if user is already logged in
  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.username) setUsername(data.username);
        }
      } catch {
        return;
      }
    }
    fetchMe();
  }, []);

  // Login function that calls the API and updates state
  const login = useCallback(async (user: UserType) => {
    // Call the login API with username and password
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    // If login fails, return the error message
    if (!res.ok) {
      const data = await res.json();
      return { error: data.error || "Login failed" };
    }
    const data = await res.json();
    // If login succeeds, update the username in state
    // in production, we should pass the whole user object
    setUsername(data.username);
    return {};
  }, []);

  // Logout function that calls the API and updates state
  const logout = useCallback(() => {
    fetch("/api/auth/logout", { method: "POST" });
    setUsername('');
  }, []);

  return (
    // Provide the username and auth functions to the rest of the app
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
