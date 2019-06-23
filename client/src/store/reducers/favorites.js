const initialState = {
  inFavorites: false,
  favorites: [],
  loading: false,
  more: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_FAVORITES_LOADING":
      return {
        ...state,
        loading: true
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, ...action.payload.favorites],
        more: action.payload.more,
        loading: false
      };
    case "IN_FAVORITES":
      return {
        ...state,
        inFavorites: action.payload
      };
    case "CLEAR_FAVORITES":
      return {
        ...state,
        favorites: []
      };
    default:
      return state;
  }
};
