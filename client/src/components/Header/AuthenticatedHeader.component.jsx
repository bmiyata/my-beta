import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import sprite from "./../../sprite.svg";

import { signout } from "../../redux/user/user.actions";

const AuthenticatedHeader = ({ signout }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo navbar__navigation">
        <Link to="/" className="flex navbar__navigation--1 cursor-point">
          <svg className="logo--navbar">
            <use href={sprite + "#rope"}></use>
          </svg>
          <h2 className="logo-font">MyBeta</h2>
        </Link>
        <Link to="/" className="navbar__navigation--2 cursor-point">
          <h3 className="nav-font">Home</h3>
        </Link>
        <Link to="/gyms" className="navbar__navigation--3 cursor-point">
          <h3 className="nav-font">Gyms</h3>
        </Link>
      </div>
      <div className="navbar__btns">
        <button onClick={() => signout()} className="btn btn--secondary">
          <Link to="/signin">Sign Out</Link>
        </button>
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
});

export default connect(null, mapDispatchToProps)(AuthenticatedHeader);
