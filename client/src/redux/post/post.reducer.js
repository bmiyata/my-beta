import { PostActionTypes } from "./post.types";

const INITIAL_STATE = {
  loading: true,
  post: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostActionTypes.POST_LOADED: {
      return { ...state, post: action.payload, loading: false };
    }
    default:
      return state;
  }
};

export default postReducer;
