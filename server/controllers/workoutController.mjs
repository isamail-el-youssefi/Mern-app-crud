import { mongoose } from "mongoose";
import { Workout } from "../models/workoutModel.mjs";

//! GET all workouts
export const getWorkouts = async (req, res) => {
  const users = await Workout.find({});
  if (!users) return res.status(404).json({ mssg: "No workouts found" });
  res.json(users);
};

//! GET a single workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const user = await Workout.findById(id);
  if (!user) return res.status(404).json({ mssg: "No workout found" });
  res.json(user);
};

//! POST a new workout
export const createWorkout = async (req, res) => {
  const { body } = req;
  try {
    const workout = await Workout.create(body);
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//! DELETE a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const deleteUser = await Workout.findByIdAndDelete(id);
  if (!deleteUser) return res.status(404).json({ mssg: "No workout found" });
  res.json({ mssg: "Workout deleted successfully" });
};

//! UPDATE a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const updateUser = await Workout.findByIdAndUpdate(
    id,
    { title, load, reps },
    { new: true }
  );
  if (!updateUser) return res.status(404).json({ mssg: "No workout found" });
  res.json({ mssg: "Workout updated successfully" });
};
