const usuarioService = require('../service/usuarioService');
const UsuarioDTO = require('../dtos/usuarioDTO');

exports.listar = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const resultado = await usuarioService.listar(page, limit);

    res.json({
      ...resultado,
      items: resultado.items.map(u => new UsuarioDTO(u.toJSON()))
    });

  } catch (error) {
    next(error);
  }
};

exports.obtenerPorId = async (req, res, next) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    res.json(new UsuarioDTO(usuario.toJSON()));
  } catch (error) {
    next(error);
  }
};

exports.actualizar = async (req, res, next) => {
  try {
    const usuario = await usuarioService.actualizar(req.params.id, req.body);
    res.json(new UsuarioDTO(usuario.toJSON()));
  } catch (error) {
    next(error);
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    const resultado = await usuarioService.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};