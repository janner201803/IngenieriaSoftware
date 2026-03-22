class SalaDTO {

  constructor({ id, nombre, ubicacion, capacidad, estado }) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.capacidad = capacidad;
    this.estado = estado;
  }

  // 🔥 VALIDACIÓN PARA CREAR
  static validarCrear(data) {
    const errors = [];

    if (!data.id) {
      errors.push('El id es obligatorio');
    } else if (typeof data.id !== 'string') {
      errors.push('El id debe ser texto (varchar)');
    } else if (data.id.length > 45) {
      errors.push('El id no puede tener más de 45 caracteres');
    }

    if (!data.nombre) errors.push('El nombre es obligatorio');
    if (!data.ubicacion) errors.push('La ubicación es obligatoria');

    if (!data.capacidad) {
      errors.push('La capacidad es obligatoria');
    } else if (isNaN(data.capacidad)) {
      errors.push('Capacidad debe ser número');
    }

    if (!data.estado) errors.push('El estado es obligatorio');

    return errors;
  }

  // 🔥 VALIDACIÓN PARA ACTUALIZAR
  static validarActualizar(data) {
    const errors = [];

    if (!data || Object.keys(data).length === 0) {
      errors.push('Debe enviar al menos un campo');
    }

    if (data.estado && typeof data.estado !== 'string') {
      errors.push('El estado debe ser texto');
    }

    return errors;
  }
}

module.exports = SalaDTO;