import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { loadGym } from "./../redux/gym/gym.actions";
import sprite from "./../sprite.svg";
import Spinner from "../components/Spinner/Spinner.component";
import RouteCard from "../components/RouteCard.component";
import RouteContentAndHeader from "../components/RouteContentAndHeader.component";

const GymPage = ({ match, gym, loadGym }) => {
  useEffect(() => {
    loadGym(match.params.gymId);
  }, [loadGym, match.params.gymId]);

  let content;
  const gymLocations = [
    "The Cove",
    "The Barrel",
    "Nonagon",
    "The Butterfly",
    "The Prisms and The Butterfly",
    "Right Flipper",
    "The Slabolith",
    "Turtle's Head",
    "Left Flipper",
    "NW corner",
  ];
  const [showDropdown, setShowDropDown] = useState(false);
  const [sortBy, setSortBy] = useState("Grade");

  const { loading } = gym;
  if (!loading) {
    var gymName = gym.gym.data.gym.name;
    var routes = gym.gym.data.gym.routes;

    // SORTED BY GRADE CONTENT
    if (sortBy === "Grade") {
      const gradeContent = [];
      for (let i = 0; i <= 10; i++) {
        gradeContent.push(
          routes
            .filter((route) => route.grade === i)
            .map((route) => {
              return <RouteCard gymId={match.params.gymId} route={route} />;
            })
        );
      }

      content = gradeContent.map((grade, index) => (
        <RouteContentAndHeader title={`V${index}`} content={grade} />
      ));
    }

    if (sortBy === "Location") {
      // SORTED BY LOCATION CONTENT
      const locationContent = [];
      for (let i = 0; i < gymLocations.length; i++) {
        locationContent.push(
          routes
            .filter((route) => route.location === gymLocations[i])
            .map((route) => {
              return <RouteCard gymId={match.params.gymId} route={route} />;
            })
        );
      }

      content = gymLocations.map((location, index) => {
        return (
          <RouteContentAndHeader
            title={location}
            content={locationContent[index]}
          />
        );
      });
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <header className="gym__header">
            <div className="bg-overlay gym-header-font">{gymName} routes</div>
          </header>

          <section className="gym-routes">
            <div
              onClick={() => setShowDropDown(!showDropdown)}
              className="dropdown flex flex-col flex-justify-start"
            >
              <div className="dropdown__item btn btn--sort btn--white flex">
                <p className="mr-sm">{sortBy}</p>
                <svg className="icon-sm">
                  <use href={sprite + "#down-arrow"}></use>
                </svg>
              </div>

              {showDropdown && (
                <Fragment>
                  <div
                    onClick={() => setSortBy("Grade")}
                    className="dropdown__item"
                  >
                    Grade
                  </div>
                  <div
                    onClick={() => setSortBy("Location")}
                    className="dropdown__item"
                  >
                    Location
                  </div>
                </Fragment>
              )}
            </div>
            {content}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadGym: (gymId) => dispatch(loadGym(gymId)),
});

const mapStateToProps = (state) => ({
  gym: state.gym,
});

export default connect(mapStateToProps, mapDispatchToProps)(GymPage);
