import { configureStore } from "@reduxjs/toolkit";
import listingSlice from "./listingReducer";

export const rootReducer = configureStore({
  reducer: {
    listings: listingSlice,
  },
});
