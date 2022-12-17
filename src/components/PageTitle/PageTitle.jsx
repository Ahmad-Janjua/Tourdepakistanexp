import React from "react";
import { Link } from "react-router-dom";
const PageTitle = ({ name }) => {
  return (
    <div className="pagetitle">
      <h1>{name}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item active">{name}</li>
        </ol>
      </nav>
    </div>
  );
};

export default PageTitle;
