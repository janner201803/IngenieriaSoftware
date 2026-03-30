class SalaDTO {

  constructor({ id, nombre, ubicacion, capacidad, estado, facultad_id }) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.capacidad = capacidad;
    this.estado = estado;
    this.facultad_id = facultad_id;
  }

  // 🔥 VALIDACIÓN COMPLETA
  static esTextoValido(texto) {
    if (typeof texto !== 'string') return false;

    const limpio = texto.trim();

    // Permite letras, números, espacios y guion
    const formatoValido = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/.test(limpio);

    // Obliga al menos una letra
    const tieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(limpio);

    return formatoValido && tieneLetra;
  }

  static validarCrear(data) {
    const errors = [];

    if (!data) {
      errors.push('Debe enviar datos');
      return errors;
    }

    if (!data.id) errors.push('El id es obligatorio');

    if (!data.nombre || data.nombre.trim() === '') {
      errors.push('El nombre es obligatorio');
    } else if (!this.esTextoValido(data.nombre)) {
      errors.push('El nombre debe tener al menos una letra y solo puede contener letras, números y guiones');
    }

    if (!data.ubicacion || data.ubicacion.trim() === '') {
      errors.push('La ubicación es obligatoria');
    } else if (!this.esTextoValido(data.ubicacion)) {
      errors.push('La ubicación debe tener al menos una letra y solo puede contener letras, números y guiones');
    }

    if (data.capacidad == null) {
      errors.push('La capacidad es obligatoria');
    } else if (!Number.isInteger(Number(data.capacidad))) {
      errors.push('La capacidad debe ser entero');
    }

    if (!data.estado) errors.push('El estado es obligatorio');

    if (data.facultad_id == null) {
      errors.push('facultad_id es obligatorio');
    } else if (!Number.isInteger(Number(data.facultad_id))) {
      errors.push('facultad_id debe ser entero');
    }

    return errors;
  }

  static validarActualizar(data) {
    const errors = [];

    if (!data || Object.keys(data).length === 0) {
      errors.push('Debe enviar datos');
      return errors;
    }

    if (data.estado !== undefined) {
      if (typeof data.estado !== 'string' || data.estado.trim() === '') {
        errors.push('Estado inválido');
      }
    }

    return errors;
  }

  static validarActualizarDatos(data) {
    const errors = [];

    if (!data) {
      errors.push('Debe enviar datos');
      return errors;
    }

    if (!data.nombre || data.nombre.trim() === '') {
      errors.push('Nombre requerido');
    } else if (!this.esTextoValido(data.nombre)) {
      errors.push('El nombre debe tener al menos una letra y solo puede contener letras, números y guiones');
    }

    if (!data.ubicacion || data.ubicacion.trim() === '') {
      errors.push('Ubicación requerida');
    } else if (!this.esTextoValido(data.ubicacion)) {
      errors.push('La ubicación debe tener al menos una letra y solo puede contener letras, números y guiones');
    }

    if (!data.capacidad || !Number.isInteger(Number(data.capacidad)) || Number(data.capacidad) <= 0) {
      errors.push('Capacidad inválida');
    }

    if (!data.facultad_id || !Number.isInteger(Number(data.facultad_id)) || Number(data.facultad_id) <= 0) {
      errors.push('Facultad requerida');
    }

    return errors;
  }
}

module.exports = SalaDTO;