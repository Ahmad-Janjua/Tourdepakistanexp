import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Car from "./Car/Car";
import Customer from "./Customer/Customer";
import Driver from "./Driver/Driver";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Protected from "../ProtectedRoute";
import Tour from "./Tour/Tour";

const Dashboard = () => {
  return (
    <>
      {" "}
      <Navbar />
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/driver/*"
          element={
            <Protected>
              <Driver />
            </Protected>
          }
        />
        <Route
          path="/customer/*"
          element={
            <Protected>
              <Customer />
            </Protected>
          }
        />
        <Route
          path="/car/*"
          element={
            <Protected>
              <Car />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/tours/*"
          element={
            <Protected>
              <Tour />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default Dashboard;
