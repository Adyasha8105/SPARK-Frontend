const SPARK_API_URL = "https://spark-healthlines-backend.herokuapp.com/";

const LOGIN_PATIENT_URL = SPARK_API_URL + "auth/patient/login";
const LOGIN_DOCTOR_URL = SPARK_API_URL + "auth/doctor/login";
const SIGNUP_PATIENT_URL = SPARK_API_URL + "auth/patient/signup";
const SIGNUP_DOCTOR_URL = SPARK_API_URL + "auth/doctor/signup";
const CREATE_PATIENT_URL = SPARK_API_URL + "user/patients";
const CREATE_DOCTOR_URL = SPARK_API_URL + "user/doctors";
const CREATE_AP_URL = SPARK_API_URL + "appointment/create";
const GET_AP_URL = SPARK_API_URL + "appointment/";
const LOGOUT_PATIENT_URL = SPARK_API_URL + "auth/patient/logout";
const LOGOUT_DOCTOR_URL = SPARK_API_URL + "auth/doctor/logout";
const CANCEL_AP_URL = SPARK_API_URL + "appointment/cancel";
const UPDATE_AP_URL = SPARK_API_URL + "appointment/update";
const GET_ALL_DOC = SPARK_API_URL + "user/doctors/";
const GET_DOCTOR = SPARK_API_URL + "user/doctors";
const GET_PATIENT = SPARK_API_URL + "user/patients";
const UPDATE_PATIENT_URL = SPARK_API_URL + "user/patients"
const UPDATE_DOCTOR_URL = SPARK_API_URL + "user/doctors"
export {
  SPARK_API_URL,
  GET_ALL_DOC,
  LOGIN_PATIENT_URL,
  LOGIN_DOCTOR_URL,
  SIGNUP_PATIENT_URL,
  SIGNUP_DOCTOR_URL,
  CREATE_AP_URL,
  GET_AP_URL,
  CANCEL_AP_URL,
  UPDATE_AP_URL,
  CREATE_PATIENT_URL,
  CREATE_DOCTOR_URL,
  LOGOUT_PATIENT_URL,
  LOGOUT_DOCTOR_URL,
  GET_DOCTOR,
  GET_PATIENT,
  UPDATE_PATIENT_URL,
  UPDATE_DOCTOR_URL
};
