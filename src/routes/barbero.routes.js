const { Router } = require('express');
const { allBarbers, create, updateBarber, getBarber  } = require('../controllers/barberControllers.js');
const { verifyToken } = require('../libs/verifyToken.js');
const barberRouter = Router();


barberRouter.get('/', allBarbers);
barberRouter.get('/:id', getBarber);
barberRouter.post('/', verifyToken, create);
barberRouter.put('/:id',verifyToken, updateBarber);




module.exports = barberRouter;
