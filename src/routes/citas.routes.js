const { Router } = require("express");
const {
  createAppointment,
  allAppointment,
  changeStatusAppointment,
  getHoursAvailablePerDay,
  getAllAppointmentsbyDate,
  getAppointment,
  getAllAppointmentsbyClient
} = require("../controllers/appointmentControllers");
const { verifyToken } = require("../libs/verifyToken");
const appointmentRouter = Router();

appointmentRouter.get("/", allAppointment);
appointmentRouter.get("/all/:date",verifyToken, getAllAppointmentsbyDate);
appointmentRouter.get("/confirmation/:id", getAppointment);
appointmentRouter.get("/client/:id", getAllAppointmentsbyClient);
appointmentRouter.get("/:id/:date", allAppointment);
appointmentRouter.get("/hoursavailable/:id/:date", getHoursAvailablePerDay);
appointmentRouter.post("/", createAppointment);
appointmentRouter.patch("/:id/:state", verifyToken, changeStatusAppointment);

module.exports = appointmentRouter;
