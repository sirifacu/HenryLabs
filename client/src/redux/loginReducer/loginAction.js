import axios from "axios";
import { CLEAN_ERROR } from '../studentLecturesReducer/studentLecturesAction';

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";



export const userLogin = (email, password) => {
  return function (dispatch) {
    return axios.post('/auth/login', { email, password })
      .then(res => {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
        localStorage.setItem('data', res.data);
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
      })
  }
}

export const userLogout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: CLEAN_ERROR })
}