import { ActionTypes } from "../constants/actionTypes";

import { createDoctor, createPatient } from "../../services/api/index";

const createUserStart = () => ({
  type: ActionTypes.CREATE_USER_START,
});
const createUserSuccess = (payload) => ({
  type: ActionTypes.CREATE_USER_SUCCESS,
  payload: payload,
});
const createUserFailure = (message) => ({
  type: ActionTypes.CREATE_USER_FAILURE,
  payload: message,
});
export const createPatientProfile = (obj) => {
  return (dispatch) => {
    dispatch(createUserStart);
    createPatient(obj)
      .then((response) => {
        dispatch(createUserSuccess(response));
      })
      .catch((err) => dispatch(createUserFailure(err)));
  };
};
export const createDoctorProfile = (obj) => {
  return (dispatch) => {
    dispatch(createUserStart);
    createDoctor(obj)
      .then((response) => {
        dispatch(createUserSuccess(response));
      })
      .catch((err) => dispatch(createUserFailure(err)));
  };
};
