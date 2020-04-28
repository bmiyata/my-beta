import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import gymsReducer from "./gyms/gyms.reducer";
import gymReducer from "./gym/gym.reducer";
import routeReducer from "./route/route.reducer";
import postReducer from "./post/post.reducer";
import alertReducer from "./alerts/alert.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  gyms: gymsReducer,
  gym: gymReducer,
  route: routeReducer,
  post: postReducer,
  alerts: alertReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

export default persistReducer(persistConfig, rootReducer);
