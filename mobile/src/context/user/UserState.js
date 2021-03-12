import React, {useEffect, useReducer} from 'react';
import UserReducer from './UserReducer'
import UserContext from "./UserContext";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_USER, RESTORE_TOKEN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../actions";

function UserState (props) {
  
  
  const initialState = {
    user:{},
    fullUser: {},
    token: null,
    isLoading: true,
    isSignout: false,
    loginFailed: false,
    error: ''
  }
  
  const [state, dispatch] = useReducer(UserReducer, initialState)
  
  
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
        if(userToken){
          dispatch({ type:RESTORE_TOKEN, payload: userToken });
        }
      } catch (e) {
        console.log(e)
      }
    };
    
    bootstrapAsync();
  }, []);
  
  const userLogin = async  (email, password ) =>{
    try{
      const res = await axios.post('http://192.168.0.200:3001/api/auth/login', { email, password },
        { headers: {'Authorization': 'Bearer ' + state.token }});
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data})
      await AsyncStorage.setItem('token', res.data);
    }catch (error){
      dispatch({type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      })
    }
  }
  
  const userLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      dispatch({ type: USER_LOGOUT })
    } catch(e) {
      console.log(e)
    }
  }
  
  const getUser = (userId) => (dispatch) => {
    return axios.get(`http://192.168.0.200:3001/api/users/${userId}`,
      { headers: {'Authorization': 'Bearer ' + state.token }})
      .then(res => dispatch({type: GET_USER, payload: res.data}))
      .catch(e => console.log(e))
  }
  
  return (
    <UserContext.Provider value={{
      userLoggedIn: state.user,
      userData: state.fullUser,
      token: state.token,
      error: state.error,
      userLogin,
      userLogout,
      getUser
    }}>
      { props.children }
    </UserContext.Provider>
  )
}


export default UserState;
