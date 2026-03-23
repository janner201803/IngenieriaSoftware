class UsuarioDTO {

  constructor(data) {
    const usuario = data.dataValues ? data.dataValues : data;

    this.id = usuario.id;
    this.correo = usuario.correo;
    this.rol = usuario.rol;
    this.idFacultad = usuario.idFacultad;

    if (usuario.facultad) {
      this.facultad = {
        id: usuario.facultad.id,
        nombre: usuario.facultad.nombre
      };
    }
  }

  // 🔥 VALIDAR REGISTRO
  static validarCrear(data) {
    const errors = [];

    if (!data.correo || data.correo.trim() === '') {
      errors.push('El correo es obligatorio');
    }

    if (!data.contraseña || data.contraseña.trim() === '') {
      errors.push('La contraseña es obligatoria');
    }

    if (!data.idFacultad) {
      errors.push('La facultad es obligatoria');
    }

    return errors;
  }

  // 🔥 VALIDAR LOGIN
  static validarLogin(data) {
    const errors = [];

    if (!data.correo || data.correo.trim() === '') {
      errors.push('El correo es obligatorio');
    }

    if (!data.contraseña || data.contraseña.trim() === '') {
      errors.push('La contraseña es obligatoria');
    }

    return errors;
  }
}

module.exports = UsuarioDTO;