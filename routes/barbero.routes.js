let express = require("express"),
  mongoose = require("mongoose");

const Barbero = require("../models/barbero");


exports.create = function (req, res) {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.file);
  
  const {nombre  , rol , servicios} = req.body;

  console.log (servicios);

  if ( !req.file)  res.status(422).json({error : 'Error!!! Imagen no cargada.'})
  if ( !nombre  || !rol) res.status(422).json({error : 'Error Parametros Faltantes'})
  

  const barber = new Barbero({
    _id: new mongoose.Types.ObjectId(),
    nombre: nombre,
    rol:rol,
    servicios : servicios,
    profileImg: url + "/public/images/" + req.file.filename,
  });
  barber
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Barber Registado Correctamente!",
        barberoCreado: result
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
};

exports.allBarber = function (req, res) {
    Barbero.find()
    .populate({path:'servicios'})
    .then((data) => {
      res.status(200).json({
        barberos: data,
      });
    });
  }
