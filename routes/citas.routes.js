let express = require("express"),
  mongoose = require("mongoose");

let Cita = require("../models/cita");
let Barbero = require("../models/barbero");

exports.allCitas = function (req, res) {
  Cita.find()
  .populate('barbero_id','nombre')
  .populate({path:'servicios' , select: ['nombre','precio']})
  .then((data) => {
      res.status(200).json({
        citas: data
      });
    })
    .catch((err) => console.log(err));
};

exports.allCitasHoy = function (req, res) {
  let no = new Date();
  let str= `${req.params.fecha}T00:00:00.000+00:00`;
 
  console.log(req.params.fecha);
  Cita.find( { fecha : new Date( str ) } )
  .populate('barbero_id','nombre')
  .populate({path:'servicios' , select: ['nombre','precio']}).
  exec(function (err, data) {
    if (err) return handleError(err);
      res.status(200).json({
        citas: data
      });
    
  });
  /* .then((data) => {
    res.status(200).json({
      citas: data
    });
  })
  .catch((err) => console.log(err)); */
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

exports.citasDisponibleBarbero = function (req, res) {
  const { barbero, fecha  } = req.body;

  if ( !barbero || !fecha ) res.status(422).json({error : 'Error Parametros Faltantes'})

  let str= `${fecha}T00:00:00.000+00:00`;

  Cita.find( { barbero_id: barbero, fecha : new Date( str ) })
  .then((data)=>{
    res.json({cita  : data})
  })


}

exports.editCitas = function (req, res) {
  Cita.findByIdAndUpdate({_id : req.params.id} ,{ $set : { estado : req.params.estado}})
  .then( result => {
      res.json({ response : 'Cita Editada'});
  } )
}
