import axios from "axios";
import { history } from "../../router/AppRouter";

export const addCategory = (categoryData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/categories", categoryData);
    dispatch({
      type: "ADD_CATEGORY",
      payload: data
    });
    history.push("/admin/categories");
  } catch (e) {
    console.log(e);
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch(setCategoriesLoading());
  try {
    const { data } = await axios.get("/categories");
    dispatch({
      type: "SET_CATEGORIES",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCategory = (id) => async (dispatch) => {
  dispatch(setCategoriesLoading());
  try {
    const { data } = await axios.get(`/categories/${id}`);
    dispatch({
      type: "SET_CATEGORY",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const editCategory = (categoryData, id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/categories/${id}`, categoryData);
    dispatch({
      type: "EDIT_CATEGORY",
      payload: data
    });
    history.push("/admin/categories");
  } catch (e) {
    console.log(e);
  }
};

export const deleteCategory = (id) => async () => {
  try {
    await axios.delete(`/categories/${id}`);
    history.push("/admin/categories");
  } catch (e) {
    console.log(e);
  }
};

const setCategoriesLoading = () => ({
  type: "CATEGORIES_LOADING"
});
