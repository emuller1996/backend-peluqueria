const { Router } = require('express');
const { allBarbers, create, updateBarber  } = require('../controllers/barberControllers.js');
const barberRouter = Router();


barberRouter.get('/', allBarbers);
barberRouter.post('/', create);
barberRouter.put('/:id', updateBarber);




module.exports = barberRouter;
