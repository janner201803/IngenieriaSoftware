const reservaService = require('../service/reservaService');
const ReservaDTO = require('../dtos/reservaDTO');
const { Reserva, Sala, Usuario } = require('../models');
const { Op } = require('sequelize');

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

// 🔹 LISTAR TODAS LAS RESERVAS
exports.listar = async (req, res, next) => {
  try {
    const reservas = await reservaService.listar();
    res.json(reservas.map(r => new ReservaDTO(r)));
  } catch (error) {
    next(error);
  }
};

// 🔹 OBTENER RESERVA POR ID
exports.obtenerPorId = async (req, res, next) => {
  try {
    const reserva = await reservaService.obtenerPorId(req.params.id);
    res.json(new ReservaDTO(reserva));
  } catch (error) {
    next(error);
  }
};

// 🔹 ACTUALIZAR RESERVA
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

// 🔹 ELIMINAR RESERVA
exports.eliminar = async (req, res, next) => {
  try {
    const resultado = await reservaService.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

// 🔹 LISTAR RESERVAS POR FECHA (para el calendario)
// GET /api/reservas?fecha=YYYY-MM-DD
exports.listarPorFecha = async (req, res, next) => {
  try {
    const { fecha } = req.query;
    if (!fecha) return res.status(400).json({ error: "Debes enviar la fecha" });

    const inicioDia = new Date(fecha + "T00:00:00");
    const finDia = new Date(fecha + "T23:59:59");

    const reservas = await Reserva.findAll({
      where: {
        fechaInicio: { [Op.lte]: finDia }, // empieza antes o durante el día
        fechaFin: { [Op.gte]: inicioDia }  // termina después o durante el día
      },
      order: [['fechaInicio', 'ASC']]
    });

    res.json(reservas.map(r => new ReservaDTO(r)));
  } catch (error) {
    next(error);
  }
};