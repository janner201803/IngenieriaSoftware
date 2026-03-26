class SalaDTO {

  constructor({ id, nombre, ubicacion, capacidad, estado }) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.capacidad = capacidad;
    this.estado = estado;
  }

  // 🔹 VALIDAR CREAR
  static validarCrear(data) {
    const errors = [];

    if (!data) {
      errors.push('Debe enviar datos');
      return errors;
    }

    // 🔹 ID
    if (!data.id) {
      errors.push('El id es obligatorio');
    }

    // 🔹 NOMBRE
    if (!data.nombre) {
      errors.push('El nombre es obligatorio');
    } else if (typeof data.nombre !== 'string' || data.nombre.trim() === '') {
      errors.push('El nombre debe ser una cadena válida');
    } else if (/^\d+$/.test(data.nombre.trim())) {
      errors.push('El nombre no puede ser solo números');
    }

    // 🔹 UBICACION
    if (!data.ubicacion) {
      errors.push('La ubicación es obligatoria');
    } else if (typeof data.ubicacion !== 'string' || data.ubicacion.trim() === '') {
      errors.push('La ubicación debe ser una cadena válida');
    } else if (/^\d+$/.test(data.ubicacion.trim())) {
      errors.push('La ubicación no puede ser solo números');
    }

    // 🔹 CAPACIDAD
    if (data.capacidad === undefined || data.capacidad === null) {
      errors.push('La capacidad es obligatoria');
    } else if (!Number.isInteger(data.capacidad)) {
      errors.push('La capacidad debe ser un número entero');
    } else if (data.capacidad <= 0) {
      errors.push('La capacidad debe ser mayor a 0');
    }

    // 🔹 ESTADO
    if (!data.estado) {
      errors.push('El estado es obligatorio');
    } else if (typeof data.estado !== 'string' || data.estado.trim() === '') {
      errors.push('El estado debe ser una cadena válida');
    }

    return errors;
  }

  // 🔹 VALIDAR ACTUALIZAR (SOLO ESTADO)
  static validarActualizar(data) {
    const errors = [];

    if (!data || Object.keys(data).length === 0) {
      errors.push('Debe enviar al menos un campo');
      return errors;
    }

    if (data.estado !== undefined) {
      if (typeof data.estado !== 'string' || data.estado.trim() === '') {
        errors.push('El estado debe ser texto válido');
      }
    }

    return errors;
  }

  // 🔹 VALIDAR ACTUALIZAR DATOS (SIN ESTADO)
  static validarActualizarDatos(data) {
    const errors = [];

    if (!data || Object.keys(data).length === 0) {
      errors.push('Debe enviar al menos un campo');
      return errors;
    }

    // 🔹 NOMBRE
    if (data.nombre !== undefined) {
      if (typeof data.nombre !== 'string' || data.nombre.trim() === '') {
        errors.push('El nombre no puede estar vacío y debe ser texto');
      } else if (/^\d+$/.test(data.nombre.trim())) {
        errors.push('El nombre no puede ser solo números');
      }
    }

    // 🔹 UBICACION
    if (data.ubicacion !== undefined) {
      if (typeof data.ubicacion !== 'string' || data.ubicacion.trim() === '') {
        errors.push('La ubicación no puede estar vacía y debe ser texto');
      } else if (/^\d+$/.test(data.ubicacion.trim())) {
        errors.push('La ubicación no puede ser solo números');
      }
    }

    // 🔹 CAPACIDAD
    if (data.capacidad !== undefined) {
      if (!Number.isInteger(data.capacidad)) {
        errors.push('La capacidad debe ser un número entero');
      } else if (data.capacidad <= 0) {
        errors.push('La capacidad debe ser mayor a 0');
      }
    }

    return errors;
  }

}

module.exports = SalaDTO;