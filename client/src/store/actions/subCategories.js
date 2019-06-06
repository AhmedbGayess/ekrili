import axios from "axios";
import { history } from "../../router/AppRouter";

export const addSubCategory = (subCategoryData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/sub-categories", subCategoryData);
    dispatch({
      type: "ADD_SUBCATEGORY",
      payload: data
    });
    history.push("/admin/subcategories");
  } catch (e) {
    console.log(e);
  }
};

export const getSubCategories = () => async (dispatch) => {
  dispatch(setSubCategoriesLoading);
  try {
    const { data } = await axios.get("/sub-categories");
    dispatch({
      type: "SET_SUBCATEGORIES",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const getSubCategory = (id) => async (dispatch) => {
  dispatch(setSubCategoriesLoading);
  try {
    const { data } = await axios.get(`/sub-categories/single/${id}`);
    console.log(data);
    dispatch({
      type: "SET_SUBCATEGORY",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const editSubCategory = (subCategoryData, id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `/sub-categories/${id}`,
      subCategoryData
    );
    console.log(data);
    dispatch({
      type: "EDIT_SUBCATEGORY",
      payload: data
    });
    history.push("/admin/subcategories");
  } catch (e) {
    console.log(e);
  }
};

export const clearSubCategory = () => ({
  type: "CLEAR_SUBCATEGORY"
});

const setSubCategoriesLoading = () => ({
  type: "SUBCATEGORIES_LOADING"
});
