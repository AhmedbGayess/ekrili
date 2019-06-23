import axios from "axios";

export const getFavorites = (skip) => async (dispatch) => {
  try {
    dispatch(setFavoritesLoading());
    const { data } = await axios.get(`/ads/favorites?skip=${skip}`);
    dispatch({
      type: "SET_FAVORITES",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const addToFavorites = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/ads/favorite/${id}`);
    dispatch({
      type: "IN_FAVORITES",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const checkIfFavorite = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/ads/favorite/${id}`);
    dispatch({
      type: "IN_FAVORITES",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

const setFavoritesLoading = () => ({
  type: "SET_FAVORITES_LOADING"
});
