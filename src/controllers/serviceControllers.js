let express = require("express"),
  mongoose = require("mongoose");

let servicesModel = require("../models/services");

const createServicios = (req, res) => {
  const { name, description, price } = req.body;
  console.log(req.body);
  if (!name || !description || !price)
    return res
      .status(406)
      .json({ error: "Falta Parametros para hacer el registro" });

  const servicio = new servicesModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    price,
  })
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Servicio Creado Correctamente",
        servicio: result,
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
};

const allServicios = async function (req, res) {
  const services = await servicesModel.find();
  res.status(200).json({
    services: services,
  });
};

const editService = async function (req, res) {
  const { id } = req.body;

  const { serviceUpdated } = req.body;
  console.log(serviceUpdated);

  const result = await servicesModel.findByIdAndUpdate(
    { _id: id },
    { $set: serviceUpdated },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Service updated successfully", services: result });
};

const getServices = async function (req, res) {
  const idService = req.params.id;

  try {
    const service = await servicesModel.findById({ _id: idService });
    res.status(200).json({ service });
  } catch (error) {
    res.status(406).json({error: 'the invalid id, must be type ObjectId '})
  }
};

module.exports = {
  createServicios,
  allServicios,
  editService,
  getServices,
};
