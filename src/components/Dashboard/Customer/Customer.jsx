import { Routes, Route } from "react-router-dom";
import AddCustomer from "./Add Customer/AddCustomer";
import AllCustomer from "./All Customers/AllCustomer";
import EditCustomer from "./Edit Customer/EditCustomer";
import DetailCustomer from "./Detail Customer/DetailCustomer";
const Customer = () => {
  return (
    <Routes>
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/all-customers" element={<AllCustomer />} />
      <Route path="/update-customer/:id" element={<EditCustomer />}></Route>
      <Route path="/details-customer/:id" element={<DetailCustomer />}></Route>
    </Routes>
  );
};

export default Customer;
