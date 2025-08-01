import { createSlice } from "@reduxjs/toolkit";

const garageCredentialDetailsSlice = createSlice({
  name: "garageCredentialDetails",
  initialState: null,
  reducers: {
    addgarageCredentialDetails: (state, action) => {
      return action.payload;
    },
    removegarageCredentialDetails: (state, action) => {
      return null;
    },
  },
});
export const { addgarageCredentialDetails, removegarageCredentialDetails } =
  garageCredentialDetailsSlice.actions;
export default garageCredentialDetailsSlice.reducer;
