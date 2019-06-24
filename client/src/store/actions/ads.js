import axios from "axios";
import { history } from "../../router/AppRouter";

export const createAd = (adData) => async () => {
  try {
    await axios.post("/ads", adData);
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const getAd = (id) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const { data } = await axios.get(`/ads/single/${id}`);
    dispatch({
      type: "SET_AD",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAds = (query) => async (dispatch) => {
  dispatch(setAdsLoading());
  try {
    const { data } = await axios.get(`/ads${query}`);
    dispatch({
      type: "SET_ADS",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAdsByCategory = (id) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const { data } = await axios.get(`/ads/category/${id}`);
    dispatch({
      type: "SET_ADS",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAdsBySubcategory = (id) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const { data } = await axios.get(`/ads/subcategory/${id}`);
    dispatch({
      type: "SET_ADS",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const getOwnAds = (limit, skip) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const { data } = await axios.get(`/ads/my-ads?limit=${limit}&skip=${skip}`);
    dispatch({
      type: "SET_ADS",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserAds = (title) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const { data } = await axios.get(`ads/find/title?title=${title}`);
    dispatch({
      type: "SET_ADS",
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const editAd = (adData, id) => async () => {
  try {
    await axios.patch(`ads/${id}`, adData);
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const deleteAd = (id) => async () => {
  try {
    await axios.get.delete(`ads/${id}`);
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const adminDeleteAd = (id) => async () => {
  try {
    await axios.get.delete(`ads/admin/${id}`);
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

const setAdsLoading = () => ({
  type: "ADS_LOADING"
});
