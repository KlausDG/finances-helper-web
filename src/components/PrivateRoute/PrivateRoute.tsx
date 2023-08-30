import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "./PrivateRoute.types";
import { authSelector } from "@/concepts/Auth";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ outlet }: PrivateRouteProps) => {
  const { user } = useSelector(authSelector);
  if (user) {
    return outlet;
  } else {
    return <Navigate to="/login" />;
  }
};
