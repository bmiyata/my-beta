import axios from "axios";
import { RouteActionTypes } from "./route.types";

export const loadRoute = (routeId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/routes/${routeId}`);
    dispatch({ type: RouteActionTypes.LOAD_ROUTE, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

// export const sortRoutes = (sortBy) => (dispatch) => {
//   dispatch({ type: RouteActionTypes.SORT_ROUTES, payload: sortBy });
// };
