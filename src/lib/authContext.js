import { createContext } from "react";

const authContext = createContext({
    userLoggedIn: null,
    logInUser: () => { },
    logOutUser: () => { }
})

export default authContext;