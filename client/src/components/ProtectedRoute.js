import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";


export const PrivateRoute = ({component: Component, roles, ...rest}) => {
  const user = useSelector(store => store.userLoggedIn.userInfo);
  const force = sessionStorage.getItem('force')
  
  let userRoles = [];
  user.roles?.forEach(role => { userRoles.push(role.name)})
  
  let allow = false;
  if(roles === undefined){
    allow = true;
  }

 roles?.forEach(role => {
   if(userRoles.includes(role)) {
     allow = true;
   }
 })
  
  return (
    
    <Route {...rest} render={props => (
      user && allow
        ?
        force === 'pending' ? <Redirect to='/complete_profile'/>:
        <Component {...props} />
        :
        <Redirect to="/" />
    )} />
  );
};

export const PublicRoute = ({component: Component, restricted, ...rest}) => {
  const user = useSelector(store => store.userLoggedIn.userInfo)
  
  return (
    <Route {...rest} render={props => (
      user && restricted
        ?
        <Redirect to="/dashboard" />
        :
        <Component {...props} />
    )} />
  );
};

