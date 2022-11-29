let express = require("express"),
  mongoose = require("mongoose");

let Appointment = require("../models/appointment");

const createAppointment = async (req, res) => {
  //console.log(req.body);
  const appointment = req.body;

  if (!appointment.hasOwnProperty("services"))
    return res.status(422).json({ error: `services no provided` });
  if (!appointment.hasOwnProperty("barber_id"))
    return res.status(422).json({ error: `barber_id no provided` });

    //Validar Hora Disponible
    try {
        const result = await Appointment.find({barber_id :appointment.barber_id, date : appointment.date,hour : appointment.hour})
        if(result.length>0) return res.status(406).json({message : 'the hour for your appointment with the barber is not available'}) 
    } catch (error) {
        return res.status(406).json({error : error.message})
        
    }

  try {
    const AppointmentInsert = new Appointment(appointment);
    Object.assign(AppointmentInsert, { _id: new mongoose.Types.ObjectId() });
    const result = await AppointmentInsert.save();
    return res
      .status(201)
      .json({ message: `Appointment created`, appointment: result });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};

const allAppointment = async (req, res) => {
  console.log(req.body);
  const date = req.body.date;
  const barber_id = req.body.barber_id;


  let filter = {};
  if(date) Object.assign(filter,{date})
  if(barber_id) Object.assign(filter,{barber_id})

  const allAppointment = await Appointment.find(filter)
    .populate({
      path: "services",
      select: ["name", "price"],
    })
    .populate("barber_id", "name");

  res.status(200).json({ appointments: allAppointment });
};

const changeStatusAppointment = async (req, res) => {
  const id = req.params.id;
  const state = req.params.state;

  try {
    const result = await Appointment.findByIdAndUpdate(
      { _id: id },
      { $set: { state } },
      { new: true }
    );

    return res.status(202).json({ message: "appointment status has changed" });
  } catch (error) {
    return res.status(404).json({ error: error.message.toString });
  }

  return res
    .status(200)
    .json({ message: "PACHT Appointment", params: req.params });
};

module.exports = {
  createAppointment,
  allAppointment,
  changeStatusAppointment,
};

/* exports.allCitas = function (req, res) {
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
  } */
