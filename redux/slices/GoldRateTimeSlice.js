import { createSlice } from "@reduxjs/toolkit";

const GoldRateTimeSlice = createSlice({
  name: "goldTime",
  initialState: {
    goldRate: "Loading...",
    silverRate: "Loading...",
    updateTime: "",
  },
  reducers: {
    updateGoldRateTime(state, action) {
      state.goldRate = action.payload.goldRate;
      state.silverRate = action.payload.silverRate;
      state.updateTime = action.payload.updateTime;
    },
  },
});
export const { updateGoldRateTime } = GoldRateTimeSlice.actions;

export default GoldRateTimeSlice.reducer;
