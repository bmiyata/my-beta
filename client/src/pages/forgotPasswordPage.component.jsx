import React, { useState } from "react";
import { Link } from "react-router-dom";
import sprite from "./../sprite.svg";
import { connect } from "react-redux";

import { sendResetPasswordLink } from "../redux/user/user.actions";

const ForgotPassword = ({ sendResetPasswordLink }) => {
  const [email, setEmail] = useState({
    email: "",
  });

  const handleOnChange = (e) => {
    setEmail({ email: e.target.value });
  };

  return (
    <div className="container--auth">
      <form onSubmit={(e) => e.preventDefault()} className="form form--auth">
        <div className="logo margin-center mb-sm">
          <svg className="logo--form">
            <use href={sprite + "#rope"}></use>
          </svg>
          <h2 className="logo-font">MyBeta</h2>
        </div>
        <input
          onChange={(e) => handleOnChange(e)}
          type="text"
          placeholder="Email"
          className="input--auth"
        />

        <button
          onClick={() => sendResetPasswordLink(email)}
          className="btn btn--primary btn--auth margin-center"
        >
          Send Email
        </button>
        <Link className="text-center text--blue" to="/signIn">
          Or Sign in Here
        </Link>
        <Link className="text-center text--blue" to="signUp">
          Or Sign Up Here
        </Link>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendResetPasswordLink: (email) => dispatch(sendResetPasswordLink(email)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
