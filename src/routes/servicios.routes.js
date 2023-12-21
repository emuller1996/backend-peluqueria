import { Router } from 'express';
import { allServicios, createServicios, editService, getServices } from "../controllers/serviceControllers.js";
import { verifyToken } from "../libs/verifyToken.js";
const servicesRouter = Router();


servicesRouter.get('/', allServicios);
servicesRouter.get('/:id', getServices);
servicesRouter.post('/', createServicios);
servicesRouter.put('/', editService);




export default servicesRouter;