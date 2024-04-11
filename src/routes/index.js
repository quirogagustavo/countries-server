// const express = require("express");

// const { AllCountries,CountryById,CountryByName }=require('../controllers/countries')
// //
// const { newActivity, activities }=require('../controllers/activities')
// const router = express.Router();

// console.log('Estoy en routes')
// router.get('/countries/name',CountryByName)
// router.get('/countries/:idPais',CountryById)
// router.get('/countries',AllCountries)

// router.post('/activities',newActivity)
// router.get('/activities',activities)


// module.exports = router;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 const CountryR= require('./country')
 const ActivityR= require('./activities')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//console.log('Estoy en index de routes')
 router.use('/countries', CountryR);
 router.use('/activities', ActivityR);



module.exports = router;
