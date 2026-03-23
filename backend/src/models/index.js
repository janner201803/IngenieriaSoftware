const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Facultad = require('./facultad')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes); // 👈 NUEVO
const ListaBlanca = require('./listaBlanca')(sequelize, DataTypes);
const Sala = require('./sala')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  Facultad,
  Usuario,
  ListaBlanca,
  Sala
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

module.exports = db;