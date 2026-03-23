module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define('Sala', {
    id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      allowNull: false
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