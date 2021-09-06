import { ActionTypes } from "../constants/actionTypes.js";

const initialState = {
  appointments: [],
  errMessage: null,
  errLogout: null,
  isLoading: false,
  updated:false
};

const todayAppointmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CLEAN_STATE: {
      return {
        ...initialState,
        errLogout:null,
      };
    }
    case ActionTypes.GET_TODAY_APPOINTMENT_SUCCESS: {
      var newArray=[]
      if(payload.length>0)
      {
        const todayDate = new Date().toJSON().slice(0, 10);
        newArray = payload.filter(
          (item) => item.apdate === todayDate
        );
      }
      
      return {
        ...state,
        appointments: newArray
      };
    }
    case ActionTypes.GET_TODAY_APPOINTMENT_FAILURE:
      return {
        ...state,
        errMessage: ActionTypes.payload,
      };

    
      case ActionTypes.UPDATE_AP_START:
        return {
          ...state,
          isLoading: true,
          updated:false,
          errMessage: null,
        };
      case ActionTypes.UPDATE_AP_SUCCESS:
        {
          
          return {
          ...state,
          updated:true,
          isLoading:false
        }
        }
        case ActionTypes.UPDATE_AP_FAILURE:
          {
            
            return {
            ...state,
            updated:false,
            errMessage:payload,
            isLoading:false
          }
          }
  

    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState,
        errLogout: null,
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        errLogout: ActionTypes.payload,
      };

    default:
      return state;
  }
};

export default todayAppointmentReducer;
