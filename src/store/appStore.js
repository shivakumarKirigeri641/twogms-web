import { configureStore } from "@reduxjs/toolkit";
import garageLoginCredentialsReducer from "./slices/garageLoginCredentialsSlice";
import servicingVehiclesReducer from "./slices/servicingVehiclesSlice";
import servicedVehiclesReducer from "./slices/servicedVehiclesSlice";
import allVehiclesReducer from "./slices/allVehiclesSlice";
const appStore = configureStore({
  reducer: {
    garageLoginCredentials: garageLoginCredentialsReducer,
    servicingVehicles: servicingVehiclesReducer,
    servicedVehicles: servicedVehiclesReducer,
    allVehicles: allVehiclesReducer,
  },
});
export default appStore;
