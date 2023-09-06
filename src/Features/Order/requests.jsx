import { ORIGIN_BASE } from "../../constants";
import axios from "axios";

export const getAllOrders = () => {
  return axios.get(`${ORIGIN_BASE}/order`);
};

export const getOneOrders = (id) => {
  return axios.get(`${ORIGIN_BASE}/order/${id}`);
};

export const updateOrderStatus = (data) => {
  return axios.put(`${ORIGIN_BASE}/order`, data);
};

export const getOrdersItems = (id) => {
  return axios.get(`${ORIGIN_BASE}/order/items/${id}`);
};
