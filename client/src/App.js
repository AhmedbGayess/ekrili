import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import AppRouter from "./router/AppRouter";
import configureStore from "./store/configureStore";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logout } from "./store/actions/auth";

const store = configureStore();

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
