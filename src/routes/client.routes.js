const { Router } = require("express");
const {
    createClient,
    getClientByNumber,
    getAllClient
  } = require("../controllers/clientControllers");

const clientRouter = Router();


clientRouter.post('/',createClient)
clientRouter.get('/',getAllClient)
clientRouter.get('/:id',getClientByNumber)



module.exports = clientRouter;