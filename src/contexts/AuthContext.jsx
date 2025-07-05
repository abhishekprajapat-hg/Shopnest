import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("shopnest-user");
    return stored ? JSON.parse(stored) : null;
  });

  const signup = (name, email, password) => {
    const userData = { name, email, password };
    localStorage.setItem("shopnest-user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = (email, password) => {
    const stored = JSON.parse(localStorage.getItem("shopnest-user"));

    if (!stored) return false;
    if (stored.email === email && stored.password === password) {
      setUser(stored);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    // Optional: remove stored user to force re-login next time
    // localStorage.removeItem("shopnest-user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
