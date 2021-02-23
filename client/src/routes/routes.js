import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../components/dashboard/main/dashboard";
import Profile from "../components/profile/Profile";

const Routes = () => {
  return (
    <>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/profile" component={Profile} />
    </>
  );
};

export default Routes;
