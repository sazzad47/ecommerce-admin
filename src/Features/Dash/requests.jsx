import { ORIGIN_BASE } from "../../constants";
import axios from "axios";

export const getInitialData = () => {
  return axios.get(`${ORIGIN_BASE}/dash`);
};

export const getSliders = () => {
  return axios.get(`${ORIGIN_BASE}/dash/slider`);
};

export const addSlider = (data) => {
  return axios.post(`${ORIGIN_BASE}/dash/slider`, data);
};

export const deleteSlider = (id) => {
  return axios.delete(`${ORIGIN_BASE}/dash/slider/${id}`);
};

export const updatePage = (data) => {
  return axios.put(`${ORIGIN_BASE}/dash/pages/${data.id}`, data);
};

export const getPages = () => {
  return axios.get(`${ORIGIN_BASE}/dash/pages`);
};