import { toast } from "react-toastify";
import {
  createAppointment,
  getAppointment,
  cancelAppointment,
  updateAppointment,
  getTodayAppointment,
} from "../../services/api";
import { ActionTypes } from "../constants/actionTypes";

export const createAppointmentAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CREATE_APPOINTMENT_START,
    });
    createAppointment(JSON.stringify(data))
      .then((result) => {
        dispatch({
          type: ActionTypes.CREATE_APPOINTMENT_SUCCESS,
          payload: result,
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: ActionTypes.CREATE_APPOINTMENT_FAILURE,
          payload: error,
        });
      });
  };
};

export const getAppointmentAction = (data) => {
  return (dispatch) => {
    getAppointment(data)
      .then((result) => {
        dispatch({
          type: ActionTypes.GET_APPOINTMENT,
          payload: result,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.GET_APPOINTMENT_FAILURE,
          payload: error,
        });
      });
  };
};

export const updateAppointmentAction = (data) => {
  return (dispatch) => {
    updateAppointment(JSON.stringify(data))
      .then((response) => {
        dispatch({
          type: ActionTypes.UPDATE_AP_START,
        });
        dispatch({
          type: ActionTypes.UPDATE_AP_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: ActionTypes.UPDATE_AP_FAILURE,
          payload: err,
        })
      );
  };
};
export const cancelAppointmentAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CANCEL_APPOINTMENT_START,
    });
    cancelAppointment(JSON.stringify(data))
      .then((result) => {
        dispatch({
          type: ActionTypes.CANCEL_APPOINTMENT_SUCCESS,
          payload: data.createdat,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.CANCEL_APPOINTMENT_FAILURE,
          payload: error,
        });
      });
  };
};

//  GETTING TODAY APPOINTMENT

export const getTodayAppointmentAction = (data) => {
  return (dispatch) => {
    getTodayAppointment(data)
      .then((result) => {
        dispatch({
          type: ActionTypes.GET_TODAY_APPOINTMENT_SUCCESS,
          payload: result.response,
        });
      })
      .catch((error) => {
        if (!error.err)
          dispatch({
            type: ActionTypes.GET_TODAY_APPOINTMENT_SUCCESS,
            payload: [],
          });
        else
          dispatch({
            type: ActionTypes.GET_TODAY_APPOINTMENT_FAILURE,
            payload: error.err,
          });
      });
  };
};
