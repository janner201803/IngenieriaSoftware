const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Facultad = require('./facultad')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);
const ListaBlanca = require('./listaBlanca')(sequelize, DataTypes);
const Sala = require('./sala')(sequelize, DataTypes);
const Reserva = require('./reserva')(sequelize, DataTypes);

// 🔥 RELACIONES

// ✅ Facultad - Sala
Facultad.hasMany(Sala, {
  foreignKey: 'facultad_id'
});

Sala.belongsTo(Facultad, {
  foreignKey: 'facultad_id'
});

// ✅ Sala - Reserva
Sala.hasMany(Reserva, {
  foreignKey: 'idSala'
});

Reserva.belongsTo(Sala, {
  foreignKey: 'idSala'
});

// 🔥 ✅ ESTA ES LA QUE TE FALTABA
Facultad.hasMany(Usuario, {
  foreignKey: 'idFacultad'
});

Usuario.belongsTo(Facultad, {
  foreignKey: 'idFacultad'
});

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  Facultad,
  Usuario,
  ListaBlanca,
  Sala,
  Reserva
};

module.exports = db;