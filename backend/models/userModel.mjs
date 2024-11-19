import mongoose from "mongoose";
import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";

// Define schema for User model
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  registrationType: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  kvkNumber: {
    type: String,
    required: true
  },
  practiceAddress: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 12);
  next();
  console.log("successful create user")
});

const User = mongoose.model("User", UserSchema);

export default User;
