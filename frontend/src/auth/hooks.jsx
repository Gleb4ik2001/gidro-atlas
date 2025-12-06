import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("access");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = async (usr, pwd) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        login: usr,
        password: pwd,
      });

      const data = res.data;

      const userData = {
        id: data.user.id,
        name: data.user.login,
        role: data.user.role,
      };

      setUser(userData);
      setToken(data.access);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);


      return {
        state: true,
        detail: "Успешный вход!",};
    } catch (e) {
      return {
        state: false,
        detail: e.response?.data?.detail || e.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

