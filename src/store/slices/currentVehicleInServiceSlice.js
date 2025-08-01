import { createSlice } from "@reduxjs/toolkit";

const currentVehicleInServiceSlice = createSlice({
  name: "currentVehicleInService",
  initialState: null,
  reducers: {
    addcurrentVehicleInService: (state, action) => {
      return action.payload;
    },
    removecurrentVehicleInService: (state, action) => {
      return null;
    },
  },
});
export const { addcurrentVehicleInService, removecurrentVehicleInService } =
  currentVehicleInServiceSlice.actions;
export default currentVehicleInServiceSlice.reducer;
