import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//? Static signup method
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) throw Error("All fields are required");
  if (!validator.isEmail(email)) throw Error("Email is not valid");
  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  // Check if email already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedpassword });

  return user;
};

//? Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields are required");

  const user = await this.findOne({ email });

  if (!user) throw Error("Incorrect email");

  //? Compare password
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect password");

  return user;
};

export const User = mongoose.model("User", userSchema);
