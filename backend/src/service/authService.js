const { Usuario, Facultad, ListaBlanca } = require('../models');

class AuthService {

  async register({ correo, contraseña, idFacultad }) {

    const facultad = await Facultad.findByPk(idFacultad);
    if (!facultad) {
      throw new Error('La facultad especificada no existe');
    }

    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      throw new Error('El correo ya está registrado');
    }

    const enListaBlanca = await ListaBlanca.findOne({ where: { correo } });

    const rol = enListaBlanca ? 'secretaria' : 'docente';

    const nuevoUsuario = await Usuario.create({
      correo,
      contraseña,
      rol,
      idFacultad
    });

    const usuarioResponse = nuevoUsuario.toJSON();
    delete usuarioResponse.contraseña;

    return usuarioResponse;
  }

  async login(correo, contraseña) {

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    if (usuario.contraseña !== contraseña) {
      throw new Error('Credenciales inválidas');
    }

    const usuarioResponse = usuario.toJSON();
    delete usuarioResponse.contraseña;

    return { usuario: usuarioResponse };
  }
}

module.exports = new AuthService();