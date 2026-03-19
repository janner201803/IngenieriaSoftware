const { Docente, Facultad } = require('../models');

class DocenteService {
  async crear(data) {
    if (data.idFacultad) {
      const facultad = await Facultad.findByPk(data.idFacultad);
      if (!facultad) throw new Error('Facultad no existe');
    }
    const existe = await Docente.findOne({ where: { correo: data.correo } });
    if (existe) throw new Error('Correo ya registrado');

    // Guardar contraseña en texto plano (sin hash)
    return await Docente.create(data);
  }

  async listar(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Docente.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']],
      include: [{ model: Facultad, as: 'facultad' }]
    });
    return { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page, items: rows };
  }

  async obtenerPorId(id) {
    const docente = await Docente.findByPk(id, { include: [{ model: Facultad, as: 'facultad' }] });
    if (!docente) throw new Error('Docente no encontrado');
    return docente;
  }

  async actualizar(id, data) {
    const docente = await this.obtenerPorId(id);
    if (data.correo && data.correo !== docente.correo) {
      const existe = await Docente.findOne({ where: { correo: data.correo } });
      if (existe) throw new Error('Correo ya usado');
    }
    if (data.idFacultad) {
      const facultad = await Facultad.findByPk(data.idFacultad);
      if (!facultad) throw new Error('Facultad no existe');
    }
    await docente.update(data);
    return docente;
  }

  async eliminar(id) {
    const docente = await this.obtenerPorId(id);
    await docente.destroy();
    return { message: 'Docente eliminado' };
  }
}

module.exports = new DocenteService();