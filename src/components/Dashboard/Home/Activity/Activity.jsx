import React from "react";
import SingleActivity from "./SingleActivity/SingleActivity";

const Activity = ({ activity }) => {
  function getDateStr(date) {
    let tdate = new Date(date);
    return (
      tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear()
    );
  }
  return (
    <div className="card">
      {/* <div className="filter">
        <a className="icon" href="#" data-bs-toggle="dropdown">
          <i className="bi bi-three-dots"></i>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>

          <li>
            <a className="dropdown-item" href="#">
              Today
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              This Month
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              This Year
            </a>
          </li>
        </ul>
      </div> */}

      <div className="card-body">
        <h5 className="card-title">Recent Activity</h5>

        <div className="activity">
          {activity?.map((singleActivity) => (
            <SingleActivity
              desc={singleActivity?.activity}
              date={getDateStr(singleActivity?.date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
