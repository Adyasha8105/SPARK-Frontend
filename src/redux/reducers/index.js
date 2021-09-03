import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";
import doctorReducer from "./doctorReducer";
import todayAppointmentReducer from "./todayAppointmentReducer";
import patientReducer from "./patientsReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "profileReducer",
    "appointmentReducer",
    "authReducer",
    "doctorReducer",
    "patientReducer",
  ],
};

const reducers = combineReducers({
  appointmentReducer,
  todayAppointmentReducer,
  profileReducer,
  authReducer,
  doctorReducer,
  patientReducer,
});

export default persistReducer(persistConfig, reducers);
