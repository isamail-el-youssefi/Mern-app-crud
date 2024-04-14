import dotenv from "dotenv";
import workoutRoutes from "./routes/workouts.mjs";
import express from "express";

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// listen for requests
dotenv.config();
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
