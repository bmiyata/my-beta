import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = (props) => (
  <Fragment>
    <div>
      {props.text ? (
        <h1 class="text-center add-submission-layout__title">{props.text}</h1>
      ) : null}
    </div>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
