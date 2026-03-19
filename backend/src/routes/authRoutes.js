const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const loginValidations = [
  body('correo').isEmail().withMessage('Correo inválido'),
  body('contraseña').notEmpty().withMessage('La contraseña es obligatoria')
];

const registerValidations = [
  body('correo').isEmail().withMessage('Correo inválido'),
  body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('idFacultad').isInt().withMessage('idFacultad debe ser un número entero')
];

router.post('/login', loginValidations, authController.login);
router.post('/register', registerValidations, authController.register);

module.exports = router;