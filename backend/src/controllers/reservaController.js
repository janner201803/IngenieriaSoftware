const reservaService = require('../service/reservaService');
const ReservaDTO = require('../dtos/reservaDTO');
const { Sala, Usuario } = require('../models');

// 🔹 CREAR
exports.crear = async (req, res, next) => {
  try {
    const errors = ReservaDTO.validarCrear(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errores: errors });
    }

    const { fechaInicio, fechaFin, idUsuario, idSala } = req.body;

    // 🔥 validar que exista sala
    const sala = await Sala.findByPk(idSala);
    if (!sala) {
      return res.status(400).json({ error: 'La sala no existe' });
    }

    // 🔥 validar que exista usuario
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
      return res.status(400).json({ error: 'El usuario no existe' });
    }

    // 🔥 validar conflicto de horario
    const conflicto = await reservaService.listar();
    const existeCruce = conflicto.some(r =>
      r.idSala === idSala &&
      (
        new Date(fechaInicio) < new Date(r.fechaFin) &&
        new Date(fechaFin) > new Date(r.fechaInicio)
      )
    );

    if (existeCruce) {
      return res.status(400).json({
        error: 'La sala ya está reservada en ese horario'
      });
    }

    const reserva = await reservaService.crear(req.body);
    res.status(201).json(new ReservaDTO(reserva));

  } catch (error) {
    next(error);
  }
};

// 🔹 LISTAR
exports.listar = async (req, res, next) => {
  try {
    const reservas = await reservaService.listar();
    res.json(reservas.map(r => new ReservaDTO(r)));
  } catch (error) {
    next(error);
  }
};

// 🔹 OBTENER POR ID
exports.obtenerPorId = async (req, res, next) => {
  try {
    const reserva = await reservaService.obtenerPorId(req.params.id);
    res.json(new ReservaDTO(reserva));
  } catch (error) {
    next(error);
  }
};

// 🔹 ACTUALIZAR
exports.actualizar = async (req, res, next) => {
  try {
    const errors = ReservaDTO.validarActualizar(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errores: errors });
    }

    const reserva = await reservaService.actualizar(req.params.id, req.body);
    res.json(new ReservaDTO(reserva));
  } catch (error) {
    next(error);
  }
};

// 🔹 ELIMINAR
exports.eliminar = async (req, res, next) => {
  try {
    const resultado = await reservaService.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};