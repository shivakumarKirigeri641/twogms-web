import loginCredentialsReducer from "./slices/loginCredentialsSlice";
import servicingVehiclesReducer from "./slices/servicingVehiclesSlice";
import servicedVehiclesReducer from "./slices/servicedVehiclesSlice";
const { configureStore } = require("@reduxjs/toolkit");

const appStore = configureStore({
  reducer: {
    loginCredentials: loginCredentialsReducer,
    servicingVehicles: servicingVehiclesReducer,
    servicedVehicles: servicedVehiclesReducer,
  },
});
export default appStore;
