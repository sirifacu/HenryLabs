import decode from "jwt-decode";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "./loginAction";


const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : null,
  loginFailed: false,
  error: "",
};

export default (state = initialState, action) => {
 
  switch (action.type) {
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: decode(action.payload)
      }
    case USER_LOGIN_FAIL:
      return{
        ...state,
        loginFailed: true,
        error: action.payload,
      }
    case USER_LOGOUT:
      return { }
      
    default:
      return state;
  }
};