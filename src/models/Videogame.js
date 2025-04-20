const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // type:DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.JSON,
      allowNull: false
    },
    background_image: {
       type: DataTypes.STRING,
       allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

  });
};


// nombre: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// descripción: {
//   type: DataTypes.STRING,
//   allowNull: false
// },
// plataformas: {
//   type: DataTypes.JSON,
//   allowNull: false
// },
// imagen: {
//    type: DataTypes.STRING,
//    allowNull: false
// },
// fechaDeLanzamiento: {
//   type: DataTypes.DATEONLY,
//   allowNull: false
// },
// rating: {
//   type: DataTypes.FLOAT,
//   allowNull: false
// },