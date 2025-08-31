import axios from "axios";
import type { AuthData, UserData } from "../interfaces/auth.interface";
import { api } from "../utils/API_ENV";
import useAuthStore from "../store/authStore";
import { useState } from "react";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUserData } = useAuthStore();

  const registerUser = async (userData: Omit<AuthData, "confirmPassword">) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${api}/users/register`, userData, {
        withCredentials: true,
      });
      const userResponse = response.data as UserData;
      setIsAuthenticated(true);
      setUserData(userResponse);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (
    userData: Omit<AuthData, "name" | "confirmPassword">
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${api}/users/login`, userData, {
        withCredentials: true,
      });
      const userResponse = response.data as UserData;
      setIsAuthenticated(true);
      setUserData(userResponse);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, loginUser, isLoading };
};

export default useAuth;
