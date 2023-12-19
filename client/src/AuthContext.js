// AuthContext.js
// used for storing jsonwebtoken context throughout screens

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ token, setToken] = useState(null);
  const [ globalClientUsername, setUsername ] = useState(null);
  const [ defaultProfileColor, setColor ] = useState(null);

  const setJSONWebToken = (newToken) => {
    setToken(newToken);
  };

  const setGlobalClientUsername = (newUsername) => {
    setUsername(newUsername);
  }

  const setDefaultProfileColor = (newColor) => {
    setColor(newColor);
  }

  return (
    <AuthContext.Provider value={{ token, setJSONWebToken, globalClientUsername, setGlobalClientUsername, defaultProfileColor, setDefaultProfileColor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};