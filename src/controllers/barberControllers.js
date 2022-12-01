let express = require("express"),
  mongoose = require("mongoose");
/* import Barbero from "../models/barber"; */
const Barbero = require("../models/barber");

const allBarbers = function (req, res) {
  Barbero.find()
    .populate({ path: "services" })
    .then((data) => {
      res.status(200).json({
        barberos: data,
      });
    });
};

const create = async function (req, res) {
  /* const { nombre, rol, servicios } = req.body; */
  const barberNew = req.body;


  /* ValidarObjeto barber*/
  if (
    !barberNew.hasOwnProperty("name") ||
    !barberNew.hasOwnProperty("role") ||
    !barberNew.hasOwnProperty("services")
  )
    return res.status(422).json({ error: "Error Parametros Faltantes" });

  Object.assign(barberNew, { _id: new mongoose.Types.ObjectId() });
  console.log(barberNew);

  try {
    const Barber = new Barbero(barberNew);
    const result = await Barber.save();
    return res.status(201).json({ message: "barber created", barberCreated: result });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};

const updateBarber = async function (req, res,) {
  console.log(req.params.id);
  console.log(req.body);
  const id = req.params.id;
  const barberUpdated = req.body;
  if (!id) return res.status(404).json({ error: `the IDBarber not found in the parameters ` })


  try {
    const result = await Barbero.findByIdAndUpdate(
      { _id: id },
      { $set: barberUpdated },
      { new: true }
    );

    console.log(result);
    res.status(202).json({ message: `barber has been successfully updated`, barber: result })

  } catch (error) {

  }








}

const getBarber = async (req, res) => {
  try {
    const barber = await Barbero.findOne({ _id: req.params.id })
      .populate({ path: "services" })
    console.log(barber)
    return res.status(200).json({ barber : barber })
  } catch (error) {
    return res.status(404).json({ error : error.message })
  }


}

module.exports = {
  allBarbers,
  create,
  updateBarber,
  getBarber
};
