//const axios = require("axios");
const server = require("./src/server.js");
const { conn } = require('./src/db.js');
//const migrarDatos=require('../server/src/utils/migrarDatos.js')
const {LoadDb} = require('./src/loadDb/loadDb')
const PORT = 3001;
// console.log('Estoy en el index')


conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  LoadDb();
  console.log(`Server listening on port ${PORT}`);
  //migrarDatos()
})
}).catch(error => console.error(error))
