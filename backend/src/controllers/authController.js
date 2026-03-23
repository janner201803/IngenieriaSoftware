const authService = require('../service/authService');
const UsuarioDTO = require('../dtos/usuarioDTO');

exports.register = async (req, res, next) => {

  // 🔥 VALIDAR CON DTO
  const errors = UsuarioDTO.validarCrear(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  try {
    const nuevoUsuario = await authService.register(req.body);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: new UsuarioDTO(nuevoUsuario)
    });

  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {

  // 🔥 VALIDAR CON DTO
  const errors = UsuarioDTO.validarLogin(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  try {
    const { correo, contraseña } = req.body;

    const resultado = await authService.login(correo, contraseña);

    // 🔥 GUARDAR SESIÓN
    req.session.user = resultado.usuario;

    res.json({
      message: 'Inicio de sesión exitoso',
      usuario: new UsuarioDTO(resultado.usuario)
    });

  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
};