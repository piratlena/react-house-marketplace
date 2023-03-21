import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listing: [],
  loading: true,
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
  },
});

export const { setListing, setLoading } = listingSlice.actions;
export default listingSlice.reducer;
