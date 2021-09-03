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
        console.log("Created appointment");
        console.log(result);
        dispatch({
          type: ActionTypes.CREATE_APPOINTMENT_SUCCESS,
          payload: result,
        });
      })
      .catch((error) => {
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

export const updateAppoitmentAction = (data) => {
  return (dispatch) => {
    updateAppointment(data)
      .then((response) => {
        dispatch({
          type: ActionTypes.UPDATE_AP_START,
        });
        dispatch({
          type: ActionTypes.UPDATE_AP_SUCCESS,
          payload: response,
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
  // const tempData = {
  //   pphoneno: "1234567890",
  //   dphoneno: "1234098769",
  //   aptdate: "2021-09-17",
  //   createdat: "2021-08-29T20:45:27.665",
  // };
  return (dispatch) => {
    cancelAppointment(JSON.stringify(data))
      .then((result) => {
        console.log("Cancelling appointment");
        console.log(result);
        dispatch({
          type: ActionTypes.CANCEL_APPOINTMENT,
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
          payload: result,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.GET_TODAY_APPOINTMENT_FAILURE,
          payload: error,
        });
      });
  };
};
