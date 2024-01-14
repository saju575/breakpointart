// Initial state
const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  data: [],
};

// Action types
const actionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_IS_ERROR: "SET_IS_ERROR",
  SET_ERROR: "SET_ERROR",
  SET_DATA: "SET_DATA",
  ADD_DATA: "ADD_DATA", // New action type for adding data
};

// Reducer function

const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_IS_ERROR:
      return { ...state, isError: action.payload };
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
        error: "",
      };
    case actionTypes.ADD_DATA:
      return { ...state, data: [...state.data, action.payload] }; // Add new data
    default:
      return state;
  }
};
