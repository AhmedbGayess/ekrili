import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { history } from "../../router/AppRouter";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/users/register", userData);
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    dispatch(setCurrentUser(decoded));
    return true;
  } catch (e) {
    if (e.response.data.code === 11000) {
      dispatch({
        type: "DUPLICATE_ERROR"
      });
    } else {
      dispatch({
        type: "SET_SIGNUP_ERROR"
      });
    }
    return false;
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/users/login", userData);
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    dispatch(setCurrentUser(decoded));
    if (decoded.admin) {
      history.push("/admin");
    }
    return true;
  } catch (e) {
    dispatch({
      type: "SET_LOGIN_ERROR"
    });
    return false;
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

export const updateUserInfo = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.patch("/users/edit", userData);
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    dispatch(setCurrentUser(decoded));
    return true;
  } catch (e) {
    if (e.response.data.code === 11000) {
      dispatch({
        type: "DUPLICATE_ERROR"
      });
    }
    console.log(e);
  }
};

export const setUserImage = (image) => async (dispatch) => {
  try {
    const logged = localStorage.keep_logged;
    const stayLogged = logged === "true";
    const { data } = await axios.post(`/users/image/${image}`, { stayLogged });
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    dispatch(setCurrentUser(decoded));
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUserImage = () => async (dispatch) => {
  try {
    const logged = localStorage.keep_logged;
    const { data } = await axios.delete(
      `/users/delete/image?stayLogged=${logged}`
    );
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    dispatch(setCurrentUser(decoded));
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const setCurrentUser = (decoded) => ({
  type: "SET_CURRENT_USER",
  payload: decoded
});
