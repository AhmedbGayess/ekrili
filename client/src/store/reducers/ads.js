const initialState = {
  ad: {},
  ads: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADS_LOADING":
      return {
        ...state,
        loading: true
      };
    case "SET_AD":
      return {
        ...state,
        ad: { ...action.payload },
        loading: false
      };
    case "SET_ADS":
      return {
        ...state,
        ads: [...action.payload],
        loading: false
      };
    default:
      return state;
  }
};
