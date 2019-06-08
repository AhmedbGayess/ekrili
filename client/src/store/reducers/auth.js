const initialState = {
  user: {},
  isAuthenticated: false,
  loginError: "",
  signupError: ""
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
        loginError: "Email ou mot de passe invalide"
      };
    case "SET_SIGNUP_ERROR":
      return {
        ...state,
        signupError:
          "Désolés, un problème est survenu. Veuillez rééssayer un peu plus tard."
      };
    default:
      return state;
  }
};
