const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define('user',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          nombre: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          nick:{
            type: DataTypes.STRING,
            allowNull: true,
          },
          password:{
            type:DataTypes.STRING,
            allowNull: true,
          }
    })
}