import { GymsActionTypes } from "./gyms.types";

const INITIAL_STATE = {
  gyms: [],
  loading: true,
};

const gymsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GymsActionTypes.LOADED_GYMS:
      return {
        ...state,
        gyms: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default gymsReducer;
