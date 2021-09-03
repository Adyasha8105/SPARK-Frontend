import { updateDoctor, updatePatient } from "../../services/api";
import { ActionTypes } from "../constants/actionTypes";

const updateUserStart = () => ({
  type: ActionTypes.UPDATE_USER_START,
});

const updateUserSuccess = (payload) => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  payload: payload,
});

const updateUserFailure = (errMessage) => ({
  type: ActionTypes.UPDATE_USER_FAILURE,
  payload: errMessage,
});

export const updatePatientAsync = (data) => {
  return (dispatch) => {
    dispatch(updateUserStart);

    updatePatient(data)
      .then((response) => {
        dispatch(updateUserSuccess(response));
      })
      .catch((err) => {
        dispatch(updateUserFailure(err));
      });
  };
};

export const updateDoctorAsync = (data) => {
  return (dispatch) => {
    dispatch(updateUserStart);

    updateDoctor(data)
      .then((response) => {
        dispatch(updateUserSuccess(response));
      })
      .catch((err) => {
        dispatch(updateUserFailure(err));
      });
  };
};
