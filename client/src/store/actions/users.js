import axios from "axios";
import { history } from "../../router/AppRouter";

export const getUser = (id) => async (dispatch) => {
  dispatch(setUsersLoading());
  try {
    const { data } = await axios.get(`/users/${id}`);
    dispatch({
      type: "SET_USER",
      payload: data
    });
  } catch (e) {
    dispatch(stopUserLoading());
    console.log(e);
  }
};

export const getUsers = (skip) => async (dispatch) => {
  dispatch(setUsersLoading());
  try {
    const { data } = await axios.get(`/users/all?skip=${skip}`);
    dispatch({
      type: "SET_USERS",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = (id) => async () => {
  try {
    await axios.delete(`/users/${id}`);
    history.push("/admin/users/1");
  } catch (e) {
    console.log(e);
  }
};

export const searchUsers = (search) => async (dispatch) => {
  dispatch(setUsersLoading());
  try {
    const { data } = await axios.get(`/users/search/user?search=${search}`);
    dispatch({
      type: "SET_USERS",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

const setUsersLoading = () => ({
  type: "USERS_LOADING"
});

const stopUserLoading = () => ({
  type: "STOP_USERS_LOADING"
});
