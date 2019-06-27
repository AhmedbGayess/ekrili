const initialState = {
  user: null,
  users: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USERS_LOADING":
      return {
        ...state,
        loading: true
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case "SET_USERS":
      return {
        ...state,
        users: [...action.payload],
        loading: false
      };
    case "STOP_USERS_LOADING":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
