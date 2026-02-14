import { createSlice } from "@reduxjs/toolkit";
import shortlistFunction from "../../utilities/shortlistFunction";

const WishlistSlice = createSlice({
  name: "product",
  initialState: {
    wishProducts: [],
  },
  reducers: {
    alreadyWishlisted(state, action) {
      state.wishProducts = action.payload;
    },
    addMyProducts(state, action) {
      let myIndex = -1;
      state.wishProducts.map((item, index) => {
        if (item._id === action.payload._id) {
          myIndex = index;
        }
      });
      if (myIndex == -1) {
        state.wishProducts.push(action.payload);
        shortlistFunction(state.wishProducts);
      } else {
        console.log("Already exits in the shortlist");
      }
    },
    removeMyProducts(state, action) {
      const indexOfProductToBeRemoved = state.wishProducts.findIndex(
        (item) => item._id === action.payload._id
      );
      state.wishProducts.splice(indexOfProductToBeRemoved, 1);
      shortlistFunction(state.wishProducts);
    },
  },
});
export const { addMyProducts, alreadyWishlisted, removeMyProducts } =
  WishlistSlice.actions;
export default WishlistSlice.reducer;
