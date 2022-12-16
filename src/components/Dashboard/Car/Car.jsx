import React from "react";
import { Routes, Route } from "react-router-dom";
import AddBrand from "./Add Brand/AddBrand";
import AddCar from "./Add Car/AddCar";
import AllCars from "./All Cars/AllCars";
import EditCar from "./Edit Car/EditCar";
import DetailCar from "./DetailCar/DetailCar";
const Car = () => {
  return (
    <Routes>
      <Route path="/add-brand" element={<AddBrand />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/all-cars" element={<AllCars />} />
      <Route path="/edit-car/:id" element={<EditCar />} />
      <Route path="/details-car/:id" element={<DetailCar />} />
    </Routes>
  );
};

export default Car;
