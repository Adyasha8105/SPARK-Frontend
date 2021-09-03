import { ActionTypes } from "../constants/actionTypes";

import { getDoctor, getPatient } from "../../services/api/index";

const getUserStart = () => ({
  type: ActionTypes.GET_USER_START,
});
const getUserSuccess = (payload) => ({
  type: ActionTypes.GET_USER_SUCCESS,
  payload: payload,
});
const getUserFailure = (message) => ({
  type: ActionTypes.GET_USER_FAILURE,
  payload: message,
});
export const getPatientProfile = (obj) => {
  return (dispatch) => {
    dispatch(getUserStart);
    getPatient(obj)
      .then((response) => {
        dispatch(getUserSuccess(response));
      })
      .catch((err) => {
        dispatch(getUserFailure(err));
      });
  };
};
export const getDoctorProfile = (obj) => {
  return (dispatch) => {
    dispatch(getUserStart);
    getDoctor(obj)
      .then((response) => {
        dispatch(getUserSuccess(response));
      })
      .catch((err) => dispatch(getUserFailure(err)));
  };
};

export const getAllPatients = (phoneno) => {
  return (dispatch) => {
    getPatient(phoneno)
      .then((response) => {
        dispatch({
          type: ActionTypes.GET_ALL_PATIENTS,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
