import { configureStore } from "@reduxjs/toolkit";
import garageCredentialDetailsReducer from "./slices/garageCredentialDetails";
import servicedVehiclesSliceReducer from "./slices/servicedVehiclesSlice";
import servicingVehiclesSliceReducer from "./slices/servicingVehiclesSlice";
import currentVehicleInServiceReducer from "./slices/currentVehicleInServiceSlice";
const appStore = configureStore({
  reducer: {
    garageCredentialDetails: garageCredentialDetailsReducer,
    servicingVehicles: servicingVehiclesSliceReducer,
    servicedVehicles: servicedVehiclesSliceReducer,
    currentVehicleInService: currentVehicleInServiceReducer,
  },
});
export default appStore;
