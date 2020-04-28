import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  user: null,
  isAuthenticated: null,
  loading: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOADED:
    case UserActionTypes.UPLOAD_PHOTO:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case UserActionTypes.REGISTER_SUCCESS:
    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case UserActionTypes.AUTH_ERROR:
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };

    default:
      return state;
  }
};

export default userReducer;
