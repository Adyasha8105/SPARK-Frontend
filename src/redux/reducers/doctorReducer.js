import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  doctors: [],
  isFailed: false,
  errLogout: null,
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_DOC: {
      console.log(action.payload);
      return {
        ...state,
        doctors: action.payload,
      };
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      return {
        ...initialState,
        errLogout: null,
      };
    }
    case ActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        errLogout: action.payload,
      };
    }
    default:
      return state;
  }
};

export default doctorReducer;
