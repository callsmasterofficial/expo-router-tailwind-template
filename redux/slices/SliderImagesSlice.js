import { createSlice } from "@reduxjs/toolkit";

const SliderImagesSlice = createSlice({
  name: "sliderImages",
  initialState: {
    sliderImages: [],
  },
  reducers: {
    addSliderImages(state, action) {
      const values = Object.values(action.payload.contents);
      state.sliderImages = values;
    },
  },
});
export const { addSliderImages } = SliderImagesSlice.actions;

export default SliderImagesSlice.reducer;
