import { GymActionTypes } from "./gym.types";

const INITIAL_STATE = {
  gym: null,
  loading: true,
};

const gymReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GymActionTypes.LOADED_GYM:
      return {
        ...state,
        gym: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default gymReducer;
