const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is missing"],
  },

  email: {
    type: String,
    required: [true, "User email address is missing"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    unique: true,
  },

  contact: {
    type: Number,
    required: [true, "Contact is misssing"],
  },

  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Password is missing"],
  },

  confirmPassword: {
    type: String,
    required: [true, "Please provide a confirm password"],
    validate: {
      validator: function (cp) {
        return this.password === cp;
      },
      message: "Password and confirm password does not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.checkPassword = async function (
  user_type_password,
  db_password
) {
  return await bcrypt.compare(user_type_password, db_password);
};

const userDTO = mongoose.model("User_DB", userSchema);
module.exports = userDTO;
