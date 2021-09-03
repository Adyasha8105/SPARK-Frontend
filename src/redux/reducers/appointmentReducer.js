import { ActionTypes } from "../constants/actionTypes.js";

const initialState = {
  createdAppointment: null,
  appointments: [],
  errMessage: null,
  errLogout: null,
  isLoading: false,
};

const appointmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CLEAN_STATE: {
      return {
        ...initialState,
        errLogout: null,
      };
    }
    case ActionTypes.CREATE_APPOINTMENT_START:
      return {
        ...state,
        errMessage: null,
      };
    case ActionTypes.CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        createdAppointment: payload.response,
        appointments: payload.success
          ? [...state.appointments, payload.response]
          : state.appointments,
      };
    case ActionTypes.CREATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        errMessage: payload,
      };
    case ActionTypes.GET_APPOINTMENT:
      return {
        ...state,
        appointments:
          payload.status === 200 ? payload.response : state.appointments,
      };

    case ActionTypes.GET_APPOINTMENT_FAILURE:
      return {
        ...state,
        errMessage: payload,
      };
    case ActionTypes.CANCEL_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          (ap) => ap.createdat !== payload + "Z"
        ),
      };
    case ActionTypes.CANCEL_APPOINTMENT_FAILURE:
      return {
        ...state,
        errMessage: payload,
      };

    case ActionTypes.UPDATE_AP_START:
      return {
        ...state,
        isLoading: true,
        errMessage: null,
      };
    // case ActionTypes.UPDATE_AP_SUCCESS:
    //   {
    //     const index=state.appointments.filter((item)=>item.createda)
    //     return {
    //     ...state,
    //     app
    //   }
    //   }

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

export default appointmentReducer;
