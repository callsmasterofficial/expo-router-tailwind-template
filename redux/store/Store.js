import { configureStore } from "@reduxjs/toolkit";
import CategoriesSlice from "../slices/CategoriesSlice";
import GoldRateSlice from "../slices/GoldRateSlice";
import GoldDiscountSlice from "../slices/GoldDiscountSlice";
import GoldRateTimeSlice from "../slices/GoldRateTimeSlice";
import ProductsPerCategorySlice from "../slices/ProductsPerCategorySlice";
import WishlistSlice from "../slices/WishlistSlice";
import SilverRateSlice from "../slices/SilverRateSlice";
import SilverDiscountSlice from "../slices/SilverDiscountSlice";
import SliderImagesSlice from "../slices/SliderImagesSlice";
import TagWiseProductsSlice from "../slices/TagWiseProductsSlice";
import HamburgerToXSlice from "../slices/HamburgerToXSlice";
export const store = configureStore({
  reducer: {
    categories: CategoriesSlice,
    goldRate: GoldRateSlice,
    goldDiscountRate: GoldDiscountSlice,
    silverRate: SilverRateSlice,
    silverDiscountRate: SilverDiscountSlice,
    goldRateTime: GoldRateTimeSlice,
    wishlistProducts: WishlistSlice,
    productsPerCategories: ProductsPerCategorySlice,
    sliderImages: SliderImagesSlice,
    tagWiseProducts: TagWiseProductsSlice,
    hamburgerToX: HamburgerToXSlice,
  },
});
