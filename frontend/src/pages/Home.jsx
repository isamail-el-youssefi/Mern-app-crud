import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WourkoutForm from "../components/WourkoutForm";

export default function Home() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      }
    };


    fetchWorkouts();
  }, []);

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
