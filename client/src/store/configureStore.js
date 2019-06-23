import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import categories from "./reducers/categories";
import subCategories from "./reducers/subCategories";
import ads from "./reducers/ads";
import favorites from "./reducers/favorites";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({ auth, categories, subCategories, ads, favorites }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
