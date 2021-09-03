import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  phoneno: null,
  access: null,
  address: null,
  age: null,
  bloodgp: null,
  city: null,
  dob: null,
  email: null,
  gender: null,
  id: null,
  name: null,
  pincode: null,
  state: null,
  department: null,
  hospitalName: null,
  qualifications: null,
  specializations: null,
  workingHrs: null,
  workingDays: null,
  isLoading: false,
  registered: false,
  errorMessage: null,
  type: null,
  updateSuccess: false,
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAN_STATE: {
      return {
        ...initialState,
        errorMessage:null,
      };
    }
    case ActionTypes.GET_ALL_PATIENTS:
      return {
        ...state,
        id: action.payload.id || null,
        phoneno: action.payload.phoneno || null,
        address: action.payload.address || null,
        age: action.payload.age || null,
        bloodgp: action.payload.bloodgp || null,
        city: action.payload.city || null,
        dob: action.payload.dob || null,
        email: action.payload.email || null,
        gender: action.payload.gender || null,
        name: action.payload.name || null,
        pincode: action.payload.pincode || null,
        state: action.payload.state || null,
        qualifications: action.payload.qualifications || null,
        specializations: action.payload.specialisations || null,
        hospitalName: action.payload.hospitalname || null,
        workingHrs: action.payload.workinghrs || null,
        workingDays: action.payload.workingdays || null,
        department: action.payload.department || null,
        isLoading: false || null,
        type: action.payload.type || null,
        registered: true || null,
        errorMessage: null || null,
      };

    default:
      return state;
  }
};

export default patientReducer;
