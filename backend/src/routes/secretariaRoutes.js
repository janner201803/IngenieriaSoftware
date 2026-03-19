const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const secretariaController = require('../controllers/secretariaController');

// Rutas públicas
router.get('/', secretariaController.listar);
router.get('/:id', param('id').isInt(), secretariaController.obtenerPorId);

router.post('/',
  [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('idFacultad').isInt().withMessage('idFacultad debe ser un número entero')
  ],
  secretariaController.crear
);

router.put('/:id',
  [
    param('id').isInt(),
    body('correo').optional().isEmail(),
    body('contraseña').optional().isLength({ min: 6 }),
    body('idFacultad').optional().isInt()
  ],
  secretariaController.actualizar
);

router.delete('/:id',
  param('id').isInt(),
  secretariaController.eliminar
);

module.exports = router;