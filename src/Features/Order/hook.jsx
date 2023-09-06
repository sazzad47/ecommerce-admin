import { useQuery, useMutation } from "react-query";
import {
  getAllOrders,
  getOrdersItems,
  updateOrderStatus,
  getOneOrders,
} from "./requests";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useOrders = (id = null) => {
  const {
    isLoading: OrdersLoading,
    isSuccess: OrdersSuccess,
    refetch: GetOrders,
    data: OrdersData,
  } = useQuery(["Orders"], () => getAllOrders(), {
    cacheTime: 0,
    enabled: false,
  });

  const {
    isLoading: OneLoading,
    isSuccess: OneSuccess,
    refetch: GetOne,
    data: OneData,
  } = useQuery(["Order", id], () => getOneOrders(id), {
    cacheTime: 0,
    enabled: false,
  });

  const {
    isLoading: UpdateLoading,
    isSuccess: UpdateSuccess,
    mutateAsync: Update,
    data: UpdateData,
  } = useMutation(updateOrderStatus);

  useEffect(() => {
    if (UpdateSuccess) {
      toast.success("Updated succefully");
      GetOrders();
    }
  }, [UpdateLoading, UpdateSuccess]);

  return {
    OrdersLoading,
    OrdersSuccess,
    GetOrders,
    OrdersData,

    UpdateLoading,
    UpdateSuccess,
    Update,
    UpdateData,

    OneLoading,
    OneSuccess,
    GetOne,
    OneData,
  };
};

export const useOrdersItems = (id) => {
  const {
    isLoading: ItemsLoading,
    isSuccess: ItemsSuccess,
    refetch: GetItems,
    data: ItemsData,
  } = useQuery(["Items", id], () => getOrdersItems(id), {
    cacheTime: 0,
    enabled: false,
  });

  return {
    ItemsLoading,
    ItemsSuccess,
    GetItems,
    ItemsData,
  };
};
