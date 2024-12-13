import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthorized } from "../../redux/user/selectors";
import React from "react";

interface Props {
  component: React.ReactNode;
  redirectTo: string;
}

const PrivateRoute = ({ component, redirectTo }: Props) => {
  const isAuthorized = useSelector(selectIsAuthorized);

  return isAuthorized ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
