let express = require("express"),
  mongoose = require("mongoose");

  const accountSid = 'AC5a4c993a9731237ea12d36854c23facf'; 
const authToken = 'c829d1617988648f974da87c7c557ef1'; 
const client = require('twilio')(accountSid, authToken); 
 

let Cita = require("../models/appointment");
let Barbero = require("../models/barber");

exports.createCita = (req, res) => {
  console.log(req.body);

  const { nombre, servicios, barbero, hora, fecha, telefono } =  req.body;

  if ( !nombre || !servicios ||  !barbero ||  !hora ||  !fecha  ) res.json({error : 'Parametros Faltantes'})

  const cita = new Cita({
    _id: new mongoose.Types.ObjectId(),
    nombre: nombre,
    servicios: servicios,
    barbero_id : new mongoose.Types.ObjectId(barbero),
    hora : hora,
    fecha :fecha,
    estado : 'AGENDADA',
    telefono
  });

  cita.save()
  .then((result) => {
    res.status(201).json({
      message: "Cita registered successfully!",
      citaCreated: result
    });
  })
  .catch((err) => {
    console.log(err),
      res.status(500).json({
        error: err,
      });
  });

  client.messages 
      .create({ 
         body: `Hola ${nombre}, Su cita se ha Agendado para el ${fecha}, a la hora ${hora} con el barbero seleccionado. Por favor no olvdidar de asistir.`, 
         from: 'whatsapp:+14155238886',       
         to:  `whatsapp:+57${telefono}` 
       }) 
      .then(message => console.log(message)) 
      .done();


}

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
