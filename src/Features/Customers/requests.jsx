import { ORIGIN_BASE } from "../../constants";
import axios from "axios";

export const getAllCustomers = () => {
  return axios.get(`${ORIGIN_BASE}/users`);
};

export const getDahUser = (query) => {
  return axios.get(`${ORIGIN_BASE}/users/dash_user/${query}`);
};
