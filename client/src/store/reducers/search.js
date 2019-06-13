const initialState = {
  searchName: "",
  governorate: "",
  delegation: "",
  category: "",
  subcategory: "",
  date: "",
  price: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_NAME":
      return {
        ...state,
        searchName: action.payload
      };
    case "SET_SEARCH_GOVERNORATE":
      return {
        ...state,
        governorate: action.payload
      };
    case "SET_SEARCH_DELEGATION":
      return {
        ...state,
        delegation: action.payload
      };
    case "SET_SEARCH_CATEGORY":
      return {
        ...state,
        category: action.payload
      };
    case "SET_SEARCH_SUBCATEGORY":
      return {
        ...state,
        subcategory: action.payload
      };

    case "SORT_BY_DATE":
      return {
        ...state,
        date: action.payload
      };
    case "SORT_BY_PRICE":
      return {
        ...state,
        price: action.payload
      };
    default:
      return state;
  }
};
