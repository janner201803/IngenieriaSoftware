const authService = require('../service/authService');
const { validationResult } = require('express-validator');

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const nuevoUsuario = await authService.register(req.body);
    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    if (error.message === 'El correo ya está registrado' || error.message === 'La facultad especificada no existe') {
      return res.status(409).json({ error: error.message });
    }
    next(error); // Pasa el error al manejador global
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const { correo, contraseña } = req.body;
    const resultado = await authService.login(correo, contraseña);
    res.json({ message: 'Inicio de sesión exitoso', ...resultado });
  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
};