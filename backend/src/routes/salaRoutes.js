const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const salaController = require('../controllers/salaController');

router.post('/', salaController.crear);

router.get('/', salaController.listar);

router.get('/:id',
  param('id').isInt(),
  salaController.obtenerPorId
);

router.put('/:id',
  param('id').isInt(),
  salaController.actualizar
);

router.delete('/:id',
  param('id').isInt(),
  salaController.eliminar
);

module.exports = router;