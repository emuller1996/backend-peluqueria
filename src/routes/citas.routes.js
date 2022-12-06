const { Router } = require("express");
const {
  createAppointment,
  allAppointment,
  changeStatusAppointment,
  getHoursAvailablePerDay
} = require("../controllers/appointmentControllers");
const appointmentRouter = Router();

appointmentRouter.get("/", allAppointment);
appointmentRouter.get("/:id/:date", allAppointment);
appointmentRouter.get("/hoursavailable/:id/:date", getHoursAvailablePerDay);
appointmentRouter.post("/", createAppointment);
appointmentRouter.patch("/:id/:state", changeStatusAppointment);

module.exports = appointmentRouter;
