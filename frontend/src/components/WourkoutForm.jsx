import React, { useContext, useState } from "react";
import axios from "axios";
import { WorkoutContext } from "../context/WorkoutContext";

export default function WourkoutForm() {
  const { setWorkouts, workouts } = useContext(WorkoutContext);

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/workouts",
        workout
      );
      console.log("new workout added:", response.data);
      console.log([...workouts, response.data]);

      if (response.status === 201) {
        // Empty inputs after posting Data
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);

        // Update the workouts state with the newly added workout
        setWorkouts((prevWorkouts) => [...prevWorkouts, response.data]);
        console.log("Updated workouts:", workouts);
      }
    } catch (error) {
      setError("Failed to add workout. Please try again.");
      console.error("Error adding workout:", error);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
