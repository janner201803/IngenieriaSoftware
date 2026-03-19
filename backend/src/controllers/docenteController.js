const docenteService = require('../service/docenteService');
const { validationResult } = require('express-validator');

exports.listar = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const resultado = await docenteService.listar(page, limit);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

exports.obtenerPorId = async (req, res, next) => {
  try {
    const docente = await docenteService.obtenerPorId(req.params.id);
    res.json(docente);
  } catch (error) {
    next(error);
  }
};

exports.crear = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
  try {
    const nuevo = await docenteService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
};

exports.actualizar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
  try {
    const actualizado = await docenteService.actualizar(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    next(error);
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    const resultado = await docenteService.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};