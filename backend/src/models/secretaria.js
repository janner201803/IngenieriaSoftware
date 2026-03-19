module.exports = (sequelize, DataTypes) => {
  const Secretaria = sequelize.define('Secretaria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    contraseña: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'contraseña'
    },
    idFacultad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idFacultad',
      references: { model: 'facultad', key: 'id' }
    }
  }, {
    tableName: 'secretaria',
    timestamps: false
  });

  Secretaria.associate = (models) => {
    Secretaria.belongsTo(models.Facultad, { foreignKey: 'idFacultad', as: 'facultad' });
  };

  return Secretaria;
};