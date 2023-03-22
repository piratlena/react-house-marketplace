import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { getListing } from "../store/selectors/listingSelector";
import { useParams } from "react-router-dom";
import {
  fetchCategory,
  onFetchMoreListings,
} from "../store/action-creators/category";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function CategoryPage() {
  // const [listings, setListings] = useState(null);
  // const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const { listing, loading, lastFetchedListing } = useSelector(getListing);
  const dispatch = useAppDispatch();
  console.log(listing);
  const params = useParams();

  useEffect(() => {
    // const fetchListings = async () => {
    //   try {
    //     const listingsRef = collection(db, "listings");

    //     const q = query(
    //       listingsRef,
    //       where("type", "==", params.categoryName),
    //       orderBy("timestamp", "desc"),
    //       limit(2)
    //     );

    //     const querySnap = await getDocs(q);
    //     const lastVisible = querySnap.docs[querySnap.docs.length - 1];
    //     setLastFetchedListing(lastVisible);

    //     const listings = [];

    //     querySnap.forEach((doc) => {
    //       return listings.push({
    //         id: doc.id,
    //         data: doc.data(),
    //       });
    //     });
    //     setListings(listings);
    //     setLoading(false);
    //   } catch (error) {
    //     toast.error("Could not fetch listings", {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   }
    // };
    dispatch(fetchCategory(params));
  }, [params.categoryName]);

  //Pagination/Load More

  // const onFetchMoreListings = async () => {
  //   try {
  //     const listingsRef = collection(db, "listings");

  //     const q = query(
  //       listingsRef,
  //       where("type", "==", params.categoryName),
  //       orderBy("timestamp", "desc"),
  //       startAfter(lastFetchedListing),
  //       limit(2)
  //     );

  //     const querySnap = await getDocs(q);
  //     const lastVisible = querySnap.docs[querySnap.docs.length - 1];
  //     setLastFetchedListing(lastVisible);

  //     const listings = [];

  //     querySnap.forEach((doc) => {
  //       return listings.push({
  //         id: doc.id,
  //         data: doc.data(),
  //       });
  //     });
  //     setListings((prevState) => [...prevState, ...listings]);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error("Could not fetch listings", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }
  // };
  return (
    <div className="category">
      <header>
        <p className="pageTitle">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listing.map((list) => (
                <ListingItem list={list.data} id={list.id} key={list.id} />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p
              className="loadMore"
              onClick={onFetchMoreListings(params, lastFetchedListing)}
            >
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default CategoryPage;
