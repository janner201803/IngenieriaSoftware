import axios from 'axios';

// 🔥 BASE URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// 🔥 INSTANCIA AXIOS (CLAVE PARA SESIÓN)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🔥 ESTO MANTIENE LA SESIÓN
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔹 LOGIN
export const login = async (correo, contraseña) => {
  try {
    const res = await api.post('/auth/login', {
      correo,
      contraseña
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error en login'
    );
  }
};

// 🔹 REGISTER
export const register = async (correo, contraseña, idFacultad) => {
  try {
    const res = await api.post('/auth/register', {
      correo,
      contraseña,
      idFacultad
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error en registro'
    );
  }
};

// 🔹 VALIDAR SESIÓN (🔥 CORREGIDO)
export const getSession = async () => {
  try {
    const res = await api.get('/auth/session'); // 🔥 IMPORTANTE
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'No autenticado'
    );
  }
};

// 🔹 LOGOUT
export const logout = async () => {
  try {
    const res = await api.post('/auth/logout');
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al cerrar sesión'
    );
  }
};

// 🔹 FACULTADES
export const getFacultades = async () => {
  try {
    const res = await api.get('/facultades/todas');
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener facultades'
    );
  }
};

export default api;