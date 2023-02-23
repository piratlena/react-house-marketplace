import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const LoggedIn = false;
  return LoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
export default PrivateRoute;
