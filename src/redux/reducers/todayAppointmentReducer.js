import { ActionTypes } from "../constants/actionTypes.js";

const initialState = {
  appointments: [],
  errMessage: null,
  errLogout: null,
  isLoading: false,
};

const todayAppointmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CLEAN_STATE: {
      return {
        ...initialState,
        errLogout:null,
      };
    }
    case ActionTypes.GET_TODAY_APPOINTMENT_SUCCESS: {
      const todayDate = new Date().toJSON().slice(0, 10);
      const newArray = payload.response.filter(
        (item) => item.apdate === todayDate
      );
      return {
        ...state,
        appointments: payload.status === 200 ? newArray : state.appointments,
      };
    }
    case ActionTypes.GET_TODAY_APPOINTMENT_FAILURE:
      return {
        ...state,
        errMessage: ActionTypes.payload,
      };

    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState,
        errLogout: null,
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        errLogout: ActionTypes.payload,
      };

    default:
      return state;
  }
};

export default todayAppointmentReducer;
