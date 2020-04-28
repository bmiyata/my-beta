import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Spinner from "./Spinner/Spinner.component";
import sprite from "./../sprite.svg";
import { deleteComment } from "../redux/post/post.action";

const Comment = ({ comment, post, user, deleteComment }) => {
  const history = useHistory();
  const [commentUser, setCommentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get(`/api/v1/users/getById/${comment.user}`);
        setCommentUser(user.data.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comment.user]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="add-comment-grid p-sm1 bg-white">
          {user.user.data.user._id === comment.user && (
            <svg
              onClick={() => deleteComment(post.post.post._id, comment._id)}
              className="card__delete-comment-icon"
            >
              <use href={sprite + "#delete"}></use>
            </svg>
          )}
          <div className="text-center">
            <div className="">
              <img
                className="comment-icon"
                src={commentUser.photoURL}
                onClick={() => history.push(`/${commentUser.username}`)}
                alt="User"
              />
            </div>
            <p>{commentUser.username}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-notes flex-self-start">{comment.text}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (postId, commentId) =>
    dispatch(deleteComment(postId, commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
