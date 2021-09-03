import { ActionTypes } from "../constants/actionTypes.js";

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

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAN_STATE: {
      return {
        ...initialState,
        isLoginError: "",
      };
    }
    case ActionTypes.CREATE_USER_START: {
      return {
        ...state,
        isLoading: true,
        registered: false,
        errorMessage: null,
      };
    }
    case ActionTypes.CREATE_USER_SUCCESS: {
      return {
        ...state,
        id: action.payload.id,
        phoneno: action.payload.phoneno,
        address: action.payload.address,
        age: action.payload.age,
        bloodgp: action.payload.bloodgp || null,
        city: action.payload.city || null,
        dob: action.payload.dob || null,
        email: action.payload.email,
        gender: action.payload.gender || null,
        name: action.payload.name,
        pincode: action.payload.pincode || null,
        state: action.payload.state || null,
        qualifications: action.payload.qualifications || null,
        specializations: action.payload.specialisations || null,
        hospitalName: action.payload.hospitalname || null,
        workingHrs: action.payload.workinghrs || null,
        workingDays: action.payload.workingdays || null,
        department: action.payload.department || null,
        isLoading: false,
        type: action.payload.type,
        registered: true,
        errorMessage: null,
      };
    }
    case ActionTypes.CREATE_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        registered: false,
      };
    }
    case ActionTypes.GET_USER_START: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        registered: true,
      };
    }
    case ActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        id: action.payload.id,
        phoneno: action.payload.phoneno,
        address: action.payload.address,
        age: action.payload.age,
        bloodgp: action.payload.bloodgp || null,
        city: action.payload.city || null,
        dob: action.payload.dob || null,
        email: action.payload.email,
        gender: action.payload.gender || null,
        name: action.payload.name,
        pincode: action.payload.pincode || null,
        state: action.payload.state || null,
        qualifications: action.payload.qualifications || null,
        specializations: action.payload.specialisations || null,
        hospitalName: action.payload.hospitalname || null,
        workingHrs: action.payload.workinghrs || null,
        workingDays: action.payload.workingdays || null,
        department: action.payload.department || null,
        isLoading: false,
        type: action.payload.type,
        registered: true,
        errorMessage: null,
      };
    }
    case ActionTypes.GET_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        registered: true,
      };
    }

    case ActionTypes.UPDATE_USER_START: {
      return {
        ...state,
        updateSuccess: false,
        isLoading: true,
        errorMessage: null,
      };
    }
    case ActionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateSuccess: true,
        isLoading: false,
        errorMessage: null,
        address: action.payload.address,
        age: action.payload.age,
        bloodgp: action.payload.bloodgp || null,
        city: action.payload.city || null,
        dob: action.payload.dob || null,
        email: action.payload.email,
        gender: action.payload.gender || null,
        name: action.payload.name,
        pincode: action.payload.pincode || null,
        state: action.payload.state || null,
        qualifications: action.payload.qualifications || null,
        specializations: action.payload.specialisations || null,
        hospitalName: action.payload.hospitalname || null,
        workingHrs: action.payload.workinghrs || null,
        workingDays: action.payload.workingdays || null,
        department: action.payload.department || null,
        type: action.payload.type,
        registered: true,
      };
    }
    case ActionTypes.UPDATE_USER_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
        updateSuccess: false,
      };
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      return {
        ...initialState,
      };
    }
    case ActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
