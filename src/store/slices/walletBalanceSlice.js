const { createSlice } = require("@reduxjs/toolkit");

const walletBalanceSlice = createSlice({
  name: "walletBalance",
  initialState: null,
  reducers: {
    addwalletBalance: (state, action) => {
      return action.payload;
    },
    removewalletBalance: (state, action) => {
      return null;
    },
  },
});
export const { addwalletBalance, removewalletBalance } =
  walletBalanceSlice.actions;
export default walletBalanceSlice.reducer;
