const { Docente, Secretaria, Facultad, ListaBlanca } = require('../models');

class AuthService {
  // Registro de usuario
  async register({ correo, contraseña, idFacultad }) {
    // Verificar que la facultad exista
    const facultad = await Facultad.findByPk(idFacultad);
    if (!facultad) {
      throw new Error('La facultad especificada no existe');
    }

    // Verificar si el correo ya está registrado en docente o secretaria
    const existeDocente = await Docente.findOne({ where: { correo } });
    const existeSecretaria = await Secretaria.findOne({ where: { correo } });
    if (existeDocente || existeSecretaria) {
      throw new Error('El correo ya está registrado');
    }

    // Verificar lista blanca
    const enListaBlanca = await ListaBlanca.findOne({ where: { correo } });

    let nuevoUsuario;
    if (enListaBlanca) {
      nuevoUsuario = await Secretaria.create({ correo, contraseña, idFacultad });
    } else {
      nuevoUsuario = await Docente.create({ correo, contraseña, idFacultad });
    }

    const usuarioResponse = nuevoUsuario.toJSON();
    delete usuarioResponse.contraseña;
    return usuarioResponse;
  }

  // Login
  async login(correo, contraseña) {
    let usuario = await Docente.findOne({ where: { correo } });
    let rol = 'docente';

    if (!usuario) {
      usuario = await Secretaria.findOne({ where: { correo } });
      rol = 'secretaria';
    }

    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    // Comparar contraseñas en texto plano (sin hash)
    if (usuario.contraseña !== contraseña) {
      throw new Error('Credenciales inválidas');
    }

    const usuarioResponse = usuario.toJSON();
    delete usuarioResponse.contraseña;
    return { usuario: { ...usuarioResponse, rol } };
  }
}

module.exports = new AuthService();