import { configureStore } from "@reduxjs/toolkit";
import garageLoginCredentialsReducer from "./slices/garageLoginCredentialsSlice";
import servicingVehiclesReducer from "./slices/servicingVehiclesSlice";
import servicedVehiclesReducer from "./slices/servicedVehiclesSlice";
const appStore = configureStore({
  reducer: {
    garageLoginCredentials: garageLoginCredentialsReducer,
    servicingVehicles: servicingVehiclesReducer,
    servicedVehicles: servicedVehiclesReducer,
  },
});
export default appStore;
