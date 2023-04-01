const { Router } = require('express');
const { allServicios, createServicios, editService,getServices } = require("../controllers/serviceControllers")
const { verifyToken } = require("../libs/verifyToken")
const servicesRouter = Router();


servicesRouter.get('/', allServicios);
servicesRouter.get('/:id', getServices);
servicesRouter.post('/',verifyToken, createServicios);
servicesRouter.put('/', verifyToken,editService);




module.exports = servicesRouter;