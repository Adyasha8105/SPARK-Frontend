import { ActionTypes } from "../constants/actionTypes";

import {
  loginDoctor,
  loginPatient,
  logoutDoctor,
  logoutPatient,
  SignupDoctor,
  SignupPatient,
} from "../../services/api/index";

const userLoginStart = () => ({
  type: ActionTypes.LOGIN_USER_START,
  payload: "Started",
});
const userLoginSuccess = (payload) => ({
  type: ActionTypes.LOGIN_USER_SUCCESS,
  payload: payload,
});
const userLoginFailure = (message) => ({
  type: ActionTypes.LOGIN_USER_FAILURE,
  payload: message,
});
const userSignupStart = () => ({
  type: ActionTypes.SIGNUP_USER_START,
});
const userSignupSuccess = (payload) => ({
  type: ActionTypes.SIGNUP_USER_SUCCESS,
  payload: payload,
});
const userSignupFailure = (message) => ({
  type: ActionTypes.SIGNUP_USER_FAILURE,
  payload: message,
});

const userLogoutSuccess = (payload) => ({
  type: ActionTypes.LOGOUT_SUCCESS,
  payload: payload,
});

const userLogoutFailure = (payload) => ({
  type: ActionTypes.LOGOUT_FAILURE,
  payload: payload,
});

export const cleanStateAction = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLEAN_STATE,
    });
  };
};
export const patientLogin = (data) => {
  return async (dispatch) => {
    loginPatient(data)
      .then(async (user) => {
        dispatch(userLoginStart);
        await setTimeout(() => {}, 3000);
        const payload = {
          phoneno: user.phoneno,
          access: user.accesstoken || null,
          id: user.id || null,
          isRegistered: user.isregistered,
          isLoggedIn: user.isloggedin,
          type: "patient",
        };
        dispatch(userLoginSuccess(payload));
      })
      .catch((err) => {
        dispatch(userLoginFailure(err));
      });
  };
};

export const doctorLogin = (data) => {
  return (dispatch) => {
    dispatch(userLoginStart);
    loginDoctor(data)
      .then((user) => {
        const payload = {
          phoneno: user.phoneno,
          access: user.accesstoken || null,
          id: user.id || null,
          isRegistered: user.isregistered,
          isLoggedIn: user.isloggedin,
          type: "doctor",
        };
        dispatch(userLoginSuccess(payload));
      })
      .catch((err) => {
        dispatch(userLoginFailure(err));
      });
  };
};

export const patientSignUp = (data) => {
  return (dispatch) => {
    dispatch(userSignupStart);
    SignupPatient(data)
      .then((user) => {
        const payload = {
          phoneno: user.phoneno,
          access: user.accesstoken || null,
          id: user.id || null,
          isRegistered: user.isregistered,
          isLoggedIn: user.isloggedin,
          type: "patient",
          createdAt: user.createdat,
        };
        dispatch(userSignupSuccess(payload));
      })
      .catch((err) => {
        dispatch(userSignupFailure(err));
      });
  };
};

export const doctorSignUp = (data) => {
  return (dispatch) => {
    dispatch(userSignupStart);
    SignupDoctor(data)
      .then((user) => {
        const payload = {
          phoneno: user.phoneno,
          access: user.accesstoken || null,
          id: user.id || null,
          isRegistered: user.isregistered,
          isLoggedIn: user.isloggedin,
          type: "doctor",
          createdAt: user.createdat,
        };
        dispatch(userSignupSuccess(payload));
      })
      .catch((err) => {
        dispatch(userSignupFailure(err));
      });
  };
};

export const patientLogout = (token, phoneno) => {
  return (dispatch) => {
    logoutPatient({ token, phoneno })
      .then((response) => {
        dispatch(userLogoutSuccess(response));
      })
      .catch((err) => {
        dispatch(userLogoutFailure(err));
      });
  };
};

export const doctorLogout = (token, phoneno) => {
  return (dispatch) => {
    logoutDoctor({ token, phoneno })
      .then((response) => {
        dispatch(userLogoutSuccess(response));
      })
      .catch((err) => {
        dispatch(userLogoutFailure(err));
      });
  };
};

// export const updateProfile = (profileData) => {
//   return {
//     type: ActionTypes.UPDATE_PROFILE,
//     payload: {
//       phoneno: profileData.phoneno || "",
//       access: profileData.accesstoken || null,
//       address: profileData.address || "",
//       age: profileData.age || "",
//       bloodgp: profileData.bloodgp || null,
//       city: profileData.city || "",
//       dob: profileData.dob || "",
//       email: profileData.email || "",
//       gender: profileData.gender || "",
//       id: profileData.id || null,
//       name: profileData.name || "",
//       pincode: profileData.pincode || "",
//       state: profileData.state || "",
//     },
//   };
// };

export const updateAppointmentStatus = (appointmentStatus) => {
  return {
    type: ActionTypes.UPDATE_STATUS,
    payload: appointmentStatus,
  };
};

export const addNewAppointment = (newAppointment) => {
  return {
    type: ActionTypes.ADD_NEW_APPOINTMENT,
    payload: {
      appointmentDate: newAppointment.date,
      doctor: newAppointment.doctor,
      symptoms: newAppointment.symptoms,
      type: newAppointment.type,
    },
  };
};
