const initialState = {
  categories: null,
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
        categories: [...state.categories, action.payload]
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: [...action.payload],
        loading: false
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category._id === action.payload._id) {
            return {
              ...category,
              ...action.payload
            };
          } else {
            return category;
          }
        })
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        )
      };
    default:
      return state;
  }
};
