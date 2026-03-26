import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 VERIFICAR SESIÓN AL RECARGAR
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await api.getSession(); // 🔥 endpoint /auth/session
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkSession();
  }, []);

  // 🔹 LOGIN
  const login = async (correo, contraseña) => {
    setLoading(true);
    try {
      const data = await api.login(correo, contraseña);

      // 🔥 guardar usuario en estado
      setUser(data.user);

      return { success: true, user: data.user };

    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al iniciar sesión'
      };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 REGISTER
  const register = async (correo, contraseña, idFacultad) => {
    setLoading(true);
    try {
      const data = await api.register(correo, contraseña, idFacultad);

      return { success: true, user: data.user };

    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al registrar'
      };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOGOUT
  const logout = async () => {
    try {
      await api.logout(); // 🔥 endpoint /auth/logout
      setUser(null);
    } catch (error) {
      console.error('Error cerrando sesión', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook personalizado
export const useAuth = () => useContext(AuthContext);