const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Facultad = require('./facultad')(sequelize, DataTypes);
const Docente = require('./docente')(sequelize, DataTypes);
const Secretaria = require('./secretaria')(sequelize, DataTypes);
const ListaBlanca = require('./listaBlanca')(sequelize, DataTypes); // <-- NUEVO

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  Facultad,
  Docente,
  Secretaria,
  ListaBlanca, // <-- NUEVO
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

module.exports = db;