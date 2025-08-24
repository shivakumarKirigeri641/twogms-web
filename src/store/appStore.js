import loginCredentialsReducer from "./slices/loginCredentialsSlice";
const { configureStore } = require("@reduxjs/toolkit");

const appStore = configureStore({
  reducer: {
    loginCredentials: loginCredentialsReducer,
  },
});
export default appStore;
