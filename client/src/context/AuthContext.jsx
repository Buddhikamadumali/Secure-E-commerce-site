import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    if (data.token) {
    localStorage.setItem("token", data.token); // store token separately
  }
  };

  const logout = () => {
  setUser(null);
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
};


  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
