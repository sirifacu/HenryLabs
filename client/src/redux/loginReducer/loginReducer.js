import decode from "jwt-decode";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
         STOP_NOTIFICATION, COMPLETE_PROFILE_FORCE, BACK_TO_LOGIN } from "./loginAction";


const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : "",
  token: localStorage.getItem("data") ? localStorage.getItem("data") : "",
  cumplañito: false,
  loginFailed: false,
  error: "",
  force: false,
};

const loginReducer = (state = initialState, action) => {
 
  switch (action.type) {
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: decode(action.payload.token),
        token: action.payload.token,
        cumplañito: action.payload.cumplañito
      }

    case USER_LOGIN_FAIL:
      return{
        ...state,
        loginFailed: true,
        error: action.payload,
      }

    case STOP_NOTIFICATION:
     return{
       ...state,
       cumplañito: false
     }
    case USER_LOGOUT:
      return { }

    case COMPLETE_PROFILE_FORCE:
      
      return {
        userInfo: decode(action.payload),
        force: true
      }

    case BACK_TO_LOGIN:
      return {}

    default:
      return state;
  }
};

export default loginReducer;
