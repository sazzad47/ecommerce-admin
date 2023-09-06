import { ORIGIN_BASE } from "../../constants";
import axios from "axios";

export const createProperty = (data) => {
  return axios.post(`${ORIGIN_BASE}/property`, data);
};

export const getAllProperties = () => {
  return axios.get(`${ORIGIN_BASE}/property`);
};

export const updateProperty = (data) => {
  return axios.put(`${ORIGIN_BASE}/property/${data.id}`, data);
};

export const deleteProperty = (id) => {
  return axios.delete(`${ORIGIN_BASE}/property/${id}`);
};

export const updatePropertyValue = (data) => {
  return axios.put(`${ORIGIN_BASE}/property/values/${data.id}`, data);
};

export const deletePropertyValue = (id) => {
  return axios.delete(`${ORIGIN_BASE}/property/values/${id}`);
};

export const addPropertyValue = (data) => {
  return axios.post(`${ORIGIN_BASE}/property/values/${data.id}`, data);
};
