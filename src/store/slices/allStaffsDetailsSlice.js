const { createSlice } = require("@reduxjs/toolkit");

const allStaffsDetailsSlice = createSlice({
  name: "allStaffsDetails",
  initialState: null,
  reducers: {
    addallStaffsDetails: (state, action) => {
      return action.payload;
    },
    removeallStaffsDetails: (state, action) => {
      return null;
    },
  },
});
export const { addallStaffsDetails, removeallStaffsDetails } =
  allStaffsDetailsSlice.actions;
export default allStaffsDetailsSlice.reducer;
