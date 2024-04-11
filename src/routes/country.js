const { Router } = require('express');
const { getAllCount, GetCountryId, GetCountryName } = require('../controllers/country')
const router= Router();
//console.log('Buscando rutas')
router.get('/', getAllCount)  
router.get('/:idPais', GetCountryId)
router.get('/name/',async(req,res) => {
    const { name } = req.query;
    console.log('Esto viene en el query: ',name)
    try {
      
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
        return res.send(countryQuery);
      
    } catch (error) {
      res.send(error);
    }
})


module.exports = router;

