let express = require("express"),
  mongoose = require("mongoose");

let Client = require("../models/client");

const createClient = async (req, res) => {
  const clienteNew = req.body;
  

  //Validacion de Numero Telefonico
  const clientValidate = await Client.findOne({
    phoneNumber: clienteNew.phoneNumber,
  });
  if (clientValidate)
    return res
      .status(422)
      .json({ message: "Numero de Telefono ya esta registrado" });
  //Validacion de Numero Telefonico

  Object.assign(clienteNew, { _id: new mongoose.Types.ObjectId() });
  const client = new Client(clienteNew);
  console.log(clienteNew)
  try {
    const result = await client.save();

    return res.status(201).json({
      message: "Cliente Creado Correctamente",
      client: result,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getClientByNumber = async (req, res) => {
  console.log(req.params.id);

  const client = await Client.findOne({ phoneNumber: req.params.id });

  console.log(client);
  if (client) {
    return res.status(200).json({ 
        message: "cliente Encontrado", 
        client: client 
    });
  }else{
    return res.status(406).json({
        message: "Client not registred",
      });
  }

  
};

const getAllClient = async(req, res) => {
  const options = req.query;
  Object.assign(options,{sort: 'name'})


  try {
    const clients = await Client.paginate({}, options);

    return res.status(200).json({clients: clients});

  } catch (error) {
    return res.status(404).json({error: error.message});
  }
}

module.exports = {
  createClient,
  getClientByNumber,
  getAllClient
};
