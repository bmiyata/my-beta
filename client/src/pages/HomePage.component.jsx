import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import sprite from "./../sprite.svg";
import {
  changePhotoURL,
  deletePost,
  loadUser,
} from "./../redux/user/user.actions";
import defaultImage from "../img/climbing.png";
import { storage } from "../firebase";

const HomePage = ({ user, changePhotoURL, deletePost, loadUser }) => {
  const history = useHistory();
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const { username, photoURL, posts } = user.user.data.user;

  const [deleting, setDeleting] = useState(false);

  const handleImageClick = (e) => {
    document.querySelector("#user-image-upload").click();
  };

  const handleImageInput = (e) => {
    if (e.target.files[0]) {
      const fileName = `${username}`;
      const uploadTask = storage
        .ref(`user-profile-photos/${fileName}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log(error);
        },
        () => {
          const newImageName = `${fileName}_800x800`;
          storage
            .ref("user-profile-photos")
            .child(`${newImageName}`)
            .getDownloadURL()
            .then((url) => {
              changePhotoURL(url);
              setTimeout(function() {
                window.location.reload();
              }, 2000);
            });
        }
      );
    }
  };

  const redirectIfNotEditing = (postId) => {
    if (!deleting) {
      history.push(`/submissions/${postId}`);
    }
  };

  const postContent = posts.map((post) => (
    <div
      onClick={() => redirectIfNotEditing(post._id)}
      key={post._id}
      className="card card--post cursor-point"
    >
      <div className="overlay-container">
        {deleting && (
          <svg
            onClick={() => deletePost(post._id)}
            className="card__delete-icon"
          >
            <use href={sprite + "#delete"}></use>
          </svg>
        )}
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

  return (
    <Fragment>
      <section className="bg-white container--user">
        <h2 className="text-center logo-font profile__username">{username}</h2>
        <input
          accept="image/*"
          id="user-image-upload"
          name="user-image"
          type="file"
          className="d-none"
          onChange={handleImageInput}
        />

        <div onClick={handleImageClick} className="profile-picture">
          <img
            className="profile-picture__img"
            src={photoURL ? photoURL : defaultImage}
            alt="User"
          />
        </div>
      </section>

      <section className="profile-posts">
        <button
          onClick={() => setDeleting(!deleting)}
          className="btn btn--delete mb-sm"
        >
          {deleting ? "Cancel" : "Delete Posts"}
        </button>
        <div className="profile__cards">{postContent}</div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  changePhotoURL: (photoURL) => dispatch(changePhotoURL(photoURL)),
  deletePost: (postId) => dispatch(deletePost(postId)),
  loadUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
