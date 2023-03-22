import { AppDispatch } from "../index";
import { useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import {
  setListing,
  setLoading,
  setLastFetchedListing,
} from "../reducers/listingReducer";
import { toast } from "react-toastify";

export const fetchCategory = (params) => {
  return async (dispatch: AppDispatch) => {
    try {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        limit(2)
      );

      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      dispatch(setLastFetchedListing(lastVisible));

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      dispatch(setListing(listings));
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Could not fetch listings", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
};

export const onFetchMoreListings = (params, lastFetchedListing) => {
  return async (dispatch: AppDispatch) => {
    try {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(2)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      dispatch(setLastFetchedListing(lastVisible));

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      dispatch(setListing(listings));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      toast.error("Could not fetch listings", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
};
