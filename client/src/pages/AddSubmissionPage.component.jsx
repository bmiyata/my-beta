import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setAlert } from "../redux/alerts/alert.actions";

import { addPostToUserAndRoute } from "../redux/post/post.action";

import Spinner from "../components/Spinner/Spinner.component";
import sprite from "./../sprite.svg";

const AddSubmissionPage = ({
  match,
  addPostToUserAndRoute,
  setAlert,
  history,
}) => {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoFileToUpload, setVideoFileToUpload] = useState(null);
  const [notes, setNotes] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/routes/${match.params.routeId}`);
      setRoute(res.data.data.route);
      setLoading(false);
    };
    fetchData();
  }, [match.params.routeId]);

  const handleVideoInput = (e) => {
    e.preventDefault();
    setVideoFileToUpload(e.target.files[0]);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setNotes(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!videoFileToUpload) {
      setAlert("Video file required for submission.", "error");
      return;
    }
    // Upload video to firebase
    setUploadingVideo(true);
    const videoName = `${match.params.routeId}/${Date.now()}`;
    const uploadTask = storage
      .ref(`videos/${videoName}`)
      .put(videoFileToUpload);
    uploadTask.on(
      "state_changed",
      () => {
        setUploadingVideo(true);
      },
      (error) => {
        setAlert(error.message, "error");
      },
      () => {
        storage
          .ref("videos")
          .child(videoName)
          .getDownloadURL()
          .then((url) => {
            setAlert("Post created successfully", "success");

            // Get download URL and add post to user
            addPostToUserAndRoute(
              notes,
              url,
              match.params.routeId,
              route.grade,
              route.gym,
              history
            );
            setUploadingVideo(false);
          });
      }
    );
  };

  return (
    <Fragment>
      {loading || uploadingVideo ? (
        <Spinner text={uploadingVideo ? "Uploading video..." : ""} />
      ) : (
        <div className="add-submission-layout">
          <h1 className="add-submission-layout__title">ADD SUBMISSION</h1>
          <div className="add-submission-layout__card card flex flex-col">
            <div className="">
              <img src={route.imageURL} alt="" className="card__img" />
            </div>
            <div className="card__info">
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
                <p>{route.location}</p>
              </div>
              <div className="card__info--item">
                <svg className="logo--navbar">
                  <use href={sprite + "#paint-bucket"}></use>
                </svg>
                <p>{route.color}</p>
              </div>
            </div>
          </div>
          <div className="add-submission-layout__input-grid">
            <div className="flex flex-justify-start bg-white">
              <div>
                <input
                  onChange={handleVideoInput}
                  accept="video/*"
                  id="video"
                  name="video"
                  type="file"
                />
                <label
                  className="btn btn--sharp btn--primary input--label"
                  htmlFor="video"
                >
                  Add Video
                </label>
              </div>
              <p className="ml-sm">
                {videoFileToUpload
                  ? `${videoFileToUpload.name}`
                  : "Input Video File"}
              </p>
            </div>
            <textarea
              onChange={handleOnChange}
              className="p-text-area"
              placeholder="Add Notes (Optional)"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button
              onClick={handleOnSubmit}
              className="add-submission-layout__btn btn btn--secondary"
            >
              Submit Post
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addPostToUserAndRoute: (notes, videoURL, routeId, grade, gym, history) =>
    dispatch(
      addPostToUserAndRoute(notes, videoURL, routeId, grade, gym, history)
    ),
  setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
});

export default connect(null, mapDispatchToProps)(withRouter(AddSubmissionPage));
