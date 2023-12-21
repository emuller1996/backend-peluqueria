import express, { static as static_ } from "express";
import body_parser from "body-parser";
const { json, urlencoded } = body_parser;
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import mongoose from "mongoose";

import morgan from "morgan";

import barberRouter from "./routes/barbero.routes.js";
import appointmentRouter from "./routes/citas.routes.js";
import servicesRouter from "./routes/servicios.routes.js";
import clientRouter from "./routes/client.routes.js";
import authRouter from "./routes/auth.routes.js";

const { connect } = mongoose;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASSWORD = process.env.MONGOPASSWORD;
const MONGOHOST = process.env.MONGOHOST;
const MONGOPORT = process.env.MONGOPORT;

connect(`mongodb+srv://emuller:YUbgSbNCGAfl7QEt@barber.a34etpi.mongodb.net/barber`)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}", "${MONGOPORT}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/barber", barberRouter);
app.use("/services", servicesRouter);
app.use("/appointment", appointmentRouter);
app.use("/client", clientRouter);
app.use("/auth", authRouter);

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

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});

export default app;

/* app.listen(port,() => {
  console.log(`listening at http://localhost:${port}`);
}); */
