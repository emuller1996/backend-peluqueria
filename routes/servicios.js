let express = require("express"),
  mongoose = require("mongoose");

let Servicios = require("../models/servicios");

exports.createServicios = (req,res)=>{
    const {nombre , descripcion ,precio} = req.body;
    if ( !nombre || !descripcion  || !precio ) res.status(422).json({error : 'Falta Parametros para hacer el registro'})

    const servicio =new Servicios({
        _id: new mongoose.Types.ObjectId(),
        nombre : nombre,
        descripcion : descripcion,
        precio : precio })
        .save()
        .then ( (result) =>{
            res.status(201).json({
                message : 'Servicio Creado Correctamente',
                servicio : result
            })
        })
        .catch((err) => {
            console.log(err),
              res.status(500).json({
                error: err,
              });
          });


}
exports.allServicios = function (req, res) {
    Servicios.find()
    .then((data)=>{
        res.status(200).json({
            servicios : data
        })
    })
}
