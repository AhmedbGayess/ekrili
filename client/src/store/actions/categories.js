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

const setCategoriesLoading = () => ({
  type: "CATEGORIES_LOADING"
});
