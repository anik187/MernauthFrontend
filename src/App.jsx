import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="min-h-screen w-screen">
      <Header />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
