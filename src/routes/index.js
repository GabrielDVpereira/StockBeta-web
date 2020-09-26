import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import AuthConextProvider from "../store/contexts/authContext";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthConextProvider>
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Home} />
        </AuthConextProvider>
      </Switch>
    </BrowserRouter>
  );
}
