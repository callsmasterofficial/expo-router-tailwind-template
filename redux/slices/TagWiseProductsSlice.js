import { createSlice } from "@reduxjs/toolkit";

const TagWiseProductsSlice = createSlice({
  name: "tagWiseProducts",
  initialState: {
    products: {},
  },
  reducers: {
    addTagWiseProducts(state, action) {
      if (state.products[action.payload.tagName]) {
        state.products[action.payload.tagName] = [
          ...state.products[action.payload.tagName],
          ...action.payload.data.data,
        ];
      } else {
        state.products[action.payload.tagName] = action.payload.data.data;
      }
    },
  },
});
export const { addTagWiseProducts } = TagWiseProductsSlice.actions;

export default TagWiseProductsSlice.reducer;
