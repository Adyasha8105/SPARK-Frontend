/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

const middlewares = [thunk, logger];

export const store = createStore(reducers, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
