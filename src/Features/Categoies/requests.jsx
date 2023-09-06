import { ORIGIN_BASE } from "../../constants";
import axios from "axios";

export const createCategory = (data) => {
  return axios.post(`${ORIGIN_BASE}/category`, data);
};

export const getAllCategories = () => {
  return axios.get(`${ORIGIN_BASE}/category/all`);
};

export const getAllCategoriesProperties = (id) => {
  return axios.get(`${ORIGIN_BASE}/category/prop/${id}`);
};

export const updateCategory = (data) => {
  return axios.put(`${ORIGIN_BASE}/category/${data.id}`, data);
};

export const deleteCategory = (id) => {
  return axios.delete(`${ORIGIN_BASE}/category/${id}`);
};

export const getCategoryProperties = (id) => {
  return axios.get(`${ORIGIN_BASE}/category/prop/${id}`);
};
export const addCategoryProp = (data) => {
  return axios.post(`${ORIGIN_BASE}/category/prop/add`, data);
};

export const updateImage = (data) => {
  return axios.put(`${ORIGIN_BASE}/category/image/${data.get("id")}`, data);
};
