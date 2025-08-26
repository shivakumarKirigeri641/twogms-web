const { createSlice } = require("@reduxjs/toolkit");

const editServicingVehicleSlice = createSlice({
  name: "editServicingVehicle",
  initialState: null,
  reducers: {
    addeditServicingVehicle: (state, action) => {
      return action.payload;
    },
    removeeditServicingVehicle: (state, action) => {
      return null;
    },
  },
});
export const { addeditServicingVehicle, removeeditServicingVehicle } =
  editServicingVehicleSlice.actions;
export default editServicingVehicleSlice.reducer;
