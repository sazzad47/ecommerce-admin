import { useQuery } from "react-query";
import { getAllCustomers, getDahUser } from "./requests";

export const useCustomers = (query = null) => {
  const {
    isLoading: CustomersLoading,
    isSuccess: CustomersSuccess,
    refetch: GetCustomers,
    data: CustomersData,
  } = useQuery(["Customers"], () => getAllCustomers(), {
    cacheTime: 0,
    enabled: false,
  });

  const {
    isLoading: OneLoading,
    isSuccess: OneSuccess,
    refetch: GetOne,
    data: OneData,
  } = useQuery(["Customer", query], () => getDahUser(query), {
    cacheTime: 0,
    enabled: false,
  });

  return {
    CustomersLoading,
    CustomersSuccess,
    GetCustomers,
    CustomersData,

    OneLoading,
    OneSuccess,
    GetOne,
    OneData,
  };
};
