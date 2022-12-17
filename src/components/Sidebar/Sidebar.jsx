import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar inactive-sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to={"/dashboard/active-rides"}>
            <i className="bi bi-geo-alt-fill"></i>
            <span>Active Rides</span>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#driver-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-person"></i>
            <span>Driver</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="driver-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/driver/add-driver"}>
                <i className="bi bi-circle"></i>
                <span>Add Driver</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/driver/all-drivers"}>
                <i className="bi bi-circle"></i>
                <span>All Drivers</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#customer-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-person"></i>
            <span>Customer</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="customer-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/customer/add-customer"}>
                <i className="bi bi-circle"></i>
                <span>Add Customer</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/customer/all-customers"}>
                <i className="bi bi-circle"></i>
                <span>All Customers</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#tours-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-map"></i>
            <span>Tour</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tours-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/tours/add-tours"}>
                <i className="bi bi-circle"></i>
                <span>Add Tour</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/tours/all-tours"}>
                <i className="bi bi-circle"></i>
                <span>All Tours</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#cars-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-truck-front"></i>
            <span>Cars</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="cars-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/car/add-car"}>
                <i className="bi bi-circle"></i>
                <span>Add Car</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/car/add-brand"}>
                <i className="bi bi-circle"></i>
                <span>Add Brands</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/car/all-cars"}>
                <i className="bi bi-circle"></i>
                <span>All Cars</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link collapsed" to={"/dashboard/profile"}>
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
