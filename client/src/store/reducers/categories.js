const initialState = {
  categories: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORIES_LOADING":
      return {
        ...state,
        loading: true
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [action.payload, ...state.categories]
      };
    case "SET_CATEGORIES":
      return {
        categories: [...action.payload],
        loading: false
      };
    default:
      return state;
  }
};
