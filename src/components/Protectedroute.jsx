import React from "react";
import { Navigate } from "react-router-dom";
import authContext from "../lib/authContext";

function Protectedroute({ isSignedIn, children }) {
  const authCtx = React.useContext(authContext);
  if (isSignedIn === authCtx.userLoggedIn) {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default Protectedroute;
