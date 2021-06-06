import { RESTORE_TOKEN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, HAVE_MIGRATION, SAVE_USER, UPDATE_USER } from "../actions";
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
      }
    
    case USER_LOGIN_FAIL:
      return{
        ...state,
        loginFailed: true,
        error: action.payload,
      }
  
    case RESTORE_TOKEN:
      return {
        ...state,
        user: decode(action.payload),
        token: action.payload,
      }
      
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        isSignout: true,
      }
      
    case HAVE_MIGRATION:
      return {
        ...state,
        migration: action.payload
      }
  
    case SAVE_USER:
      return {
        ...state,
        userInfo: action.payload
      }
    case UPDATE_USER:
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
