const { Countries, Activities, Countries_Activities } = require("../db");

async function newAct(req, res) {
  // const { name, dificultad, duracion, temporada, countryID } = req.body;

  // const valdidateact = await Activities.findOne({
  //   where: {
  //     name: name,
  //   },
  // });

  // if (!valdidateact) {
  //   const addAct = await Activities.create({
  //     name: name,
  //     dificultad: dificultad,
  //     duracion: duracion,
  //     temporada: temporada,
  //   });
  //   const countrymatch = await Countries.findAll({
  //     where: {
  //       id: countryID,
  //     },
  //   });

  //   const resact = await addAct.addCountries(countrymatch);

  //   return res.send(resact);
  // }

  // const countrymatch = await Countries.findAll({
  //   where: {
  //     id: countryID,
  //   },
  // });
  // // console.log(addAct)
  // // console.log(countrymatch)

  // const resact = await valdidateact.addCountries(countrymatch);

  // res.send(resact);

  try{  
    const {nombre,dificultad,duracion,temporada,countryId}=req.body;
    //Crear la actividad en la tabla Activity
    //Validar que el name exista, si existe el name
    //actuasliza en la tabla con los valores enviados.
    //console.log(nombre, ' ', dificultad,' ',countryId)
    const [actividad,creada]=await Activities.findOrCreate({where:{nombre:nombre},
    defaults: {dificultad: parseInt(dificultad), duracion: parseInt(duracion), temporada: temporada}})
    //console.log(actividad)
    if (!creada){
        await actividad.update({dificultad: dificultad, duracion: duracion, temporada: temporada})
    }
    //Recorrer el arreglo de Country, validar que exista
    //y agregar en la asociacion el idCountry y idActivity
     
    //console.log(actividad)
     countryId.forEach(async (element) => {
         //Validar que existe el id del pais
         //console.log(element)
          const country=await Countries.findOne({where:{id:element}})
         //Si exite el country agrego en la asociacion de n a m 
         //el id de actividad y el id de cada pais
         
          if (country){
              //Valida que no se este la tupla actividad - pais
              const country_act= await Countries_Activities.findOne({where:{ActivityId:actividad.id, 
              CountryId:element}})
              if (!country_act)
                await actividad.addCountry(element)
          }
        
      });
    res.status(200).send('Se agrego la actividad')
    } catch(error) {
        console.log('Dio error ', error)
        res.status(500).send(error)
    }

}

const activities=async(req,res)=>{
  try{
      const actividad=await Activities.findAll()
      return res.status(200).json(actividad)
  } catch(error){
      return res.status(500).send(error)

  }
}

module.exports = { newAct,activities };
