const { Router } = require("express");
const {
    createClient,
    getClientByNumber,
    getAllClient,
    updateClient
  } = require("../controllers/clientControllers");

const clientRouter = Router();


clientRouter.post('/',createClient)
clientRouter.get('/',getAllClient)
clientRouter.get('/:id',getClientByNumber)
clientRouter.put('/',updateClient)




module.exports = clientRouter;