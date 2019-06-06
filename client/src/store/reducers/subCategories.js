const initialState = {
  subCategories: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SUBCATEGORIES_LOADING":
      return {
        ...state,
        loading: true
      };
    case "ADD_SUBCATEGORY":
      return {
        ...state,
        categories: [action.payload, ...state.subCategories]
      };
    case "SET_SUBCATEGORIES":
      return {
        categories: [...action.payload],
        loading: false
      };
    default:
      return state;
  }
};
