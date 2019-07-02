const initialState = {
  categories: null,
  category: {},
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
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        category: action.payload,
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
    default:
      return state;
  }
};
