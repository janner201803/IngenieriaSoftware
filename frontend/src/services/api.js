// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Obtener la lista de todas las facultades (sin paginación)
 * @returns {Promise<Array>} Lista de facultades
 */
export const getFacultades = async () => {
  const res = await fetch(`${API_URL}/facultades/todas`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al obtener facultades');
  }
  return res.json();
};

/**
 * Iniciar sesión
 * @param {string} correo
 * @param {string} contraseña
 * @returns {Promise<Object>} Datos del usuario y mensaje
 */
export const login = async (correo, contraseña) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error en el login');
  }
  return res.json();
};

/**
 * Registrar un nuevo usuario (docente o secretaria según lista blanca)
 * @param {string} correo
 * @param {string} contraseña
 * @param {number} idFacultad
 * @returns {Promise<Object>} Datos del usuario creado
 */
export const register = async (correo, contraseña, idFacultad) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña, idFacultad }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error en el registro');
  }
  return res.json();
};