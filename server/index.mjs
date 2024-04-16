import dotenv from "dotenv";
import workoutRoutes from "./routes/workouts.mjs";
import userRoutes from "./routes/user.mjs";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package

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

// Enable CORS
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
