const { createSlice } = require("@reduxjs/toolkit");

const serviceChargeDetailsSlice = createSlice({
  name: "serviceChargeDetails",
  initialState: null,
  reducers: {
    addserviceChargeDetails: (state, action) => {
      return action.payload;
    },
    removeserviceChargeDetails: (state, action) => {
      return null;
    },
  },
});
export const { addserviceChargeDetails, removeserviceChargeDetails } =
  serviceChargeDetailsSlice.actions;
export default serviceChargeDetailsSlice.reducer;
