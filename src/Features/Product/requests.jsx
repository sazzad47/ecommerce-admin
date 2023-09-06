import { ORIGIN_BASE } from "../../constants";
import axios from "axios";

export const createProduct = (data) => {
  return axios.post(`${ORIGIN_BASE}/product`, data);
};

export const getAlProducts = () => {
  return axios.get(`${ORIGIN_BASE}/product`);
};

export const deleteProduct = (id) => {
  return axios.delete(`${ORIGIN_BASE}/product/${id}`);
};

export const getProduct = (id) => {
  return axios.get(`${ORIGIN_BASE}/product/dash/${id}`);
};

export const updateProduct = (data) => {
  return axios.put(`${ORIGIN_BASE}/product/${data.pid}`, data);
};

export const SearchProductsByName = (query) => {
  return axios.get(
    `${ORIGIN_BASE}/product/search?${query ? "name=" + query : ""}`
  );
};
export const getProductImages = (id) => {
  return axios.get(`${ORIGIN_BASE}/product/images?pid=${id}`);
};

export const DeleteProductImage = (id) => {
  return axios.delete(`${ORIGIN_BASE}/product/images/${id}`);
};

export const AddProductImage = (data) => {
  return axios.post(`${ORIGIN_BASE}/product/images/${data.get("id")}`, data);
};

export const getProductProps = (id) => {
  return axios.get(`${ORIGIN_BASE}/product/props/get/${id}`);
};

export const deleteProductProps = (data) => {
  return axios.delete(`${ORIGIN_BASE}/product/${data.id}/${data.prop_id}`);
};

export const addProductProps = (data) => {
  return axios.post(`${ORIGIN_BASE}/product/${data.id}/${data.prop_id}`, data);
};
