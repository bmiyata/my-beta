import axios from "axios";
import { GymsActionTypes } from "./gyms.types";

export const loadGyms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/gyms/getAll");

    dispatch({ type: GymsActionTypes.LOADED_GYMS, payload: res.data.data });
  } catch (err) {
    console.log(err);
  }
};
