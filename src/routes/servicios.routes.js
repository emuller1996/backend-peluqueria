const { Router } = require('express');
const { allServicios, createServicios, editService,getServices } = require("../controllers/serviceControllers")
const servicesRouter = Router();


servicesRouter.get('/', allServicios);
servicesRouter.get('/:id', getServices);
servicesRouter.post('/', createServicios);
servicesRouter.put('/', editService);




module.exports = servicesRouter;