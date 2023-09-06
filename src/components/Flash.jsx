import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
const Flash = ({ children }) => {
  useEffect(() => {
    if (localStorage.getItem("expiration")) {
      toast.error("Your token expired please re-login");
      localStorage.removeItem("expiration");
    }
  }, []);
  return <>{children}</>;
};

export default Flash;
