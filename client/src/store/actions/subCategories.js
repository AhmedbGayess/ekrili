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
  dispatch(setSubCategoriesLoading());
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

export const getCategorySubCategories = (id) => async (dispatch) => {
  dispatch(setSubCategoriesLoading());
  try {
    const { data } = await axios.get(`/sub-categories//${id}`);
    dispatch({
      type: "SET_SUBCATEGORIES",
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
    dispatch({
      type: "EDIT_SUBCATEGORY",
      payload: data
    });
    history.push("/admin/subcategories");
  } catch (e) {
    console.log(e);
  }
};

export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    await axios.delete(`/sub-categories/${id}`);
    dispatch({
      type: "DELETE_SUBCATEGORY",
      payload: id
    });
    history.push("/admin/subcategories");
  } catch (e) {
    console.log(e);
  }
};

const setSubCategoriesLoading = () => ({
  type: "SUBCATEGORIES_LOADING"
});
