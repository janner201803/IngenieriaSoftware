class SalaDTO {

  constructor({ id, nombre, ubicacion, capacidad, estado }) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.capacidad = capacidad;
    this.estado = estado;
  }

  static validarCrear(data) {
    const errors = [];

    if (!data.id) {
      errors.push('El id es obligatorio');
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

  static validarActualizarDatos(data) {
  const errors = [];

  if (!data || Object.keys(data).length === 0) {
    errors.push('Debe enviar al menos un campo');
    return errors;
  }

  // 🔹 nombre
  if (data.nombre !== undefined) {
    if (typeof data.nombre !== 'string' || data.nombre.trim() === '') {
      errors.push('El nombre no puede estar vacío');
    }
  }

  // 🔹 ubicacion
  if (data.ubicacion !== undefined) {
    if (typeof data.ubicacion !== 'string' || data.ubicacion.trim() === '') {
      errors.push('La ubicación no puede estar vacía');
    }
  }

  // 🔹 capacidad
  if (data.capacidad !== undefined) {
    if (isNaN(data.capacidad)) {
      errors.push('La capacidad debe ser número');
    } else if (data.capacidad <= 0) {
      errors.push('La capacidad debe ser mayor a 0');
    }
  }

  return errors;
}

  
}

module.exports = SalaDTO;