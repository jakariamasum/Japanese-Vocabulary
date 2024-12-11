/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import axiosPublic from "../lib/axiosPublic";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const res = await axiosPublic.get("/auth/me");
          setUser(res.data.data.user);
        } catch (error) {
          console.error("Error checking authentication", error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const res = await axiosPublic.post("/auth/login", { email, password });
    console.log(res.data.data);
    if (res.data.success) {
      localStorage.setItem("authToken", res.data.data.token);
      toast.success(res.data.message);
      setUser(res.data.data.user);
      return res.data.data.user;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const register = async (name, email, password, photoUrl) => {
    const formData = { name, email, password, photoUrl };

    const res = await axiosPublic.post("/auth/register", formData);
    console.log(res.data.success);
    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
