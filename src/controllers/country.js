const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Countries, Activities } = require("../db");

async function getAllCount(req, res) {
  const { name } = req.query;
  console.log('Esto viene en el query: ',name)
  try {
    if (!name) {
      console.log('Retorno todo')
      const countryAll = await Countries.findAll({ include: Activities});
      res.status(200).json(countryAll);
     } else {
       const countryQuery = await Countries.findAll({
         where: {
           name: {
             [Op.iLike]: `%${name}%`
           },
         },
          include: Activities
       });

       if (!countryQuery[0]) {
         console.log("error");

         return res
           .status(404)
           .json({
             error: ` no se encuentra ningun Pais con el nombre , ${name}`,
           });
       }
       return res.status(200).json(countryQuery);
     }
  } catch (error) {
    res.send(error);
  }
}

async function GetCountryId(req, res) {
  try {
    const idpais = req.params.idPais.toUpperCase();
    // console.log(idpais)
    const country = await Countries.findOne({
      where: {
        id: idpais,
      },
      include: Activities,
    });

    return res.json(country);
  } catch (error) {
    res.send(error);
  }
}

// async function GetCountryName(req,res) {
//   const { name } = req.query;
//   console.log('Esto viene en el query: ',name)
//   try {
    
//       const countryQuery = await Countries.findAll({
//         where: {
//           name: {
//             [Op.iLike]: `%${name}%`
//           },
//         },
//          include: Activities
//       });
//       if (!countryQuery[0]) {
//         console.log("error");

//         return res
//           .status(404)
//           .json({
//             error: ` no se encuentra ningun Pais con el nombre , ${name}`,
//           });
//       }
//       return res.send(countryQuery);
    
//   } catch (error) {
//     res.send(error);
//   }
// }

module.exports = { getAllCount, GetCountryId};
