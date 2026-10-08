import { createSlice } from "@reduxjs/toolkit";
const GoldRateSlice = createSlice({
  name: "currentGoldRate",
  initialState: {
    fineGoldRate: "",
    discounted24k: "",
    discounted22k: "",
    discounted20k: "",
    discounted18k: "",
    discounted14k: "",
    discounted9k: "",
    goldIncDec: "",
  },
  reducers: {
    addGoldRate(state, action) {
      state.fineGoldRate = Number(action.payload.currentRate);
      if (action.payload.discount["-24k"]) {
        console.log("discount 24k", Number(action.payload.currentRate));
        state.discounted24k =
          Number(action.payload.currentRate) -
          Number(action.payload.discount["-24k"]);
      } else if (action.payload.discount["+24k"]) {
        state.discounted24k =
          Number(action.payload.currentRate) +
          Number(action.payload.discount["+24k"]);
      }
      if (action.payload.discount["-22k"]) {
        state.discounted22k = Math.round(
          (action.payload.currentRate * 91.67) / 100 -
            Number(action.payload.discount["-22k"]),
        );
      } else if (action.payload.discount["+22k"]) {
        state.discounted22k = Math.round(
          (action.payload.currentRate * 91.67) / 100 +
            Number(action.payload.discount["+22k"]),
        );
      }
      if (action.payload.discount["-20k"]) {
        state.discounted20k = Math.round(
          (action.payload.currentRate * 83.3) / 100 -
            Number(action.payload.discount["-20k"]),
        );
      } else if (action.payload.discount["+20k"]) {
        state.discounted20k = Math.round(
          (action.payload.currentRate * 83.3) / 100 +
            Number(action.payload.discount["+20k"]),
        );
      }
      if (action.payload.discount["-18k"]) {
        state.discounted18k = Math.round(
          (action.payload.currentRate * 75) / 100 -
            Number(action.payload.discount["-18k"]),
        );
      } else if (action.payload.discount["+18k"]) {
        state.discounted18k = Math.round(
          (action.payload.currentRate * 75) / 100 +
            Number(action.payload.discount["+18k"]),
        );
      }
      if (action.payload.discount["-14k"]) {
        state.discounted14k = Math.round(
          (action.payload.currentRate * 58.33) / 100 -
            Number(action.payload.discount["-14k"]),
        );
      } else if (action.payload.discount["+14k"]) {
        state.discounted14k = Math.round(
          (action.payload.currentRate * 58.33) / 100 +
            Number(action.payload.discount["+14k"]),
        );
      }
      // 9k Logic (37.5% Purity)
      if (action.payload.discount["-9k"]) {
        state.discounted9k = Math.round(
          (action.payload.currentRate * 37.5) / 100 -
            Number(action.payload.discount["-9k"]),
        );
      } else if (action.payload.discount["+9k"]) {
        state.discounted9k = Math.round(
          (action.payload.currentRate * 37.5) / 100 +
            Number(action.payload.discount["+9k"]),
        );
      } else {
        // Fallback for when no discount logic is provided, just base rate
        state.discounted9k = Math.round(
          (action.payload.currentRate * 37.5) / 100,
        );
      }
    },
    addGoldIncDec(state, action) {
      state.goldIncDec = action.payload;
    },
  },
});
export const { addGoldRate, addGoldIncDec } = GoldRateSlice.actions;
export default GoldRateSlice.reducer;
