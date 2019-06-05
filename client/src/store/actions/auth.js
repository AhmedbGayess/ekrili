import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { history } from "../../router/AppRouter";

export const registerUser = (userData) => async () => {
  try {
    await axios.post("/users/register", userData);
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const login = (userData, adminRoute) => async (dispatch) => {
  try {
    const { data } = await axios.post("/users/login", userData);
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    dispatch(setCurrentUser(decoded));
    if (adminRoute) {
      history.push("/admin");
    } else {
      history.push("/");
    }
  } catch (e) {
    dispatch({
      type: "SET_LOGIN_ERROR"
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  } catch (e) {
    console.log(e);
  }
};

export const setCurrentUser = (decoded) => ({
  type: "SET_CURRENT_USER",
  payload: decoded
});
