import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setUser } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post("http://localhost:4000/api/user/signup", {
      email,
      password,
    });
    const userData =  response.data;
    console.log("userdata:", userData);

    if (!response.ok) {
      setIsLoading(false);
      setError(userData.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(userData));

      // update the auth context
      setUser(userData);

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

//! this hooks return a functions that takes 2 parametres and 2 normal variables {isloadind,error}
