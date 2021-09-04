import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  phoneno: "",
  createdAt: "",
  access: null,
  id: null,
  isLoginLoading: false,
  isLoginError: "",
  isSignupLoading: false,
  isSignupError: "",
  isRegistered: false,
  isLoggedIn: false,
  isLogoutErr: null,
  isLogout: false,
  type: "",
  isSignedUp: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAN_STATE: {
      return {
        ...initialState,
        isLoginError: "",
      };
    }
    case ActionTypes.LOGIN_USER_START:
      return {
        ...state,
        isLoginLoading: true,
        isLoginError: "",
      };

    case ActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoginLoading: false,
        phoneno: action.payload.phoneno || "",
        access: action.payload.access || null,
        id: action.payload.id || null,
        isRegistered: action.payload.isRegistered,
        isLoggedIn: action.payload.isLoggedIn,
        isSignedUp: true,
        type: action.payload.type,
        isLoginError: "",
        isLogout: false,
      };
    }

    case ActionTypes.LOGIN_USER_FAILURE: {
      return {
        ...state,
        isLoginLoading: false,
        isLoginError: action.payload,
      };
    }

    case ActionTypes.SIGNUP_USER_START: {
      return {
        ...state,
        isSignupLoading: true,
        isSignupError: "",
      };
    }
    case ActionTypes.SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        isLoginLoading: false,
        phoneno: action.payload.phoneno || "",
        access: action.payload.access || null,
        id: action.payload.id || null,
        isRegistered: action.payload.isRegistered,
        isLoggedIn: action.payload.isLoggedIn,
        type: action.payload.type,
        isSignupLoading: false,
        createdAt: action.payload.createdAt,
        isSignedUp: true,
        isSignupError: "",
      };
    }

    case ActionTypes.SIGNUP_USER_FAILURE: {
      return {
        ...state,
        isSignupLoading: false,
        isSignupError: action.payload,
      };
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      return {
        ...initialState,
        isLogout: true,
      };
    }
    case ActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        isLogoutErr: action.payload,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
