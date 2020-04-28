import React, { useState } from "react";
import sprite from "./../sprite.svg";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../redux/user/user.actions";

export const ResetPasswordPage = ({ match, resetPassword }) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input--auth"
        />
        <input
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Password Confirm"
          className="input--auth"
        />

        <button
          onClick={() =>
            resetPassword(
              password,
              passwordConfirm,
              match.params.resetToken,
              history
            )
          }
          className="btn btn--primary btn--auth margin-center"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (password, confirmPassword, resetToken, history) =>
    dispatch(resetPassword(password, confirmPassword, resetToken, history)),
});

export default connect(null, mapDispatchToProps)(ResetPasswordPage);
