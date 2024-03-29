import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;
export const signupController = async (req, res) => {
  try {
    // Receiving Data
    const { username, email, password } = req.body;

    // Creating a new User
    const user = new User({
      username,
      email,
      password,
    });

    // encrypt the user's password
    user.password = await user.encryptPassword(password);

    await user.save();

    // Create a Token
    const token = sign({ id: user._id }, SECRET, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
    });

    res.json({ auth: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).send("There was a problem registering your user");
  }
};

export const getProfile = async (req, res) => {
  // res.status(200).send(decoded);
  // Search the Info base on the ID
  // const user = await User.findById(decoded.id, { password: 0});
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).send("No user found.");
  }
  res.status(200).json(user);
};

export const signinController = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("The email doesn't exists");
  }
  const validPassword = await user.comparePassword(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(401).send({ auth: false, token: null });
  }
  const token = sign({ id: user._id }, SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  res.status(200).json({ auth: true, token });
};

export const logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

export const validate = async (req, res) => {
  //console.log("validate");

  const token = req.headers["x-access-token"];

  // if does not exists a token
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "No Token aws Provided" });
  } else {
    return res.status(200).json({ token });
  }
};

export default {
  signupController,
  getProfile,
  signinController,
  logout,
  validate,
};
