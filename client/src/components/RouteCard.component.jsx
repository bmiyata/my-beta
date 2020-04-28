import React from "react";
import sprite from "../sprite.svg";
import { Link } from "react-router-dom";

const RouteCard = ({ route, gymId }) => {
  return (
    <Link to={`/routes/${gymId}/${route._id}`} className="card card--route">
      <div className="overlay-container--gym">
        <img className="card__img" src={route.imageURL} alt="" />
      </div>

      <div className="card__info card__info--gym">
        <div className="card__info--item">
          <svg className="logo--navbar">
            <use href={sprite + "#exam"}></use>
          </svg>
          <p>{`V${route.grade}`}</p>
        </div>
        <div className="card__info--item">
          <svg className="logo--navbar">
            <use href={sprite + "#location"}></use>
          </svg>
          <p>
            {route.location.length <= 15
              ? route.location
              : route.location.slice(0, 15) + "..."}
          </p>
        </div>
        <div className="card__info--item">
          <svg className="logo--navbar">
            <use href={sprite + "#paint-bucket"}></use>
          </svg>
          <p>{route.color}</p>
        </div>
        <div className="btn-group btn-group--vert route-btns">
          <Link
            to={`/routes/${gymId}/${route._id}`}
            className="btn--sharp btn btn--primary"
          >
            View Submissions &rarr;
          </Link>
          <Link
            to={`/addSubmission/${route._id}`}
            className="btn--sharp btn btn--secondary"
          >
            Add Submission &rarr;
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default RouteCard;
