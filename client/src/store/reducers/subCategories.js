const initialState = {
  subCategories: [],
  subCategory: {},
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
        subCategories: [action.payload, ...state.subCategories]
      };
    case "SET_SUBCATEGORIES":
      return {
        ...state,
        subCategories: [...action.payload],
        loading: false
      };
    case "SET_SUBCATEGORY":
      return {
        ...state,
        subCategory: action.payload,
        loading: false
      };
    case "EDIT_SUBCATEGORY":
      return {
        ...state,
        subCategory: action.payload,
        subCategories: state.subCategories.map((subCategory) => {
          if (subCategory._id === action.payload._id) {
            return {
              ...action.payload
            };
          } else {
            return subCategory;
          }
        })
      };
    default:
      return state;
  }
};
