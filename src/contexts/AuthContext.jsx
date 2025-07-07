import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("shopnest-user");
    return stored ? JSON.parse(stored) : null;
  });

  const signup = (name, email, password) => {
    const userData = { name, email, password, orders: [] };
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
    localStorage.removeItem("shopnest-user");
  };

  // ✅ FIXED: Now it uses `user` and `setUser` in correct scope
  const saveOrder = (order) => {
    const updatedUser = {
      ...user,
      orders: [...(user?.orders || []), order],
    };
    setUser(updatedUser);
    localStorage.setItem("shopnest-user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, saveOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
