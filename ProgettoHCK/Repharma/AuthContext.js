import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      if (savedEmail) setUserEmail(savedEmail);
    };
    loadUser();
  }, []);

  const login = async (email) => {
    setUserEmail(email);
    await AsyncStorage.setItem('userEmail', email);
  };

  const logout = async () => {
    setUserEmail(null);
    await AsyncStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
