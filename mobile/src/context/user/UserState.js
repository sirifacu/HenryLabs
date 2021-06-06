import React, { useEffect, useReducer } from 'react';
import UserReducer from './UserReducer'
import UserContext from "./UserContext";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RESTORE_TOKEN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, HAVE_MIGRATION, SAVE_USER, UPDATE_USER } from "../actions";
import decode from "jwt-decode";
import messaging from '@react-native-firebase/messaging';
import { updateRegistrationToken } from '../../components/utils'
import { Alert } from "react-native";


function UserState (props) {
  
  const initialState = {
    user:{},
    userInfo: {},
    token: null,
    isSignout: false,
    loginFailed: false,
    error: null,
    migration: false,
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
      const res = await axios.post(`/auth/login`, { email, password })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data})
      await AsyncStorage.setItem('token', res.data);
      const userId = decode(res.data).id;
      const registrationToken = await messaging().getToken();
      updateRegistrationToken(userId, registrationToken);
    } catch (error){
      dispatch({type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      })
    }
  }
  
  const getUser = async (userId) => {
    try{
      const getUser = await axios.get(`/users/${userId}`,
        { headers: {'Authorization': 'Bearer ' + state.token }});
      dispatch({ type: SAVE_USER, payload: getUser.data})
    } catch (error) {
      console.log(error)
    }
  }
  
  const updateUser = (userId, userData) => {
    return axios.put(`/users/update/${userId}`, userData,
      { headers: {'Authorization': 'Bearer ' + state.token }})
      .then((res) => {
        dispatch({type: UPDATE_USER, payload: res.data.user }); })
      .catch(err => console.log(err));
  };
  
  const userLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      dispatch({ type: USER_LOGOUT })
    } catch(e) {
      console.log(e)
    }
  }
  
  const haveMigration = (userId) => {
    axios.get(`/migrations/listOne/${userId}`,
      { headers: {'Authorization': 'Bearer ' + state.token }})
      .then(res => {
        dispatch({ type: HAVE_MIGRATION, payload: res.data.message})
      }).catch(err => console.log(err));
  };
  
  const showAlertError = () =>{
    Alert.alert(
      "ERROR",
      "Los datos ingresados son incorrectos",
      [
        { text: "OK", onPress: () => {
          dispatch({type: USER_LOGIN_FAIL,
            payload: null
          })
        }}
      ]
    );
  }
  
  
  return (
    <UserContext.Provider value={{
      userLoggedIn: state.user,
      userInfo: state.userInfo,
      token: state.token,
      error: state.error,
      migration: state.migration,
      userLogin,
      userLogout,
      showAlertError,
      haveMigration,
      getUser,
      updateUser
    }}>
      { props.children }
    </UserContext.Provider>
  )
}


export default UserState;
