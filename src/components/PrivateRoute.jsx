import { useEffect } from "react";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const admin = localStorage.getItem("admin_token");
  const navigate = useNavigate();
  const verifyToken = () => {
    if (admin) {
      const exp = jwtDecode(admin).exp * 1000;
      const date = new Date();
      const isExpired = exp < date.getTime();
      if (isExpired) {
        try {
          localStorage.removeItem("admin_token");
          localStorage.setItem("expiration", true);
        } catch (error) {}
      }
      return isExpired;
    }
    return true;
  };
  useEffect(() => {
    if (!admin || verifyToken()) {
      navigate("/login");
    }
  }, []);
  return <>{admin && children}</>;
};

export default PrivateRoute;
