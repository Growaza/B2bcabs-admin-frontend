import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  React.useEffect(() => {
    localStorage.removeItem("user");
    return navigate("/authentication/sign-in");
  }, []);
  return <div>logout</div>;
};

export default Logout;
