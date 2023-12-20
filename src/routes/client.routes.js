import { Router } from "express";
import { createClient, getClientByNumber, getAllClient, updateClient } from "../controllers/clientControllers.js";

const clientRouter = Router();


clientRouter.post('/',createClient)
clientRouter.get('/',getAllClient)
clientRouter.get('/:id',getClientByNumber)
clientRouter.put('/',updateClient)




export default clientRouter;