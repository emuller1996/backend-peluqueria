const { Router } = require("express");
const {
    createClient,
    getClientByNumber
  } = require("../controllers/clientControllers");

const clientRouter = Router();

clientRouter.post('/',createClient)
clientRouter.get('/:id',getClientByNumber)


module.exports = clientRouter;