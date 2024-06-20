import { configureStore } from "@reduxjs/toolkit";
import { customerApi } from "./slices/customerSlice";

export const store = configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customerApi.middleware),
});
