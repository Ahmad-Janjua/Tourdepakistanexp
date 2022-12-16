import { useEffect, useMemo, useState } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Error404 from "./components/Dashboard/Error/Error404";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Login from "./components/Login/Login";
import { UserContext } from "./assets/userContext";
import History from "./components/Sidebar/History/History";
const Router = () => {
  const [value, setValue] = useState({});
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={providerValue}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
