import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./screens/Login.jsx";
import Homescreen from "./screens/Homescreen.jsx";
import Register from "./screens/Register.jsx";
import Profilescreen from "./screens/Profilescreen.jsx";
import Protectedroute from "./components/Protectedroute.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Homescreen />} />
      <Route
        path="/login"
        element={
          <Protectedroute isSignedIn={false}>
            <Login />
          </Protectedroute>
        }
      />
      <Route
        path="/register"
        element={
          <Protectedroute isSignedIn={false}>
            <Register />
          </Protectedroute>
        }
      />
      <Route
        path="/profile"
        element={
          <Protectedroute isSignedIn={true}>
            <Profilescreen />
          </Protectedroute>
        }
      />
    </Route>
  )
);

if (import.meta.env.MODE === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
