const initialState = {
  result: [],
  loading: false,
  error: null
};

const definitions = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DEFINITIONS_REQUESTED":
      return { ...state, loading: true};
    case "GET_DEFINITIONS_SUCCESS":
      return { ...state, loading: false, result: action.result };
    case "GET_DEFINITIONS_FAILED":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export default definitions;