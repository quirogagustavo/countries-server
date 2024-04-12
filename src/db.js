// require("dotenv").config();
// const { Sequelize } = require("sequelize");

// const fs = require('fs');
// const path = require('path');
// const {
//   DB_USER, DB_PASSWORD, DB_HOST,
// } = process.env;
// // console.log(DB_USER,'  ',DB_PASSWORD,'  ',DB_HOST)
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
//   logging: false, 
//   native: false, 
// });
// const basename = path.basename(__filename);

// const modelDefiners = [];

// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });


// modelDefiners.forEach(model => model(sequelize));

// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);
// console.log(sequelize.models)
// const { Countries, Activities } = sequelize.models;

// // Aca vendrian las relaciones
// // Product.hasMany(Reviews);
// Countries.belongsToMany(Activities,{through:'Countries_Activities'})
// Activities.belongsToMany(Countries,{through:'Countries_Activities'})

// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
// };

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

//`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

const sequelize = new Sequelize('postgres://countries_postgresql_user:suVSpLENieTrowJcE9mJVK4ExjgyPCSQ@dpg-coc665gl5elc739o0r6g-a/countries_postgresql',
{dialectOptions: {
    ssl: {
      require: true, // Enforces SSL connection
      
    }, 
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Countries, Activities } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Country.belongsToMany(Activity, { through: "country_activity" });
// Activity.belongsToMany(Country, { through: "country_activity" });

Countries.belongsToMany(Activities,{through:'Countries_Activities'})
Activities.belongsToMany(Countries,{through:'Countries_Activities'})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
