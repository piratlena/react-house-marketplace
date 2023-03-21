import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { fetchListing } from "./action-creators/listing";

export const store = configureStore({
  reducer: rootReducer,
  applyMiddleware: [fetchListing, thunk],
});
