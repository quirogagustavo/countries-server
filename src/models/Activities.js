const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activities', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull:false,
      autoIncrement: true,
      primaryKey:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad:{
      type: DataTypes.SMALLINT,
      allowNull:false,
      validate: {
        isIn: {
            args:[[1,2,3,4,5]],
            msg:"Debe ser un numero del 1 al 5"
        }
      }
    },
    duracion: {
      type: DataTypes.SMALLINT
    },
    temporada: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: {
            args: [['Verano', 'Otoño', 'Invierno', 'Primavera']],
            msg: 'Debe Ingresar "Verano", "Otoño", "Invierno" o "Primavera"'
        }
      }
    }
  });
};