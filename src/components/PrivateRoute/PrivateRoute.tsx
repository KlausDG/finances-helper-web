import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "./PrivateRoute.types";

export const PrivateRoute = ({
  isAuthenticated,
  outlet,
}: PrivateRouteProps) => {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to="/login" />;
  }
};
