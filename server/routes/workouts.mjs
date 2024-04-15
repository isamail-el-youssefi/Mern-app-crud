import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workoutController.mjs";

const router = Router();

// GET all workouts
router.get("/", getWorkouts);
// GET a single workout
router.get("/:id", getWorkout);
// POST a new workout
router.post("/", createWorkout);
// DELETE a workout
router.delete("/:id", deleteWorkout);
// UPDATE a workout
router.patch("/:id", updateWorkout);

export default router;
