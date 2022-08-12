const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/barberia")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
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

const barberoR = require('./routes/barbero.routes');
const citasR = require('./routes/citas.routes');
const servciosR = require('./routes/servicios');


app.post("/create-barber", upload.single("file"), barberoR.create);

app.get("/all-barberos",barberoR.allBarber);


let Cita = require("./models/cita");
app.post("/citas", (req, res) => {
  console.log(req.body);

  const { nombre, servicios, barbero, hora, fecha } =  req.body;

  if ( !nombre || !servicios ||  !barbero ||  !hora ||  !fecha  ) res.json({error : 'Parametros Faltantes'})

  const cita = new Cita({
    _id: new mongoose.Types.ObjectId(),
    nombre: nombre,
    servicios: servicios,
    barbero_id : new mongoose.Types.ObjectId(barbero),
    hora : hora,
    fecha :fecha,
    estado : 'AGENDADA'
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
});
app.get("/all-citas",citasR.allCitas);
app.get("/citas-hoy/:fecha",citasR.allCitasHoy);
app.get("/citas-barbero/:id",citasR.allCitasBarbero);
app.put('/update-cita/:id/:estado',citasR.editCitas);
app.get('/citasDisponibleBarbero',citasR.citasDisponibleBarbero);


app.post('/servicios',servciosR.createServicios);
app.get('/servicios',servciosR.allServicios);

app.listen(port,() => {
  console.log(`listening at http://localhost:${port}`);
});
