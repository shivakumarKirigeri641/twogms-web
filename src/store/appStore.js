import { configureStore } from "@reduxjs/toolkit";
import garageLoginCredentialsReducer from "./slices/garageLoginCredentialsSlice";
import servicingVehiclesReducer from "./slices/servicingVehiclesSlice";

const appStore = configureStore({
  reducer: {
    garageLoginCredentials: garageLoginCredentialsReducer,
    servicingVehicles: servicingVehiclesReducer,
  },
});
export default appStore;
