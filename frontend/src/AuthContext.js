import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kontrollera om token finns i localStorage när appen laddas
    const token = localStorage.getItem('token');
    if (token) {
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      setUser({ name, email, isAdmin });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
