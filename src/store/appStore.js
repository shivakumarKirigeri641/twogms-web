import loginCredentialsReducer from "./slices/loginCredentialsSlice";
import servicingVehiclesReducer from "./slices/servicingVehiclesSlice";
const { configureStore } = require("@reduxjs/toolkit");

const appStore = configureStore({
  reducer: {
    loginCredentials: loginCredentialsReducer,
    servicingVehicles: servicingVehiclesReducer,
  },
});
export default appStore;
