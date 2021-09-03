import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const reducers = combineReducers({});

export default persistReducer(persistConfig, reducers);
