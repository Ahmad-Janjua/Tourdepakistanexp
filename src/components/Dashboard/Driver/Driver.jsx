import React from "react";
import { Routes, Route } from "react-router-dom";
import AddDriver from "./AddDriver/AddDriver";
import AllDriver from "./All Driver/AllDriver";
import EditDriver from "./Edit Driver/EditDriver";
import DetailDriver from "./DetailDriver/DetailDriver";
const Driver = () => {
  return (
    <Routes>
      <Route path="/add-driver" element={<AddDriver />}></Route>
      <Route path="/all-drivers" element={<AllDriver />}></Route>
      <Route path="/edit-driver/:id" element={<EditDriver />}></Route>
      <Route path="/details-driver/:id" element={<DetailDriver />}></Route>
    </Routes>
  );
};

export default Driver;
