import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import sprite from "./../sprite.svg";
import Spinner from "../components/Spinner/Spinner.component";

const UserPage = ({ match }) => {
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(`/api/v1/users/${match.params.username}`);
      setUser(user.data.data.user);
      setLoading(false);
    };
    fetchData();
  }, [match.params.username]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const redirectIfNotEditing = (postId) => {
    history.push(`/submissions/${postId}`);
  };

  if (!loading) {
    var { posts, username, photoURL } = user;
    var postContent = posts.map((post) => (
      <div
        onClick={() => redirectIfNotEditing(post._id)}
        key={post._id}
        className="card card--post cursor-point"
      >
        <div className="overlay-container">
          <video className="card__img" src={post.videoURL} alt="" />
        </div>

        <div className="card__info">
          <div className="card__info--item">
            <svg className="logo--navbar">
              <use href={sprite + "#exam"}></use>
            </svg>
            <p>{`V${post.grade}`}</p>
          </div>
          <div className="card__info--item">
            <svg className="logo--navbar">
              <use href={sprite + "#heart"}></use>
            </svg>
            <p>{post.likes.length}</p>
          </div>
          <div className="card__info--item">
            <svg className="logo--navbar">
              <use href={sprite + "#gym"}></use>
            </svg>
            <p>{post.gym}</p>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="bg-white container--user">
            <h2 className="text-center logo-font profile__username">
              {username}
            </h2>
            <input
              accept="image/*"
              id="user-image-upload"
              name="user-image"
              type="file"
              className="d-none"
            />

            <div className="profile-picture">
              <img className="profile-picture__img" src={photoURL} alt="User" />
            </div>
          </section>

          <section className="profile-posts">
            <div className="profile__cards">{postContent}</div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserPage;
