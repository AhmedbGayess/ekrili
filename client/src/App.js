import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";

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
    <Helmet>
      <title>
        Ekriha.com | Site Tunisien de location de tout et de n'importe quoi
      </title>
      <meta property="og:image" content={require("./images/ekriha.png")} />
      <meta
        name="description"
        content="Ekriha.com est un site Tunisien de location de tout et de n'importe quoi pour les particuliers et les professionnels"
      />
      <meta name="keywords" content="location annonces tunisie louer" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="French" />
      <meta name="theme-color" content="#4629d3" />
    </Helmet>
    <AppRouter />
  </Provider>
);

export default App;
