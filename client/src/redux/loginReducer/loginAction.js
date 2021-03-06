import axios from "axios";
import decode from "jwt-decode";
import { CLEAN_ERROR } from '../studentLecturesReducer/studentLecturesAction';
import { CLEAN_COHORT_MESSAGE } from '../userReducer/userAction';

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";
export const STOP_NOTIFICATION = "STOP_NOTIFICATION";
export const COMPLETE_PROFILE_FORCE = "COMPLETE_PROFILE_FORCE";
export const BACK_TO_LOGIN = "BACK_TO_LOGIN"



export const userLogin = (email, password) => {
  return function (dispatch) {
    return axios.post('/auth/login', { email, password })
      .then(res => {
        const completeProfile = decode(res.data).completeProfile
        if(completeProfile === "pending"){
          dispatch({type: COMPLETE_PROFILE_FORCE, payload: res.data})
          sessionStorage.setItem('data', res.data);
          sessionStorage.setItem('id', decode(res.data).id);
          sessionStorage.setItem('force', decode(res.data).completeProfile);
        }else{
          const dateOfBirth = new Date(decode(res.data).dateOfBirth)
          dateOfBirth.setDate(dateOfBirth.getDate()+1)
          const today = new Date(Date.now())
          dispatch({ type: USER_LOGIN_SUCCESS, payload: {
            user: res.data,
            cumplañito: (dateOfBirth.getDate() === today.getDate() && dateOfBirth.getMonth() === today.getMonth())
          }})
          localStorage.setItem('data', res.data);
        }})
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
  dispatch({ type: CLEAN_COHORT_MESSAGE})
}

export const stopNotification = () => (dispatch) => {
  dispatch({type: STOP_NOTIFICATION})
}

export const backToLogin = () => dispatch => {
  dispatch({type: BACK_TO_LOGIN})
}


