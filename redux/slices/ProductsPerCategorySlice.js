import { createSlice } from "@reduxjs/toolkit";

const ProductsPerCategorySlice = createSlice({
  name: "ProductPerCategory",
  initialState: {},
  reducers: {
    addProductsPerCategory(state, { payload }) {
      state[payload.config.id] = payload.data.data;
    },
  },
});
export const { addProductsPerCategory } = ProductsPerCategorySlice.actions;
export default ProductsPerCategorySlice.reducer;
