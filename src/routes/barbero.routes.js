const { Router } = require('express');
const { allBarbers, create, updateBarber, getBarber  } = require('../controllers/barberControllers.js');
const barberRouter = Router();


barberRouter.get('/', allBarbers);
barberRouter.get('/:id', getBarber);
barberRouter.post('/', create);
barberRouter.put('/:id', updateBarber);




module.exports = barberRouter;
