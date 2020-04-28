import { RouteActionTypes } from "./route.types";

const INITIAL_STATE = {
  route: null,
  loading: true,
};

const routeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RouteActionTypes.LOAD_ROUTE:
      return {
        ...state,
        route: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default routeReducer;
