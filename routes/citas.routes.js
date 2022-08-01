let express = require("express"),
  mongoose = require("mongoose");

let Cita = require("../models/cita");
let Barbero = require("../models/barbero");

exports.allCitas = function (req, res) {
  Cita.find().then((data) => {
      res.status(200).json({
        citas: data
      });
    })
    .catch((err) => console.log(err));
};

exports.allCitasHoy = function (req, res) {
  let no = new Date();
  let str= `${no.toISOString().substring(0,10)}T00:00:00.000+00:00`;
 
  var data = {}
  Cita.find( { fecha : new Date( str ) } )
  .then((data) => {
    res.status(200).json({
      citas: data
    });
  })
  .catch((err) => console.log(err));
}

exports.allCitasBarbero = function (req, res) {
  console.log(req.params);
  Cita.find( { barbero_id : req.params.id } ).then((data) => {
    res.status(200).json({
      citas: data
    });
  })
  .catch((err) => console.log(err));

}

exports.editCitas = function (req, res) {
  Cita.findByIdAndUpdate({_id : req.params.id} ,{ $set : { estado : req.params.estado}})
  .then( result => {
      res.json({ response : 'Cita Editada'});
  } )
}
