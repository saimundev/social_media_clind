import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }: { children: React.ReactNode | any}) => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
