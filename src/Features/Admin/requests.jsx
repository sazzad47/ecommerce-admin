import axios from "axios";
import { ORIGIN_BASE } from "../../constants";

export const LoginAdmin = (userData) => {
  return axios.post(`${ORIGIN_BASE}/admin/login`, userData);
};
