import mongoose from "mongoose";
const { Schema, model } = mongoose;

import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
  return compare(password, this.password);
};
export default model("user", userSchema);
