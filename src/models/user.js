const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('users', userSchema)