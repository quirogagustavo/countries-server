const axios = require ('axios');
const { Countries } = require ('../db')
const { API_ALL } = process.env;

// async function LoadDb(req, res) {
//   try {
//     {
//       const AllCountApi = await axios.get(API_ALL);
//       const ModelCountries = AllCountApi.data.map((e) => {
//         return {
//           name: e.name,
//           id: e.alpha3Code,
//           flagimg: e.flag,
//           region: e.region,
//           capital: e.capital,
//           subregion: e.subregion,
//           area: e.area,
//           population: e.population,
//         };
//       });
//       ModelCountries.forEach(async (e) => {
//         await Country.findOrCreate({
//           where: {
//             name: e.name,
//             id: e.id,
//             flagimg: e.flagimg,
//             region: e.region,
//             capital: e.capital,
//             subregion: e.subregion,
//             area: e.area,
//             population: e.population,
//           },
//         });
//       });
//     }
//     console.log('DB success')
//   } catch (error) {
//     res.send(error);
//   }
// }

async function llamarAPI() {
  try {
    const respuesta = await axios.get(API_ALL);
    return respuesta.data; // Devuelve los datos obtenidos de la API
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
}

async function LoadDb(){
    console.log('Estoy por migrar datos de la API')
    const datosApi= await llamarAPI();
    for (const country of datosApi) {
        // console.log(country.cca3,'*/*',country.name.official,'/*/',country.flags.png,'*/*',country.continents[0]);
        // console.log(('capital' in country)?country.capital[0]:'')
        // console.log('*/*',country.subregion,'*/*',country.area,'*/*',country.population);
         await Countries.create({ id: country.cca3, name: country.name.official,
         flag: (country.flags.png)?country.flags.png:'', continente:country.continents[0],
         //Todos los objetos no tienen capital. Valido que tengan la propiedad capital, sino la tienen la dejo en blanco
         capital: ('capital' in country)?country.capital[0]:'', subregion: country.subregion, area:country.area, poblacion: country.population
     })


    
      }
}
module.exports= {LoadDb}
