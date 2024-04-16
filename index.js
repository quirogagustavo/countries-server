//const axios = require("axios");
const server = require("./src/server.js");
const { conn } = require('./src/db.js');
//const migrarDatos=require('../server/src/utils/migrarDatos.js')
const {LoadDb} = require('./src/loadDb/loadDb')
const PORT = process.env.PORT || 3001;
const HOST = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';
// console.log('Estoy en el in

conn.sync({ force: false }).then(() => {
server.listen(PORT, HOST, () => {
  LoadDb();
  console.log(`Server listening on port ${PORT}`);
  //migrarDatos()
})
}).catch(error => console.error(error))
