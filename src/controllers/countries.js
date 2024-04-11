const {Countries,Activities} = require('../db')
const {Op} = require('sequelize')


 const AllCountries = async(req,res)=>{
     try{
         const allCountry=await Countries.findAll();
         res.status(200).json(allCountry.map(pais=>pais.toJSON()))
     } catch (error){
         res.status(500).send(error)
     }
 }

const CountryById=async (req,res)=>{
    console.log('Estoy en coutryById')
    try{
        const { idPais }=req.params
        const country=await Countries.findOne({
            where: {
                id: idPais.toUpperCase()
            },
            include: Activity
        })
        return res.stattus(200).json(country)

    } catch(error){
        res.status(500).send(error)
    }
}

const CountryByName=async (req,res)=>{
    console.log('Estoy en countrybyName')
    const { name }=req.query
    try{
    
        if (!name) {
            const countryAll=await Countries.findAll({ include: Activities})
            res.send(countryAll)
        } else {
            const countryQuery=await Countries.findAll({
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
              return res.send(countryQuery);
            }
        }


    // console.log(name)
    // const countries=await Countries.findAll({
    //     where: { name: {
    //         [Op.iLike]: `%${name}%`
    //       }, }
    // })
    // console.log(countries)
    // if (!countries){
    //     return res.status(200).json('No hay coincidencias para el pais especificado')
    // }
    // return res.status(200).json(countries)

} catch(error){
    res.status(500).send(error)
}
}
module.exports={ AllCountries,
                CountryById,
                CountryByName }

//