import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (correo, contraseña) => {
    try {
      const data = await api.login(correo, contraseña);
      if (data?.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Respuesta inválida' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (correo, contraseña, idFacultad) => {
    try {
      const data = await api.register(correo, contraseña, idFacultad);
      if (data?.user) {
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Respuesta inválida' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    api.logout().catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);