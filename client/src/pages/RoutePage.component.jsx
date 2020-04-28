import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Spinner from "../components/Spinner/Spinner.component";
import sprite from "./../sprite.svg";
import SubmissionCard from "../components/SubmissionCard.component";

import { loadRoute } from "../redux/route/route.actions";

const RoutePage = ({ match, loadRoute, route }) => {
  const history = useHistory();
  useEffect(() => {
    loadRoute(match.params.routeId);
  }, [match.params.routeId, loadRoute]);

  const [sortBy, setSortBy] = useState("Likes");
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading } = route;

  let submissionsContent;
  console.log(route);

  if (!loading) {
    if (sortBy === "Likes") {
      submissionsContent = route.route.route.posts
        .sort((a, b) => b.likes.length - a.likes.length)
        .map((post) => {
          return <SubmissionCard post={post} />;
        });
    } else if (sortBy === "Date") {
      console.log("inside date sort");
      submissionsContent = route.route.route.posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => {
          return <SubmissionCard post={post} />;
        });
    }
  }

  const goBack = (e) => {
    e.preventDefault();
    history.push(`/gyms/${match.params.gymId}`);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="route-page-layout">
            <div className="route-page-layout__back-btn">
              <svg
                onClick={(e) => goBack(e)}
                className="logo--navbar cursor-point"
              >
                <use href={sprite + "#left-arrow"}></use>
              </svg>
            </div>
            <div className="bg-white route-page-layout__card card flex flex-col">
              <div className="image-container">
                <img
                  src={route.route.route.imageURL}
                  alt=""
                  className="card__img"
                />
              </div>

              <div className="card__info card__info--gym">
                <div className="card__info--item">
                  <svg className="logo--navbar">
                    <use href={sprite + "#exam"}></use>
                  </svg>
                  <p>V5</p>
                </div>
                <div className="card__info--item">
                  <svg className="logo--navbar">
                    <use href={sprite + "#location"}></use>
                  </svg>
                  <p>{route.route.route.location}</p>
                </div>
                <div className="card__info--item">
                  <svg className="logo--navbar">
                    <use href={sprite + "#paint-bucket"}></use>
                  </svg>
                  <p>{route.route.route.color}</p>
                </div>
              </div>
              <div className="pb-sm">
                <Link
                  to={`/addSubmission/${route.route.route._id}`}
                  className="btn btn--sharp btn--secondary"
                >
                  Add Submission &rarr;
                </Link>
              </div>
            </div>

            {/* <!-- LIST OF CARDS AND DROPDOWN --> */}
            <div className="route-page-layout__submissions submissions-list-layout">
              <div className="submissions-list-layout--submissions">
                {/* <!-- DROPDOWN --> */}
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="dropdown--route flex flex-col flex-justify-start submissions-list-layout--dropdown"
                >
                  <h1 className="mb-sm">Submissions</h1>
                  <div className="dropdown__item btn btn--sort btn--white flex">
                    <p className="mr-sm">{sortBy}</p>
                    <svg className="icon-sm">
                      <use href={sprite + "#down-arrow"}></use>
                    </svg>
                  </div>
                  <Fragment>
                    {showDropdown ? (
                      <Fragment>
                        <div
                          onClick={() => setSortBy("Date")}
                          className="text-center dropdown__item"
                        >
                          Date
                        </div>
                        <div
                          onClick={() => setSortBy("Likes")}
                          className="text-center dropdown__item"
                        >
                          Likes
                        </div>
                      </Fragment>
                    ) : null}
                  </Fragment>
                </div>

                {/* <!-- CARDS --> */}
                {loading ? (
                  <Spinner />
                ) : (
                  <Fragment>{submissionsContent}</Fragment>
                )}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  route: state.route,
});

const mapDispatchToProps = (dispatch) => ({
  loadRoute: (routeId) => dispatch(loadRoute(routeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);
