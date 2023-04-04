const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require('morgan');


const barberRouter = require('./routes/barbero.routes');
const appointmentRouter = require('./routes/citas.routes');
const servicesRouter = require('./routes/servicios.routes');
const clientRouter = require('./routes/client.routes');
const authRouter = require('./routes/auth.routes');

const MONGOUSER = process.env.MONGOUSER;
const MONGOPASSWORD = process.env.MONGOPASSWORD;
const MONGOHOST = process.env.MONGOHOST;
const MONGOPORT = process.env.MONGOPORT;


mongoose
  .connect(`mongodb://${MONGOHOST}:${ MONGOPORT}/barberia`)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}", "${MONGOPORT}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use("/public", express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));



app.use('/barber', barberRouter);
app.use('/services', servicesRouter);
app.use('/appointment', appointmentRouter);
app.use('/client', clientRouter);
app.use('/auth', authRouter);



  /* app.post('/servicios',servciosR.createServicios);
  app.get('/servicios',servciosR.allServicios);
 */
/* app.post("/create-barber", upload.single("file"), barberoR.create);
app.get("/all-barberos",barberoR.allBarber); */


/* let Cita = require("./models/appointment");
app.post("/citas",citasR.createCita );
app.get("/all-citas",citasR.allCitas);
app.get("/citas-hoy/:fecha",citasR.allCitasHoy);
app.get("/citas-barbero/:id",citasR.allCitasBarbero);
app.put('/update-cita/:id/:estado',citasR.editCitas);
app.get('/citasDisponibleBarbero',citasR.citasDisponibleBarbero);
 */



app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});

module.exports = app;

/* app.listen(port,() => {
  console.log(`listening at http://localhost:${port}`);
}); */
