import { createSlice } from "@reduxjs/toolkit";

const garageLoginCredentialsSlice = createSlice({
  name: "garageLoginCredentials",
  initialState: null,
  reducers: {
    addgarageLoginCredentials: (state, action) => {
      return action.payload;
    },
    removegarageLoginCredentials: (state, action) => {
      return null;
    },
  },
});
export const { addgarageLoginCredentials, removegarageLoginCredentials } =
  garageLoginCredentialsSlice.actions;
export default garageLoginCredentialsSlice.reducer;
