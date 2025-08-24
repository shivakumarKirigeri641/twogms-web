const { createSlice } = require("@reduxjs/toolkit");

const servicedVehiclesSlice = createSlice({
  name: "servicedVehicles",
  initialState: null,
  reducers: {
    addservicedVehicles: (state, action) => {
      return action.payload;
    },
    removeservicedVehicles: (state, action) => {
      return null;
    },
  },
});
export const { addservicedVehicles, removeservicedVehicles } =
  servicedVehiclesSlice.actions;
export default servicedVehiclesSlice.reducer;
