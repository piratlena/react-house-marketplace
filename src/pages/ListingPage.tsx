import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import { getListing } from "../store/selectors/listingSelector";
import shareIcon from "../assets/svg/shareIcon.svg";
import { fetchListing } from "../store/action-creators/listing";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function ListingPage() {
  const { listing, loading } = useSelector(getListing);
  console.log(listing);

  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    dispatch(fetchListing(params));
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  const defaultState = {
    center: [listing.latitude, listing.longitude],
    zoom: 13,
  };

  return (
    <main>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="shareIconDiv">
        <img
          src={shareIcon}
          alt="share"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}
        />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name} -{" "}
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && "Parking Spot"}</li>
          <li>{listing.furnished && "Furnished"}</li>
        </ul>
        <p className="listingLocationTitle">Location</p>

        {/* MAP */}

        <div className="leafletContainer">
          <YMaps>
            <Map
              defaultState={defaultState}
              style={{ height: "100%", width: "100%" }}
            >
              <Placemark geometry={defaultState.center} />
            </Map>
          </YMaps>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default ListingPage;
