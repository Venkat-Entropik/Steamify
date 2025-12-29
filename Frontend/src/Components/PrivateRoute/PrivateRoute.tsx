import { type FC } from "react";
import type { UserType } from "../../types/streamify.types";
import { Navigate, Outlet } from "react-router";

interface PrivateRouteProps {
  authUser: UserType | undefined;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ authUser }) => {
  return !authUser ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
