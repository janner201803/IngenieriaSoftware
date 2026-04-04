const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const reservaController = require('../controllers/reservaController');

const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

// 🔹 CREAR
router.post('/', reservaController.crear);

// 🔹 LISTAR (MANEJA TODO: con o sin fecha)
router.get('/', reservaController.listar);

// 🔹 OBTENER POR ID
router.get('/:id',
  param('id').isInt(),
  validar,
  reservaController.obtenerPorId
);

// 🔹 ACTUALIZAR
router.put('/:id',
  param('id').isInt(),
  validar,
  reservaController.actualizar
);

// 🔹 ELIMINAR
router.delete('/:id',
  param('id').isInt(),
  validar,
  reservaController.eliminar
);

module.exports = router;