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
  body('contraseña').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
  body('idFacultad').isInt().withMessage('Debe ser número')
];

router.post('/login', loginValidations, authController.login);
router.post('/register', registerValidations, authController.register);

// 🔥 NUEVAS
router.post('/logout', authController.logout);
router.get('/me', authController.me);

module.exports = router;