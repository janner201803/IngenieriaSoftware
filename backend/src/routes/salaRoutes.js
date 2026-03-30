const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const salaController = require('../controllers/salaController');

// 🔥 Middleware de validación
const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

// 🔹 CREAR
router.post('/', salaController.crear);

// 🔹 LISTAR
router.get('/', salaController.listar);

// 🔹 OBTENER POR ID
router.get(
  '/:id',
  param('id').isString().notEmpty().withMessage('ID inválido'),
  validar,
  salaController.obtenerPorId
);

// 🔹 ACTUALIZAR DATOS (IMPORTANTE: antes del general)
router.put(
  '/:id/datos',
  param('id').isString().notEmpty().withMessage('ID inválido'),
  validar,
  salaController.actualizarDatos
);

// 🔹 ACTUALIZAR ESTADO (GENERAL)
router.put(
  '/:id',
  param('id').isString().notEmpty().withMessage('ID inválido'),
  validar,
  salaController.actualizar
);

// 🔹 ELIMINAR
router.delete(
  '/:id',
  param('id').isString().notEmpty().withMessage('ID inválido'),
  validar,
  salaController.eliminar
);

module.exports = router;