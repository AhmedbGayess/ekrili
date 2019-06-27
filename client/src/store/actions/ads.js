import axios from "axios";
import { history } from "../../router/AppRouter";

export const createAd = (adData) => async () => {
  try {
    const { data } = await axios.post("/ads", adData);
    history.push(`/ad/${data._id}`);
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
    return true;
  } catch (e) {
    console.log(e);
    return false;
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

export const getUserAds = (id, limit, skip) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const { data } = await axios.get(
      `/ads/user/${id}?limit=${limit}&skip=${skip}&sortBy=updatedAt:desc`
    );
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
    await axios.patch(`/ads/${id}`, adData);
    history.push(`/ad/${id}`);
  } catch (e) {
    console.log(e);
  }
};

export const deleteAd = (id) => async () => {
  try {
    await axios.delete(`/ads/${id}`);
    history.push("/my-ads/1");
  } catch (e) {
    console.log(e);
  }
};

export const adminDeleteAd = (id) => async () => {
  try {
    await axios.delete(`/ads/admin/${id}`);
    history.push("/admin/ads/1");
  } catch (e) {
    console.log(e);
  }
};

const setAdsLoading = () => ({
  type: "ADS_LOADING"
});
