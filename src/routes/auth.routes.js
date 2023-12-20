import { Router } from "express";
import { signinController, signupController, getProfile, logout, validate } from "../controllers/authController.js";
import { verifyToken } from "../libs/verifyToken.js";

const router = Router();

router.post("/signup", signupController);

router.post("/signin", signinController);
router.post("/validate", validate);

router.get("/logout", logout);

router.get("/me", verifyToken, getProfile);

export default router;
