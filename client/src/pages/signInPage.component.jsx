import React, { useState } from "react";
import { Link } from "react-router-dom";
import sprite from "./../sprite.svg";
import { connect } from "react-redux";
import { signin } from "./../redux/user/user.actions";

const SignInPage = ({ signin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          value={email}
          onChange={onChange}
          name="email"
          type="text"
          placeholder="Email"
          className="input--auth"
        />
        <input
          value={password}
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          className="input--auth"
        />
        <button
          onClick={() => signin(email, password)}
          className="btn btn--primary btn--auth margin-center"
        >
          Sign In
        </button>
        <Link className="text-center text--blue" to="/signUp">
          Or Sign Up Here
        </Link>
        <Link className="text-center text--blue" to="/forgotPassword">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signin: (email, password) => dispatch(signin(email, password)),
});

export default connect(null, mapDispatchToProps)(SignInPage);
