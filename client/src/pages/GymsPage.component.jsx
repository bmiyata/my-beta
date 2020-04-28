import React, { useEffect, Fragment } from "react";
import sprite from "./../sprite.svg";
import CliffsImg from "../img/Cliffs-1.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadGyms } from "../redux/gyms/gyms.actions";
import Spinner from "../components/Spinner/Spinner.component";

const GymsPage = ({ gyms, loadGyms }) => {
  console.log(gyms.gyms.gyms);
  useEffect(() => {
    loadGyms();
  }, [loadGyms]);

  const { loading } = gyms;

  if (!loading) {
    var gymsContent = gyms.gyms.gyms.map((gym) => {
      return (
        <Link
          to={{ pathname: `/gyms/${gym._id}` }}
          key={gym._id}
          className="gyms__card gyms__gym"
        >
          <div className="d-none--tab-port">
            <img className=" card__img" src={CliffsImg} alt="" />
          </div>

          <div className="gym__info">
            <h1 className="gym-header-font">{gym.name}</h1>

            <div className="flex flex-justify-start">
              <svg className="icon-md icon--grey">
                <use href={sprite + "#maps-and-flags"}></use>
              </svg>

              <p className="gym-info-font font-grey-dark">{gym.address}</p>
            </div>
            <div className="flex flex-justify-start">
              <svg className="icon-md icon--grey">
                <use href={sprite + "#way"}></use>
              </svg>
              <p className="gym-info-font font-grey-dark">
                {gym.routes.length}
              </p>
            </div>
            <Link
              to={{ pathname: `/gyms/${gym._id}` }}
              className="btn btn--sharp btn--primary btn--gym-card"
            >
              Go To Routes &rarr;
            </Link>
          </div>
        </Link>
      );
    });
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section className="gyms__grid">{gymsContent}</section>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  gyms: state.gyms,
});

const mapDispatchToProps = (dispatch) => ({
  loadGyms: () => dispatch(loadGyms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GymsPage);
