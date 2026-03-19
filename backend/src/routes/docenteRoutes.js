const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const docenteController = require('../controllers/docenteController');
const authController = require('../controllers/authController'); // <-- IMPORTACIÓN CORRECTA


// Rutas públicas (sin autenticación)
router.get('/', docenteController.listar);
router.get('/:id', param('id').isInt(), docenteController.obtenerPorId);

router.post('/api/auth/register',
  [
    body('correo').isEmail(),
    body('contraseña').isLength({ min: 6 }),
    body('idFacultad').isInt()
  ],
  docenteController.crear
);

router.put('/:id',
  [
    param('id').isInt(),
    body('correo').optional().isEmail(),
    body('contraseña').optional().isLength({ min: 6 }),
    body('idFacultad').optional().isInt()
  ],
  docenteController.actualizar
);

router.delete('/:id',
  param('id').isInt(),
  docenteController.eliminar
);

module.exports = router;