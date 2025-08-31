import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProtectedRoute, RedirectRoute } from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Chats from "../pages/chats";
import useAuthStore from "../store/authStore";
import useSocketStore from "../store/socketStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Chats />,
      },
    ],
  },
  {
    path: "/auth",
    element: <RedirectRoute />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          { path: "log-in", element: <Login /> },
          { path: "sign-up", element: <Register /> },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  const { userData } = useAuthStore();
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    if (userData?._id) {
      connectSocket(userData._id);
    }

    return () => disconnectSocket();
  }, [userData?._id]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
