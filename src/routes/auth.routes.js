const { Router } = require("express");
const {
  signinController,
  signupController,
  getProfile,
  logout,
  validate,
} = require("../controllers/authController");
const { verifyToken } = require("../libs/verifyToken");

const router = Router();

router.post("/signup", signupController);

router.post("/signin", signinController);
router.post("/validate", validate);

router.get("/logout", logout);

router.get("/me", verifyToken, getProfile);

module.exports = router;
