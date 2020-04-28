import React, { useEffect, Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";

import Spinner from "./Spinner/Spinner.component";
import sprite from "./../sprite.svg";

const SubmissionCard = ({ post }) => {
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(`/api/v1/users/getById/${post.user}`);
      setUser(user);
      setLoading(false);
      console.log(user.data.data.user);
    };
    fetchData();
  }, [post.user]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div key={post._id} className="cursor-point card card--post">
          <Link to={`/submissions/${post._id}`} className="video-container">
            <video className="video-card" src={post.videoURL} alt="" />
          </Link>

          <div className="grid__submission-card">
            <div className="grid__submission-card">
              <svg className="logo--navbar">
                <use href={sprite + "#heart"}></use>
              </svg>
              <p>{post.likes.length}</p>
            </div>
            <div className="grid__submission-card">
              <svg className="logo--navbar">
                <use href={sprite + "#calendar"}></use>
              </svg>
              <p>
                <Moment format="MM/DD/YYYY">{post.createdAt}</Moment>
              </p>
            </div>
          </div>
          <div className="grid pos-rel">
            <div className="divider"></div>
            <div className="flex mb-micro mt-micro">
              <img
                className="submitted-by--icon mr-sm"
                src={user.data.data.user.photoURL}
                onClick={() => history.push(`/${user.data.data.user.username}`)}
                alt="User"
              />
              <p>{user.data.data.user.username}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SubmissionCard;
