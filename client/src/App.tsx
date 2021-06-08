import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import AdminPage from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { get } from "./utils/requests";
import Questions from "./pages/Questions";
import AdminQuestions from "./pages/admin/AdminQuestions";

//TODO
//***Correct the fonts EVERYWHERE
// background blur chage only for mozilla
// Are you sure question
// Ask Nishika about sqaure rotation in shop
// Ask Nishika about shop background color
// Indication shop mei when something is selected
// Are you sure

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute auth path="/login" component={Login} />
        <PrivateRoute auth path="/register" component={Register} />
        <PrivateRoute
          auth
          path="/reset-password/:token"
          component={ResetPassword}
        />
        <PrivateRoute auth path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/question/:id" component={Questions} />
        <PrivateRoute admin exact path="/admin" component={AdminPage} />
        <PrivateRoute admin exact path="/admin/:id" component={AdminQuestions} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
}
