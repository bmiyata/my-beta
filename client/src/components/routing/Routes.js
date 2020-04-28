import { Route, Switch, Redirect } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import PrivateRoute from "./PrivateRoute";

import NotAuthenticatedHeader from "../Header/NotAuthenticatedHeader.component";
import AuthenticatedHeader from "../Header/AuthenticatedHeader.component";
import SignInPage from "../../pages/signInPage.component";
import SignUpPage from "./../../pages/signUpPage.component";
import ForgotPasswordPage from "./../../pages/forgotPasswordPage.component";
import HomePage from "../../pages/HomePage.component";
import GymsPage from "../../pages/GymsPage.component";
import GymPage from "../../pages/GymPage.component";
import AddSubmissionPage from "../../pages/AddSubmissionPage.component";
import SubmissionPage from "../../pages/SubmissionPage.component";
import RoutePage from "../../pages/RoutePage.component";
import UserPage from "../../pages/UserPage.component";
import Alert from "../../components/Alert.component";
import ResetPasswordPage from "../../pages/ResetPassword.component";

const Routes = ({ user }) => {
  return (
    <Fragment>
      {user.isAuthenticated ? (
        <AuthenticatedHeader />
      ) : (
        <NotAuthenticatedHeader />
      )}
      <Alert />
      <Switch>
        <Route
          exact
          path="/signUp"
          render={() =>
            user.isAuthenticated ? <Redirect to="/" /> : <SignUpPage />
          }
        />

        <Route
          exact
          path="/signIn"
          render={() =>
            user.isAuthenticated ? <Redirect to="/" /> : <SignInPage />
          }
        />
        <Route exact path="/forgotPassword" component={ForgotPasswordPage} />
        <Route
          exact
          path="/resetPassword/:resetToken"
          component={ResetPasswordPage}
        />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/gyms" component={GymsPage} />
        <PrivateRoute exact path="/gyms/:gymId" component={GymPage} />
        <PrivateRoute
          exact
          path="/routes/:gymId/:routeId"
          component={RoutePage}
        />
        <PrivateRoute
          exact
          path="/addSubmission/:routeId"
          component={AddSubmissionPage}
        />
        <PrivateRoute
          exact
          path="/submissions/:submissionId"
          component={SubmissionPage}
        />
        <PrivateRoute exact path="/:username" component={UserPage} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Routes);
