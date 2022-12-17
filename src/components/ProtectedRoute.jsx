import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../assets/userContext";
const Protected = ({ children }) => {
  const { value } = useContext(UserContext);
  if (!localStorage.getItem("admin-token")) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default Protected;
