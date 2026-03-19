module.exports = (sequelize, DataTypes) => {
  const Docente = sequelize.define('Docente', {
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
      field: 'idFacultad'
    }
  }, {
    tableName: 'docente',
    timestamps: false
  });

  Docente.associate = (models) => {
    Docente.belongsTo(models.Facultad, { foreignKey: 'idFacultad', as: 'facultad' });
  };

  return Docente;
  };