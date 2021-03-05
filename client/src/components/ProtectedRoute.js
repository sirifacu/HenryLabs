import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";



const PrivateRoute = ({component: Component, ...rest}) => {
  const user = useSelector(store => store.userLoggedIn.userInfo)
  console.log(user)
  
  let userRoles = [];
  if (user) {
    user.roles.forEach(role => {
      userRoles.push(role.name)
    })
  }
  console.log(userRoles)
  
  return (
    
    <Route {...rest} render={props => (
      user && userRoles.includes('staff') || userRoles.includes('instructor')
        ?
        <Component {...props} />
        :
        <Redirect to="/dashboard" />
    )} />
  );
};



export default PrivateRoute;
