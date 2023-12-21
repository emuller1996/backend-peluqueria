import { Router } from "express";
import {
  allBarbers,
  create,
  updateBarber,
  getBarber,
} from "../controllers/barberControllers.js";
import { verifyToken } from "../libs/verifyToken.js";
const barberRouter = Router();

barberRouter.get("/", allBarbers);
barberRouter.get("/:id", getBarber);
barberRouter.post("/", /* verifyToken, */ create);
barberRouter.put("/:id", /* verifyToken, */ updateBarber);

export default barberRouter;
