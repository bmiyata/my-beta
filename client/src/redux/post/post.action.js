import axios from "axios";
import { PostActionTypes } from "./post.types";

export const loadPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${postId}`);
    dispatch({ type: PostActionTypes.POST_LOADED, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/v1/posts/like/${postId}`);
    dispatch({ type: PostActionTypes.POST_LOADED, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/v1/posts/unlike/${postId}`);
    dispatch({ type: PostActionTypes.POST_LOADED, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (postId, text) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ text });

  console.log(body);
  try {
    const res = await axios.patch(
      `/api/v1/posts/addComment/${postId}`,
      body,
      config
    );

    dispatch({ type: PostActionTypes.POST_LOADED, payload: res.data.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `/api/v1/posts/removeComment/${postId}/${commentId}`
    );
    dispatch({ type: PostActionTypes.POST_LOADED, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const addPostToUserAndRoute = (
  notes,
  videoURL,
  route,
  grade,
  gym,
  history
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ notes, videoURL, route, grade, gym });
  try {
    const post = await axios.post(`/api/v1/posts`, body, config);

    await axios.post(`/api/v1/routes/${route}/${post.data.data.newPost._id}`);
    history.push(`/submissions/${post.data.data.newPost._id}`);
  } catch (error) {
    console.log(error);
  }
};
