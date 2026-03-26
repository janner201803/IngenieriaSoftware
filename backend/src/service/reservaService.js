const { Reserva } = require('../models');

class ReservaService {

  async crear(data) {
    return await Reserva.create(data);
  }

  async listar() {
    return await Reserva.findAll({
      order: [['id', 'ASC']]
    });
  }

  async obtenerPorId(id) {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) throw new Error('Reserva no encontrada');
    return reserva;
  }

  async actualizar(id, data) {
    const reserva = await this.obtenerPorId(id);
    await reserva.update(data);
    return reserva;
  }

  async eliminar(id) {
    const reserva = await this.obtenerPorId(id);
    await reserva.destroy();
    return { message: 'Reserva eliminada' };
  }
}

module.exports = new ReservaService();