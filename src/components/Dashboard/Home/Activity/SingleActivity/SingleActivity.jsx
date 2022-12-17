import React from "react";

const SingleActivity = ({ desc, date }) => {
  return (
    <div className="activity-item d-flex">
      <div className="activite-label">{date}</div>
      <i className="bi bi-circle-fill activity-badge text-success align-self-start"></i>
      <div className="activity-content">{desc}</div>
    </div>
  );
};

export default SingleActivity;
