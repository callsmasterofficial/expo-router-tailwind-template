import { createSlice } from "@reduxjs/toolkit";

const HamburgerToXSlice = createSlice({
  name: "hamburgerToX",
  initialState: {
    iconState: true,
  },
  reducers: {
    toggleHamburgerToX(state, action) {
      state.iconState = action.payload;
    },
  },
});
export const { toggleHamburgerToX } = HamburgerToXSlice.actions;

export default HamburgerToXSlice.reducer;
