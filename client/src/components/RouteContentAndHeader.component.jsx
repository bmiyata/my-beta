import React, { Fragment } from "react";

const RouteContentAndHeader = (props) => {
  return (
    <Fragment>
      <h1 className="title-font p-sm">{props.title}</h1>
      <div className="profile__cards">{props.content}</div>
    </Fragment>
  );
};

export default RouteContentAndHeader;
