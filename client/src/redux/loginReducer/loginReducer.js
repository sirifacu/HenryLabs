import decode from "jwt-decode";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, STOP_NOTIFICATION } from "./loginAction";


const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : null,
  cumplañito: false,
  loginFailed: false,
  error: "",
};

export default (state = initialState, action) => {
 
  switch (action.type) {
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: decode(action.payload.user),
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
      
    default:
      return state;
  }
};