import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import listingSlice from "./listingReducer";

// export const rootReducer = configureStore({
//   reducer: {
//     listings: listingSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export type RootState = ReturnType<typeof rootReducer.getState>;
// export type AppDispatch = typeof rootReducer.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

export const reducers = {
  listings: listingSlice,
};
