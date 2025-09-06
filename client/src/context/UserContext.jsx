// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const UserContext = createContext();

// 2. Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optional: load user from localStorage when app refreshes
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Hook to use the context
export const useUser = () => useContext(UserContext);
