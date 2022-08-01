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


app.post("/create-barber", upload.single("file"), barberoR.create);

app.get("/all-barberos",barberoR.allBarber);



let Cita = require("./models/cita");
app.post("/agendar-cita", (req, res) => {
  console.log(req.body);

  const cita = new Cita({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    servicios: req.body.servicios,
    barbero_id : new mongoose.Types.ObjectId(req.body.barbero),
    hora : req.body.hora,
    fecha : req.body.fecha,
    estado : 'AGENDADA'
  });

  cita.save()
  .then((result) => {
    res.status(201).json({
      message: "Cita registered successfully!",
      citaCreated: {
        _id: result._id,
        hora: result.hora
      },
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
app.get("/citas-hoy",citasR.allCitasHoy);
app.get("/citas-barbero/:id",citasR.allCitasBarbero);
app.put('/update-cita/:id/:estado',citasR.editCitas)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
