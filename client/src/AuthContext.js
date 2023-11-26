// AuthContext.js
// used for storing jsonwebtoken context throughout screens

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const setJSONWebToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setJSONWebToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};