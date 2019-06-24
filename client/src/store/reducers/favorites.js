const initialState = {
  inFavorites: false,
  favorites: [],
  loading: false,
  count: 0
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
        favorites: [...action.payload.favorites],
        count: action.payload.count,
        loading: false
      };
    case "IN_FAVORITES":
      return {
        ...state,
        inFavorites: action.payload
      };
    default:
      return state;
  }
};
