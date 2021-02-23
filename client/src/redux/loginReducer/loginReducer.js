export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";


const initialState = {
  userInfo: {},
  loginFailed: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload
      }
    case USER_LOGIN_FAIL:
      return{
        ...state,
        loginFailed: true,
        error: action.payload,
      }
    default:
      return state;
  }
};
