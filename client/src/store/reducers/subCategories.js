const initialState = {
  subCategories: null,
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
        subCategories: [...state.subCategories, action.payload]
      };
    case "SET_SUBCATEGORIES":
      return {
        ...state,
        subCategories: [...action.payload],
        loading: false
      };
    case "EDIT_SUBCATEGORY":
      return {
        ...state,
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
    case "DELETE_SUBCATEGORY":
      return {
        ...state,
        subCategories: state.subCategories.filter(
          (subCategory) => subCategory._id !== action.payload
        )
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        subCategories: state.subCategories.filter(
          (subCategory) => subCategory.category !== action.payload
        )
      };
    default:
      return state;
  }
};
