import React from "react";
import { Link } from "react-router-dom";
import sprite from "./../../sprite.svg";

const NotAuthenticatedHeader = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo logo">
        <svg className="logo--navbar">
          <use href={sprite + "#rope"}></use>
        </svg>
        <h2 className="logo-font">MyBeta</h2>
      </div>
      <div className="navbar__btns">
        <Link to="/signUp" className="btn btn--secondary">
          <Link to="/signUp">Sign Up</Link>
        </Link>
        <Link to="/signIn" className="btn btn--white btn--login">
          <Link to="/signIn">Sign In</Link>
        </Link>
      </div>
    </nav>
  );
};

export default NotAuthenticatedHeader;
