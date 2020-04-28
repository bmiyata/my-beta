import axios from "axios";
import { GymActionTypes } from "./gym.types";

export const loadGym = (gymId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/gyms/${gymId}`);

    dispatch({ type: GymActionTypes.LOADED_GYM, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
