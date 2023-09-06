import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../Features/Admin/state";
const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export default store;
