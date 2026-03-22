const { Sala } = require('../models');

class SalaService {

  async crear(data) {

    // 🔥 evitar IDs repetidos
    const existe = await Sala.findByPk(data.id);
    if (existe) {
      throw new Error('Ya existe una sala con ese ID');
    }

    return await Sala.create(data);
  }

  async listar() {
    return await Sala.findAll({
      order: [['id', 'ASC']]
    });
  }

  async obtenerPorId(id) {
    const sala = await Sala.findByPk(id);
    if (!sala) throw new Error('Sala no encontrada');
    return sala;
  }

  async actualizar(id, data) {
    const sala = await this.obtenerPorId(id);
    await sala.update(data);
    return sala;
  }

  async eliminar(id) {
    const sala = await this.obtenerPorId(id);
    await sala.destroy();
    return { message: 'Sala eliminada' };
  }
}

module.exports = new SalaService();