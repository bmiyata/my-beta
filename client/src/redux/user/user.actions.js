import axios from "axios";
import { UserActionTypes } from "./user.types";
import { setAlert } from "../alerts/alert.actions";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/users/me");
    dispatch({
      type: UserActionTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UserActionTypes.AUTH_ERROR,
    });
  }
};

export const register = (username, email, password, passwordConfirm) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      withCredentials: "true",
    },
  };

  const body = JSON.stringify({ username, email, password, passwordConfirm });

  try {
    const res = await axios.post("/api/v1/users/signup", body, config);

    dispatch({
      type: UserActionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: UserActionTypes.REGISTER_FAIL });
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

export const signout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/users/logout");

    dispatch({ type: UserActionTypes.LOGOUT });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

export const signin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/users/login", body, config);

    dispatch({ type: UserActionTypes.LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

export const changePhotoURL = (photoURL) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ photoURL });

  try {
    const res = await axios.patch("/api/v1/users/photo", body, config);

    dispatch(loadUser());
    dispatch(
      setAlert(
        "Image successfully updated! Please refresh page to see updated photo.",
        "success"
      )
    );
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

export const sendResetPasswordLink = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(email);

  try {
    await axios.post(`/api/v1/users/forgotPassword`, body, config);
    dispatch(setAlert("A reset token has been sent to your email!", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

export const resetPassword = (
  password,
  passwordConfirm,
  resetToken,
  history
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ password, passwordConfirm });
  try {
    await axios.patch(
      `/api/v1/users/resetPassword/${resetToken}`,
      body,
      config
    );
    dispatch(setAlert("Password successfully reset!", "success"));
    history.push("/signIn");
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};
