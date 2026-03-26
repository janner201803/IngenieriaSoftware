const authService = require('../service/authService');
const UsuarioDTO = require('../dtos/usuarioDTO');

class AuthController {

  // 🔹 LOGIN
  async login(req, res, next) {
    try {
      const { correo, contraseña } = req.body;

      const result = await authService.login(correo, contraseña);

      // 🔥 GUARDAR EN SESIÓN
      req.session.user = result.usuario;

      res.json({
        message: 'Login exitoso',
        user: new UsuarioDTO(result.usuario)
      });

    } catch (error) {
      next(error);
    }
  }

  // 🔹 REGISTER
  async register(req, res, next) {
    try {
      const { correo, contraseña, idFacultad } = req.body;

      const usuario = await authService.register({
        correo,
        contraseña,
        idFacultad
      });

      res.status(201).json({
        message: 'Usuario registrado',
        user: new UsuarioDTO(usuario)
      });

    } catch (error) {
      next(error);
    }
  }

  // 🔹 LOGOUT (🔥 IMPORTANTE)
  async logout(req, res, next) {
    try {
      req.session.destroy(() => {
        res.json({ message: 'Sesión cerrada' });
      });
    } catch (error) {
      next(error);
    }
  }

  // 🔹 OBTENER USUARIO LOGUEADO (🔥 CLAVE PARA FRONT)
  async me(req, res) {
    if (!req.session.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    res.json({
      user: req.session.user
    });
  }
}

module.exports = new AuthController();