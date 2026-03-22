module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define('Sala', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false // 👈 importante
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'sala',
    timestamps: false
  });

  return Sala;
};