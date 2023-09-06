import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("admin_token");
const initialState = { admin: token ? jwtDecode(token) : null };

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});
export const selectAdmin = (state) => state.admin;
export default adminSlice.reducer;
