const { createSlice } = require("@reduxjs/toolkit");

const allVehiclesSlice = createSlice({
  name: "allVehicles",
  initialState: null,
  reducers: {
    addallVehicles: (state, action) => {
      return action.payload;
    },
    removeallVehicles: (state, action) => {
      return null;
    },
  },
});
export const { addallVehicles, removeallVehicles } = allVehiclesSlice.actions;
export default allVehiclesSlice.reducer;
