const salaService = require('../service/salaService');
const SalaDTO = require('../dtos/salaDTO');
const { Sala } = require('../models');

// 🔹 CREAR
exports.crear = async (req, res, next) => {
  try {
    const errors = SalaDTO.validarCrear(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errores: errors });
    }

    // ✅ validar existencia correctamente
    const salaExistente = await Sala.findByPk(req.body.id);
    if (salaExistente) {
      return res.status(400).json({
        error: 'Ya existe una sala con ese ID'
      });
    }

    const sala = await salaService.crear(req.body);
    res.status(201).json(new SalaDTO(sala));

  } catch (error) {
    next(error);
  }
};

// 🔹 LISTAR
exports.listar = async (req, res, next) => {
  try {
    const salas = await salaService.listar();
    res.json(salas.map(s => new SalaDTO(s)));
  } catch (error) {
    next(error);
  }
};

// 🔹 OBTENER POR ID
exports.obtenerPorId = async (req, res, next) => {
  try {
    const sala = await salaService.obtenerPorId(req.params.id);
    res.json(new SalaDTO(sala));
  } catch (error) {
    next(error);
  }
};

// 🔹 ACTUALIZAR
exports.actualizar = async (req, res, next) => {
  try {
    const errors = SalaDTO.validarActualizar(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errores: errors });
    }

    const sala = await salaService.actualizar(req.params.id, req.body);
    res.json(new SalaDTO(sala));
  } catch (error) {
    next(error);
  }
};

// 🔹 ACTUALIZAR DATOS (SIN ESTADO)
exports.actualizarDatos = async (req, res, next) => {
  try {
    const { nombre, ubicacion, capacidad } = req.body;

    // 🔥 validar campos permitidos
    if (!nombre && !ubicacion && !capacidad) {
      return res.status(400).json({
        error: "Debes enviar al menos un campo: nombre, ubicacion o capacidad"
      });
    }

    const sala = await salaService.obtenerPorId(req.params.id);

    // 🔥 solo actualizar esos campos
    await sala.update({
      nombre: nombre ?? sala.nombre,
      ubicacion: ubicacion ?? sala.ubicacion,
      capacidad: capacidad ?? sala.capacidad
    });

    res.json(new SalaDTO(sala));

  } catch (error) {
    next(error);
  }
};

// 🔹 ELIMINAR
exports.eliminar = async (req, res, next) => {
  try {
    const resultado = await salaService.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};