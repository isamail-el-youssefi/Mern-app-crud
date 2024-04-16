import { User } from "../models/userModel.mjs";

//! login a user
export const loginUser = async (req, res) => {};

//! signup a user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
