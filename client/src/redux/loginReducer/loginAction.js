import axios from "axios";
import decode from "jwt-decode";
import { CLEAN_ERROR } from '../studentLecturesReducer/studentLecturesAction';

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";
export const STOP_NOTIFICATION = "STOP_NOTIFICATION"



export const userLogin = (email, password) => {
  return function (dispatch) {
    return axios.post('/auth/login', { email, password })
      .then(res => {
        const dateOfBirth = new Date(decode(res.data).dateOfBirth)
        dateOfBirth.setDate(dateOfBirth.getDate()+1)
        const today = new Date(Date.now())
        dispatch({ type: USER_LOGIN_SUCCESS, payload: {
          user: res.data, 
          cumplañito: (dateOfBirth.getDate() === today.getDate() && dateOfBirth.getMonth() === today.getMonth())
        }})
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

export const stopNotification = () => (dispatch) => {
  dispatch({type: STOP_NOTIFICATION})
}
  

