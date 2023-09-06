import { useMutation } from "react-query";
import { LoginAdmin } from "./requests";

import { useSelector } from "react-redux";
import { selectAdmin } from "./state";
export const useLogin = () => {
  const { mutate, isError, isLoading, error } = useMutation(LoginAdmin, {
    onSuccess: (data) => {
      // this function fires if the login success
      localStorage.setItem("admin_token", data.data.token);
      window.location.reload();
    },
  });

  return {
    mutate,
    isError,
    isLoading,
    error,
  };
};

export const useAdminDetails = () => {
  const { admin } = useSelector(selectAdmin);

  return {
    admin,
  };
};
