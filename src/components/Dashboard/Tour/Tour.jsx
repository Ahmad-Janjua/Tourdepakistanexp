import React from "react";
import { Routes, Route } from "react-router-dom";
import AddTour from "./Add Tour/AddTour";
import AllTours from "./All Tours/AllTours";
import EditTour from "./Edit Tour/EditTour";
import TourDetails from "./Tour Details/TourDetails";
const Tour = () => {
  return (
    <Routes>
      <Route path="/add-tours" element={<AddTour />} />
      <Route path="/all-tours" element={<AllTours />} />
      <Route path="/tour-details/:id" element={<TourDetails />}></Route>
      <Route path="/update-tour/:id" element={<EditTour />}></Route>
    </Routes>
  );
};

export default Tour;
