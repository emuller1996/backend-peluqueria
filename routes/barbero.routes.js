let express = require("express"),
  mongoose = require("mongoose");

const Barbero = require("../models/barbero");
exports.create = function (req, res) {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.file);
  console.log(url);

  const barber = new Barbero({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    servicios: req.body.servicios,
    rol: req.body.rol,
    profileImg: url + "/public/images/" + req.file.filename,
  });
  barber
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Barber registered successfully!",
        userCreated: {
          _id: result._id,
          profileImg: result.profileImg,
        },
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
    Barbero.find().then((data) => {
      res.status(200).json({
        barberos: data,
      });
    });
  }
