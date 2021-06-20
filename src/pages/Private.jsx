import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";

function Private({ component: RouteComponent, ...rest }) {
  const { currentStatus } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return currentStatus ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/"} />
        );
      }}
    />
  );
}

export default Private;
