const authService = require('../service/authService');
const UsuarioDTO = require('../dtos/usuarioDTO');

class AuthController {

  // 🔹 LOGIN
  async login(req, res, next) {
    try {
      const { correo, contraseña } = req.body;

      const result = await authService.login(correo, contraseña);

      // 🔥 FORMATEAR CON DTO
      const userDTO = new UsuarioDTO(result.usuario);

      // 🔥 GUARDAR EL DTO EN SESIÓN
      req.session.user = userDTO;

      res.json({
        message: 'Login exitoso',
        user: userDTO
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

      const userDTO = new UsuarioDTO(usuario);

      res.status(201).json({
        message: 'Usuario registrado',
        user: userDTO
      });

    } catch (error) {
      next(error);
    }
  }

  // 🔹 LOGOUT
  async logout(req, res, next) {
    try {
      req.session.destroy(() => {
        res.json({ message: 'Sesión cerrada' });
      });
    } catch (error) {
      next(error);
    }
  }

  // 🔹 OBTENER USUARIO LOGUEADO
  async me(req, res) {
    if (!req.session.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    res.json({
      user: req.session.user // 🔥 ya viene con facultad_nombre
    });
  }
}

module.exports = new AuthController();