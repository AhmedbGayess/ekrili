const initialState = {
  ad: {},
  ads: [],
  count: 0,
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
        ads: [...action.payload.ads],
        count: action.payload.count,
        loading: false
      };
    default:
      return state;
  }
};
