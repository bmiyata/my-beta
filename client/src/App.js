import React, { Fragment, useEffect } from "react";
import Routes from "./components/routing/Routes";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import { store } from "./redux/store";

import { loadUser } from "./redux/user/user.actions";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Fragment>
        <Routes />
      </Fragment>
    </Router>
  );
};

export default App;
