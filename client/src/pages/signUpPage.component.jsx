import React, { useState } from "react";
import { Link } from "react-router-dom";
import sprite from "./../sprite.svg";
import { connect } from "react-redux";
import { register } from "../redux/user/user.actions";

const SignUpPage = ({ register }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { username, email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container--auth">
      <form onSubmit={(e) => e.preventDefault()} className="form form--auth">
        <div className="logo mb-sm margin-center">
          <svg className="logo--form">
            <use href={sprite + "#rope"}></use>
          </svg>
          <h2 className="logo-font">MyBeta</h2>
        </div>
        <input
          onChange={(e) => onChange(e)}
          value={username}
          name="username"
          type="text"
          placeholder="Username"
          className="input--auth"
        />
        <input
          onChange={(e) => onChange(e)}
          value={email}
          name="email"
          type="text"
          placeholder="Email"
          className="input--auth"
        />
        <input
          onChange={(e) => onChange(e)}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          className="input--auth"
        />
        <input
          onChange={(e) => onChange(e)}
          value={passwordConfirm}
          name="passwordConfirm"
          type="password"
          placeholder="Password Confirm"
          className="input--auth"
        />
        <button
          onClick={() => register(username, email, password, passwordConfirm)}
          className="btn btn--primary btn--auth margin-center"
        >
          Sign Up
        </button>
        <Link className="text-center text--blue" to="/signIn">
          Or Sign in Here
        </Link>
        <Link className="text-center text--blue" to="/forgotPassword">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  register: (username, email, password, passwordConfirm) =>
    dispatch(register(username, email, password, passwordConfirm)),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
