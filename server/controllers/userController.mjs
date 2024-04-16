import { User } from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

//! login a user
export const loginUser = async (req, res) => {};

//! signup a user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({token, user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
