import axios from "axios";
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";


const WorkoutDetails = ({ workout }) => {
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  const handleClick = async () => {
    try {
      await axios.delete("http://localhost:4000/api/workouts/" + workout._id);

      // Filter out the deleted workout from the workouts array
      const updatedWorkouts = workouts.filter((w) => w._id !== workout._id);

      // Update the state with the filtered workouts
      setWorkouts(updatedWorkouts);
    } catch (error) {
      // Handle errors here
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}{" "}
      </p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
