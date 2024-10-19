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
      const _id = localStorage.getItem('_id');
      setUser({ name, email, isAdmin, _id });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    //console.log('Received userData:', userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
