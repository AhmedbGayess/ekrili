import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import AppRouter from "./router/AppRouter";
import configureStore from "./store/configureStore";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
