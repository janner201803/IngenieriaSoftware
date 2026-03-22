const salaService = require('../service/salaService');
const SalaDTO = require('../dtos/salaDTO');

// 🔹 CREAR SALA
exports.crear = async (req, res, next) => {
  try {
    const errors = SalaDTO.validarCrear(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errores: errors });
    }

    const sala = await salaService.crear(req.body);
    res.status(201).json(new SalaDTO(sala));
  } catch (error) {
    next(error);
  }
};

// 🔹 LISTAR SALAS
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

// 🔹 ACTUALIZAR (SOLO ESTADO)
exports.actualizar = async (req, res, next) => {
  try {
    const errors = SalaDTO.validarActualizar(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errores: errors });
    }

    const sala = await salaService.actualizar(req.params.id, req.body);
    res.json(new SalaDTO(sala.toJSON()));
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