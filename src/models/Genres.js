const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,
    //   primaryKey: true,
    //   // type:DataTypes.INTEGER,
    //   // primaryKey: true,
    //   // autoIncrement: true
    // },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      // type:DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true
    },
   name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
   }
  });
};
