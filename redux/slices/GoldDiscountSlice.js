import { createSlice } from "@reduxjs/toolkit";
const GoldDiscountSlice = createSlice({
  name: "goldDiscountRate",
  initialState: {
    discountRate: "",
  },
  reducers: {
    addGoldDiscount(state, action) {
      state.discountRate = action.payload.contents;
    },
  },
});
export const { addGoldDiscount } = GoldDiscountSlice.actions;
export default GoldDiscountSlice.reducer;
