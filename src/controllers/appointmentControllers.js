let express = require("express"),
  mongoose = require("mongoose");

let Appointment = require("../models/appointment");

const hours = [
  { hour: "08:00", state: true },
  { hour: "08:30", state: true },
  { hour: "09:00", state: true },
  { hour: "09:30", state: true },
  { hour: "10:00", state: true },
  { hour: "10:30", state: true },
  { hour: "11:00", state: true },
  { hour: "11:30", state: true },
  { hour: "14:00", state: true },
  { hour: "14:30", state: true },
  { hour: "15:00", state: true },
  { hour: "15:30", state: true },
  { hour: "16:00", state: true },
  { hour: "16:30", state: true },
  { hour: "17:00", state: true },
  { hour: "17:30", state: true },
];

const createAppointment = async (req, res) => {
  //console.log(req.body);
  const appointment = req.body;

  if (!appointment.hasOwnProperty("client_id"))
    return res.status(422).json({ error: `client_id no provided` });
  if (!appointment.hasOwnProperty("services"))
    return res.status(422).json({ error: `services no provided` });
  if (!appointment.hasOwnProperty("barber_id"))
    return res.status(422).json({ error: `barber_id no provided` });

  //Validar Hora Disponible
  try {
    const result = await Appointment.find({
      barber_id: appointment.barber_id,
      date: appointment.date,
      hour: appointment.hour,
    });
    if (result.length > 0)
      return res
        .status(406)
        .json({
          message:
            "the hour for your appointment with the barber is not available",
        });
  } catch (error) {
    return res.status(406).json({ error: error.message });
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
  console.log(req.params);
  const date = req.params.date;
  const barber_id = req.params.id;

  let filter = {};
  if (date) Object.assign(filter, { date : {
    $gte: `${date}T00:00:00.000Z`,
    $lte: `${date}T23:59:00.000Z`
  } });
  if (barber_id) Object.assign(filter, { barber_id });

  const allAppointment = await Appointment.find(filter)
    .populate({
      path: "services",
      select: ["name", "price"],
    })
    .populate("barber_id", "name")
    .populate("client_id", "name")
    .sort({date:1});
    


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

const getHoursAvailablePerDay = async (req, res) => {
  console.log(req.params);
  const date = req.params.date;
  const barber_id = req.params.id;

  let hoursAvailable = [];

  let filter = {};
  if (date) Object.assign(filter, { date });
  if (barber_id) Object.assign(filter, { barber_id });

  const allAppointment = await Appointment.find(filter).populate(
    "barber_id",
    "name"
  );

  const hoursBusy = allAppointment.map((a) => a.hour);

  for (const hour of hours) {
    console.log(hoursBusy.includes(hour.hour));
    if (!hoursBusy.includes(hour.hour)) {
      hoursAvailable.push(hour);
    }
  }

  res.status(200).json({ hours: hoursAvailable });
};

const getAllAppointmentsbyDate = async (req, res) => {
  const date = req.params.date;

  const allAppointment = await Appointment.find({date : 
    {
      $gte: `${date}T00:00:00.000Z`,
      $lte: `${date}T23:59:00.000Z`
    }})
    .populate({
      path: "services",
      select: ["name", "price"],
    })
    .populate("barber_id", "name")
    .populate("client_id", "name")
    .sort({date:1});
    


  res.status(200).json({ appointments: allAppointment });
}

module.exports = {
  createAppointment,
  allAppointment,
  changeStatusAppointment,
  getHoursAvailablePerDay,
  getAllAppointmentsbyDate
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
