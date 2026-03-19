// Backend/src/controllers/secretariaController.js
const secretariaService = require('../service/secretariaService');
const { validationResult } = require('express-validator');

/**
 * Obtener listado de secretarias con paginación
 * GET /api/secretarias?page=1&limit=10
 */
exports.listar = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const resultado = await secretariaService.listar(page, limit);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener una secretaria por ID
 * GET /api/secretarias/:id
 */
exports.obtenerPorId = async (req, res, next) => {
  try {
    const secretaria = await secretariaService.obtenerPorId(req.params.id);
    res.json(secretaria);
  } catch (error) {
    next(error);
  }
};

/**
 * Crear una nueva secretaria
 * POST /api/secretarias
 */
exports.crear = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
    const nueva = await secretariaService.crear(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar una secretaria existente
 * PUT /api/secretarias/:id
 */
exports.actualizar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
    const actualizada = await secretariaService.actualizar(req.params.id, req.body);
    res.json(actualizada);
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar una secretaria
 * DELETE /api/secretarias/:id
 */
exports.eliminar = async (req, res, next) => {
  try {
    const resultado = await secretariaService.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};