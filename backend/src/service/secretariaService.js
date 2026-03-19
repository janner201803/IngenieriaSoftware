const { Secretaria, Facultad } = require('../models');

class SecretariaService {
  async crear(data) {
    if (data.idFacultad) {
      const facultad = await Facultad.findByPk(data.idFacultad);
      if (!facultad) throw new Error('Facultad no existe');
    }
    const existe = await Secretaria.findOne({ where: { correo: data.correo } });
    if (existe) throw new Error('Correo ya registrado');
    return await Secretaria.create(data);
  }

  async listar(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Secretaria.findAndCountAll({
      limit, offset,
      order: [['id', 'ASC']],
      include: [{ model: Facultad, as: 'facultad' }]
    });
    return { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page, items: rows };
  }

  async obtenerPorId(id) {
    const secretaria = await Secretaria.findByPk(id, { include: [{ model: Facultad, as: 'facultad' }] });
    if (!secretaria) throw new Error('Secretaria no encontrada');
    return secretaria;
  }

  async actualizar(id, data) {
    const secretaria = await this.obtenerPorId(id);
    if (data.correo && data.correo !== secretaria.correo) {
      const existe = await Secretaria.findOne({ where: { correo: data.correo } });
      if (existe) throw new Error('Correo ya usado');
    }
    if (data.idFacultad) {
      const facultad = await Facultad.findByPk(data.idFacultad);
      if (!facultad) throw new Error('Facultad no existe');
    }
    await secretaria.update(data);
    return secretaria;
  }

  async eliminar(id) {
    const secretaria = await this.obtenerPorId(id);
    await secretaria.destroy();
    return { message: 'Secretaria eliminada' };
  }
}

module.exports = new SecretariaService();