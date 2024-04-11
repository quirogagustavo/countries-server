const { Router } = require('express');
const { newAct,activities } = require('../controllers/activities')
const router= Router();

router.post('/', newAct );
router.get('/',activities)  


module.exports = router;

