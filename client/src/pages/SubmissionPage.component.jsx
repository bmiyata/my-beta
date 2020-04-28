import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadPost, addComment } from "../redux/post/post.action";

import Spinner from "../components/Spinner/Spinner.component";
import Comment from "../components/Comment.component";
import PostCard from "../components/PostCard.component";
import sprite from "./../sprite.svg";

const SubmissionPage = ({ match, post, userToken, loadPost, addComment }) => {
  const history = useHistory();
  useEffect(() => {
    loadPost(match.params.submissionId);
  }, [loadPost, match.params.submissionId]);

  const [commentText, setCommentText] = useState("");
  const handleTextOnChange = (e) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  const { loading } = post;

  if (!loading) {
    const { notes, likes, user, _id, comments } = post.post.post;
    let isLiked = false;
    for (let like of likes) {
      if (like["user"] === userToken.user.data.user._id) {
        isLiked = true;
        break;
      }
    }

    var postContent = (
      <section className="submission-page-layout">
        <div className="text-center d-none--tab-port">
          <svg
            onClick={() => history.goBack()}
            className="logo--navbar cursor-point"
          >
            <use href={sprite + "#left-arrow"}></use>
          </svg>
        </div>
        {/* <!-- CARD --> */}
        <PostCard post={post} isLiked={isLiked} />
        {/* <!-- NOTES --> */}
        <div className="submission-page-layout--notes">
          <h1>Notes</h1>
          <div className="p-sm1 bg-white font-notes">{notes}</div>
        </div>

        <div className="submission-page-layout--comments">
          <h1>Comments</h1>
          <div className="add-comment-grid p-sm1 bg-white">
            <div className="text-center">
              <div className="">
                <img
                  className="comment-icon"
                  src={userToken.user.data.user.photoURL}
                  alt="User"
                />
              </div>
              <p>{userToken.user.data.user.username}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-notes">
                <textarea
                  onChange={(e) => handleTextOnChange(e)}
                  className="textarea-notes"
                  placeholder="Add comment..."
                  value={commentText}
                  name=""
                  id=""
                  cols="75"
                  rows="5"
                ></textarea>
              </p>
              <button
                onClick={() => addComment(_id, commentText)}
                className="btn btn--primary btn--sharp mt-sm"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="submission-page-layout--comment-list">
            {comments.map((comment) => (
              <Comment post={post} comment={comment} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <Fragment>
      {loading ? <Spinner /> : <Fragment>{postContent}</Fragment>}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  userToken: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loadPost: (postId) => dispatch(loadPost(postId)),
  addComment: (postId, commentText) =>
    dispatch(addComment(postId, commentText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
