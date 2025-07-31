import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Menu from "../../svg/Menu";
import { useDispatch, useSelector } from "react-redux";
import { SERVER } from "../../../utils/constants";
import { removegarageCredentialDetails } from "../../../store/slices/garageCredentialDetails";
import axios from "axios";
const Navbar = () => {
  const garagecredentials = useSelector(
    (store) => store.garageCredentialDetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(true);
  const handleLogout = async () => {
    const result = await axios.post(
      SERVER + "/twogms/logout",
      {},
      { withCredentials: true }
    );
    dispatch(removegarageCredentialDetails());
    navigate("/");
  };
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
          {garagecredentials && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Add vehicle</a>
              </li>
              <li>
                <a>Statistics</a>
              </li>
              <li>
                <a>History</a>
              </li>
              <li>
                <a>Configuration</a>
              </li>
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          )}
          {!garagecredentials && (
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
          )}
        </div>
        <div className="btn btn-ghost text-xl">
          <img
            className="w-14 rounded-full my-2"
            src={require("../../../images/logo.png")}
          ></img>
        </div>
      </div>
      {garagecredentials && (
        <div className="navbar-center">
          <p>Welcome, </p>
          <p>{garagecredentials?.ownerName}</p>
        </div>
      )}
      <div className="navbar-end hidden lg:flex">
        {garagecredentials && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Add vehicle</a>
            </li>
            <li>
              <a>Statistics</a>
            </li>
            <li>
              <a>History</a>
            </li>
            <li>
              <a>Configuration</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
        {!garagecredentials && (
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
