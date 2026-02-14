import { createSlice } from "@reduxjs/toolkit";

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    addCategories(state, action) {
      let myIndex = -1;
      state.map((item, index) => {
        if (item.id === action.payload.id) {
          myIndex = index;
        }
      });
      if (myIndex == -1) {
        state.push(action.payload);
      }
    },
  },
});
export const { addCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
