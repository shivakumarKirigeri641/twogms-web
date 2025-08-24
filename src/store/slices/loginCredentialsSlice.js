const { createSlice } = require("@reduxjs/toolkit");

const loginCredentialsSlice = createSlice({
  name: "loginCredentials",
  initialState: null,
  reducers: {
    addloginCredentials: (state, action) => {
      return action.payload;
    },
    removeloginCredentials: (state, action) => {
      return null;
    },
  },
});
export const { addloginCredentials, removeloginCredentials } =
  loginCredentialsSlice.actions;
export default loginCredentialsSlice.reducer;
