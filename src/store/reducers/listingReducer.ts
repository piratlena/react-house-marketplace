import { createSlice } from "@reduxjs/toolkit";
import { IListing } from "../../types/ListingTypes";

interface IListings {
  listing: IListing[];
  loading: boolean;
  lastFetchedListing?: null;
}
const initialState: IListings = {
  listing: [],
  loading: true,
  lastFetchedListing: null,
};

const listingSlice = createSlice({
  name: "listings",
  initialState: initialState,
  reducers: {
    setListing(state, action) {
      state.listing = action.payload;
    },
    setLoading(state) {
      state.loading = false;
    },
    setLastFetchedListing(state, action) {
      state.lastFetchedListing = action.payload;
    },
  },
});

export const { setListing, setLoading, setLastFetchedListing } =
  listingSlice.actions;
export default listingSlice.reducer;
