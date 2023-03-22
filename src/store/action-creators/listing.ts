import { AppDispatch } from "../index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { setListing, setLoading } from "../reducers/listingReducer";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";

export const fetchListing = (params) => {
  return async (dispatch: AppDispatch) => {
    try {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        dispatch(setListing(docSnap.data()));
        dispatch(setLoading(false));
      }
    } catch (e) {
      console.log(e);
    }
  };
};
