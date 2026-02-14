import { createSlice } from "@reduxjs/toolkit";
const SilverRateSlice = createSlice({
  name: "currentSilverRate",
  initialState: {
    fineSilverRate: "",
    discounted24k: "",
    discounted22k: "",
    discounted18k: "",
    discounted14k: "",
    discounted9k: "",
    SilverIncDec: "",
  },
  reducers: {
    addSilverRate(state, action) {
      state.fineSilverRate = Math.round(
        Number(action.payload.currentRate) / 100
      );
      if (action.payload.discount["-24k"]) {
        state.discounted24k =
          Math.round(Number(action.payload.currentRate) / 100) -
          Number(action.payload.discount["-24k"]);
      } else if (action.payload.discount["+24k"]) {
        state.discounted24k =
          Math.round(Number(action.payload.currentRate) / 100) +
          Number(action.payload.discount["+24k"]);
      }
      if (action.payload.discount["-22k"]) {
        state.discounted22k = Math.round(
          (action.payload.currentRate * 91.67) / 100 / 100 -
            Number(action.payload.discount["-22k"])
        );
      } else if (action.payload.discount["+22k"]) {
        state.discounted22k = Math.round(
          (action.payload.currentRate * 91.67) / 100 / 100 +
            Number(action.payload.discount["+22k"])
        );
      }
      if (action.payload.discount["-18k"]) {
        state.discounted18k = Math.round(
          (action.payload.currentRate * 75) / 100 / 100 -
            Number(action.payload.discount["-18k"])
        );
      } else if (action.payload.discount["+18k"]) {
        state.discounted18k = Math.round(
          (action.payload.currentRate * 75) / 100 / 100 +
            Number(action.payload.discount["+18k"])
        );
      }
      if (action.payload.discount["-14k"]) {
        state.discounted14k = Math.round(
          (action.payload.currentRate * 58.33) / 100 / 100 -
            Number(action.payload.discount["-14k"])
        );
      } else if (action.payload.discount["+14k"]) {
        state.discounted14k = Math.round(
          (action.payload.currentRate * 58.33) / 100 / 100 +
            Number(action.payload.discount["+14k"])
        );
      }
      if (action.payload.discount["-9k"]) {
        state.discounted9k = Math.round(
          (action.payload.currentRate * 37.5) / 100 / 100 -
            Number(action.payload.discount["-9k"])
        );
      } else if (action.payload.discount["+9k"]) {
        state.discounted9k = Math.round(
          (action.payload.currentRate * 37.5) / 100 / 100 +
            Number(action.payload.discount["+9k"])
        );
      }
    },
    addSilverIncDec(state, action) {
      state.SilverIncDec = action.payload;
    },
  },
});
export const { addSilverRate, addSilverIncDec } = SilverRateSlice.actions;
export default SilverRateSlice.reducer;
