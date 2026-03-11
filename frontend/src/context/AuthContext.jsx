/**
 * context/AuthContext.jsx
 * Safe localStorage handling — corrupted data won't cause blank screen.
 */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cert_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.user_id && parsed.token) {
          setUser(parsed);
        } else {
          localStorage.removeItem("cert_user");
        }
      }
    } catch (e) {
      console.warn("Corrupted auth data cleared.");
      localStorage.removeItem("cert_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem("cert_user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to persist login", e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cert_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
