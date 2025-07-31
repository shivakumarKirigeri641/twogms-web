import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Menu from "../../svg/Menu";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(true);
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Garage</a>
            </li>
            <li>
              <a>Customer</a>
            </li>
            <li>
              <a>Services</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
            <li>
              <a>About us</a>
            </li>
          </ul>
        </div>
        <div className="btn btn-ghost text-xl">
          <img
            className="w-14 rounded-full my-2"
            src={require("../../../images/logo.png")}
          ></img>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a>Garage</a>
          </li>
          <li>
            <a>Customer</a>
          </li>
          <li>
            <a>Services</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>
          <li>
            <a>About us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
