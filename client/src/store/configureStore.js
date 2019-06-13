import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import categories from "./reducers/categories";
import subCategories from "./reducers/subCategories";
import search from "./reducers/search";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({ auth, categories, subCategories, search }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
