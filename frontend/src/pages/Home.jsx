import React, { useContext, useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WourkoutForm from "../components/WourkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";

export default function Home() {
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts"); // Use Axios for GET request
        setWorkouts(response.data); // Axios response data directly contains the JSON data
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, [setWorkouts]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout, index) => (
            <WorkoutDetails workout={workout} key={index} />
          ))}
      </div>
      <WourkoutForm />
    </div>
  );
}
