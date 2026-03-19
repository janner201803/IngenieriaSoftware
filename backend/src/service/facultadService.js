const { Facultad, Docente, Secretaria } = require('../models');

class FacultadService {
  async listar(page = 1, limit = 10, incluirRelaciones = false) {
    const offset = (page - 1) * limit;
    const include = incluirRelaciones ? [
      { model: Docente, as: 'docentes', required: false },
      { model: Secretaria, as: 'secretarias', required: false }
    ] : [];
    const { count, rows } = await Facultad.findAndCountAll({ limit, offset, order: [['nombre', 'ASC']], include });
    return { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page, items: rows };
  }

  async obtenerPorId(id, incluirRelaciones = false) {
    const include = incluirRelaciones ? [
      { model: Docente, as: 'docentes' },
      { model: Secretaria, as: 'secretarias' }
    ] : [];
    const facultad = await Facultad.findByPk(id, { include });
    if (!facultad) throw new Error('Facultad no encontrada');
    return facultad;
  }

  async listarTodos() {
    return await Facultad.findAll({ order: [['nombre', 'ASC']] });
  }
}

module.exports = new FacultadService();