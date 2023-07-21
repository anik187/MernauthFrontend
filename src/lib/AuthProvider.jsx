import authContext from "./authContext";
import { useReducer } from "react";

const defaultAuthState = {
  userLoggedIn: localStorage.getItem("userInfo") ? true : false,
};
const authReducer = (state, action) => {
  if (action.type == "ADD") {
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
    return {
      userLoggedIn: true,
    };
  }
  if (action.type == "REMOVE") {
    localStorage.removeItem("userInfo");
    return {
      userLoggedIn: false,
    };
  }
  return defaultAuthState;
};
function AuthProvider(props) {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );
  const logInHandler = (payload) => {
    dispatchAuthAction({ type: "ADD", payload: payload });
  };
  const logOutHandler = () => {
    dispatchAuthAction({ type: "REMOVE" });
  };
  const AuthContext = {
    userLoggedIn: authState.userLoggedIn,
    logInUser: logInHandler,
    logOutUser: logOutHandler,
  };
  return (
    <authContext.Provider value={AuthContext}>
      {props.children}
    </authContext.Provider>
  );
}
export default AuthProvider;
