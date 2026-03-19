import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (correo, contraseña) => {
    setLoading(true);
    try {
      const data = await apiLogin(correo, contraseña);
      setUser(data.usuario);
      localStorage.setItem('user', JSON.stringify(data.usuario));
      return { success: true, user: data.usuario };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (correo, contraseña, idFacultad) => {
    setLoading(true);
    try {
      const data = await apiRegister(correo, contraseña, idFacultad);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);