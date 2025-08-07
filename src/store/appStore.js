import { configureStore } from "@reduxjs/toolkit";
import garageLoginCredentialsReducer from "./slices/garageLoginCredentialsSlice";

const appStore = configureStore({
  reducer: {
    garageLoginCredentials: garageLoginCredentialsReducer,
  },
});
export default appStore;
