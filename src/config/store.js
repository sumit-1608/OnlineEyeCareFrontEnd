import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./userAuthSlice";
import doctorSlice from "./doctorSlice";

export const store = configureStore({
  reducer: {
    user_auth: counterReducer,
    doctorReducer: doctorSlice,
  },
});
