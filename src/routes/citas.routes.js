const { Router } = require("express");
const {
  createAppointment,
  allAppointment,
  changeStatusAppointment,
} = require("../controllers/appointmentControllers");
const appointmentRouter = Router();

appointmentRouter.get("/", allAppointment);
appointmentRouter.post("/", createAppointment);
appointmentRouter.patch("/:id/:state", changeStatusAppointment);

module.exports = appointmentRouter;
