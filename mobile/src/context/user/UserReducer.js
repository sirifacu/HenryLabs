import {GET_USER, RESTORE_TOKEN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../actions";
import decode from "jwt-decode"

const userReducer = (state, action) => {
  
  switch (action.type) {
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: decode(action.payload),
        isSignout: false,
        token: action.payload,
        loginFailed: false,
        isLoading: false,
      }
    
    case USER_LOGIN_FAIL:
      return{
        ...state,
        loginFailed: true,
        error: action.payload,
      }
  
    case GET_USER:
      return{
        ...state,
        fullUser: action.payload,
      }
  
    case RESTORE_TOKEN:
      return {
        ...state,
        user: decode(action.payload),
        token: action.payload,
        isLoading: false,
      }
      
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        isSignout: true,
        isLoading: false,
      }
      
    default:
      return state;
  }
};

export default userReducer;
