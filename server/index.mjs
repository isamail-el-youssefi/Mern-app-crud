import dotenv from "dotenv";
import workoutRoutes from "./routes/workouts.mjs";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

// express app
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log(error);
  });

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
