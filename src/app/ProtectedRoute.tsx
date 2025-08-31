import React from "react";
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/log-in" />;
};

export const  RedirectRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
