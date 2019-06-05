const initialState = {
  user: {},
  isAuthenticated: false,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: Object.keys(action.payload).length > 0 ? true : false
      };
    case "SET_LOGIN_ERROR":
      return {
        ...state,
        error: "Email ou mot de passe invalide"
      };
    default:
      return state;
  }
};
