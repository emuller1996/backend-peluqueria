import { Router } from "express";
import { createAppointment, allAppointment, changeStatusAppointment, getHoursAvailablePerDay, getAllAppointmentsbyDate, getAppointment, getAllAppointmentsbyClient } from "../controllers/appointmentControllers.js";
import { verifyToken } from "../libs/verifyToken.js";
const appointmentRouter = Router();

appointmentRouter.get("/", allAppointment);
appointmentRouter.get("/all/:date",verifyToken, getAllAppointmentsbyDate);
appointmentRouter.get("/confirmation/:id", getAppointment);
appointmentRouter.get("/client/:id", getAllAppointmentsbyClient);
appointmentRouter.get("/:id/:date", allAppointment);
appointmentRouter.get("/hoursavailable/:id/:date", getHoursAvailablePerDay);
appointmentRouter.post("/", createAppointment);
appointmentRouter.patch("/:id/:state", verifyToken, changeStatusAppointment);

export default appointmentRouter;
