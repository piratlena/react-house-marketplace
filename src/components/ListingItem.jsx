import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ list, id, onDelete, onEdit }) {
  return (
    <li className="categoryListing">
      <Link to={`/category/${list.type}/${id}`} className="categoryListingLink">
        <img
          src={list.imgUrls[0]}
          alt={list.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{list.location}</p>
          <p className="categoryListingName">{list.name}</p>
          <p className="categoryListingPrice">
            $
            {list.offer
              ? list.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : list.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {list.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {list.bedrooms > 1 ? `${list.bedrooms} Bedrooms` : "1 Bedroom"}
            </p>
            <img src={bathIcon} alt="bath" />
            <p className="categoryListingInfoText">
              {list.bathrooms > 1
                ? `${list.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="#AD1DEB"
          onClick={() => onDelete(list.id, list.name)}
        />
      )}
      {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
    </li>
  );
}

export default ListingItem;
