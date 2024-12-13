import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthorized } from "../../redux/user/selectors";
import React from "react";

interface Props {
  component: React.ReactNode;
  redirectTo: string;
}

const RestrictedRoute = ({ component, redirectTo }: Props) => {
  const isAuthorized = useSelector(selectIsAuthorized);

  return isAuthorized ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
