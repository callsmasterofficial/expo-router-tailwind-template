import { createSlice } from "@reduxjs/toolkit";
const SilverDiscountSlice = createSlice({
  name: "silverDiscountRate",
  initialState: {
    discountRate: "",
  },
  reducers: {
    addSilverDiscount(state, action) {
      state.discountRate = action.payload.contents;
    },
  },
});
export const { addSilverDiscount } = SilverDiscountSlice.actions;
export default SilverDiscountSlice.reducer;
