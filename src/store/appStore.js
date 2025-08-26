import loginCredentialsReducer from "./slices/loginCredentialsSlice";
import servicingVehiclesReducer from "./slices/servicingVehiclesSlice";
import servicedVehiclesReducer from "./slices/servicedVehiclesSlice";
import allStaffsDetailsReducer from "./slices/allStaffsDetailsSlice";
import editServicingVehicleReducer from "./slices/editServicingVehicleSlice";
import serviceChargeDetailsReducer from "./slices/serviceChargeDetailsSlice";
import allVehiclesReducer from "./slices/allVehiclesSlice";
import walletBalanceReducer from "./slices/walletBalanceSlice";
const { configureStore } = require("@reduxjs/toolkit");

const appStore = configureStore({
  reducer: {
    loginCredentials: loginCredentialsReducer,
    servicingVehicles: servicingVehiclesReducer,
    servicedVehicles: servicedVehiclesReducer,
    allStaffsDetails: allStaffsDetailsReducer,
    serviceChargeDetails: serviceChargeDetailsReducer,
    allVehicles: allVehiclesReducer,
    walletBalance: walletBalanceReducer,
    editServicingVehicle: editServicingVehicleReducer,
  },
});
export default appStore;
