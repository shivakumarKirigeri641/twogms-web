import { configureStore } from "@reduxjs/toolkit";
import garageCredentialDetailsReducer from "./slices/garageCredentialDetails";
const appStore = configureStore({
  reducer: {
    garageCredentialDetails: garageCredentialDetailsReducer,
  },
});
export default appStore;
