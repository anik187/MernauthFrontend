import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import AuthProvider from "./lib/authProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen w-screen">
        <Header />
        <ToastContainer />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
