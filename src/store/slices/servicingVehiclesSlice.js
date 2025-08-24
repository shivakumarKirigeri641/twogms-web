const { createSlice } = require("@reduxjs/toolkit");

const servicingVehiclesSlice = createSlice({
  name: "servicingVehicles",
  initialState: null,
  reducers: {
    addservicingVehicles: (state, action) => {
      return action.payload;
    },
    removeservicingVehicles: (state, action) => {
      return null;
    },
  },
});
export const { addservicingVehicles, removeservicingVehicles } =
  servicingVehiclesSlice.actions;
export default servicingVehiclesSlice.reducer;
