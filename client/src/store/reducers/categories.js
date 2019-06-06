const initialState = {
  categories: [],
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
        categories: [action.payload, ...state.categories]
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
    case "CLEAR_CATEGORY":
      return {
        ...state,
        category: {}
      };
    default:
      return state;
  }
};
