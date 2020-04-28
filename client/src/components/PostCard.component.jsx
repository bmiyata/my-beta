import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import { useHistory } from "react-router-dom";

import sprite from "./../sprite.svg";
import Spinner from "./Spinner/Spinner.component";
import { likePost, unlikePost } from "../redux/post/post.action";

const PostCard = ({ post, isLiked, likePost, unlikePost }) => {
  const history = useHistory();
  const { videoURL, likes, createdAt, user, _id } = post.post.post;

  const [postUser, setPostUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/v1/users/getById/${user}`);
        setPostUser(res.data.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="submission-page-layout--card">
            <div className="video-container-submission">
              <video
                autoPlay
                controls
                className="card__img"
                src={videoURL}
                alt=""
              />
            </div>
            <div className="submission-card-info-grid">
              <div className="icon-grid">
                <div className="flex">
                  <svg
                    onClick={
                      isLiked ? () => unlikePost(_id) : () => likePost(_id)
                    }
                    className={`noSelect mr-sm logo--navbar active-red icon--grey-light cursor-point ${
                      isLiked ? "red" : ""
                    }`}
                  >
                    <use href={sprite + "#heart-1"}></use>
                  </svg>
                  <p>{likes.length}</p>
                </div>
              </div>
              <div className="submitted-by__grid">
                <div className="">
                  <img
                    className="submitted-by--icon"
                    onClick={() => history.push(`/${postUser.username}`)}
                    src={postUser.photoURL}
                    alt="User"
                  />
                </div>
                <p>{postUser.username}</p>
              </div>
              <div className="icon-grid">
                {/* <svg className="logo--navbar">
      <use href={sprite + "#calendar"}></use>
    </svg> */}
                <p className="text-center">
                  <Moment format="MM/DD/YYYY">{createdAt}</Moment>
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  likePost: (postId) => dispatch(likePost(postId)),
  unlikePost: (postId) => dispatch(unlikePost(postId)),
});

export default connect(null, mapDispatchToProps)(PostCard);
