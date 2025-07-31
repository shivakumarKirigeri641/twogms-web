import React, { useState } from "react";
import { Link } from "react-router";
import Menu from "../../svg/Menu";
const Navbar = () => {
  const [showMenu, setshowMenu] = useState(true);
  return (
    <div className="sticky w-full text-blue-800 p-1 flex justify-between z-20 items-center bg-gradient-to-b from-blue-100 to-blue-300">
      <img
        className="w-20 rounded-full"
        src={require("../../../images/logo.png")}
      ></img>
      <div>
        <div className="relative block md:hidden">
          <Menu setshowMenu={setshowMenu} />
          {showMenu && (
            <ul className="absolute font-bold bg-slate-500 top-0 right-1 p-2 rounded text-nowrap text-gray-200 transition-all duration-500 ease-in">
              <div className="text-right">X</div>
              <li className="m-2">
                <Link to="/">Home</Link>
              </li>
              <li className="m-2">
                <Link to="/twogms/garagelogin">Garage</Link>
              </li>
              <li className="m-2">
                <Link to="/">Customer</Link>
              </li>
              <li className="m-2">
                <Link to="/">Services</Link>
              </li>
              <li className="m-2">
                <Link to="/">Contact us</Link>
              </li>
              <li className="m-2">
                <Link to="/">About</Link>
              </li>
            </ul>
          )}
          {showMenu && (
            <div
              className="fixed inset-0 right-1 top-0 w-full h-full z-30 bg-transparent"
              onClick={() => {
                setshowMenu(false);
              }}
            ></div>
          )}
        </div>
        <ul className="hidden md:flex justify-around items-center font-bold">
          <li className="mx-5">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-5">
            <Link to="/twogms/garagelogin">Garage</Link>
          </li>
          <li className="mx-5">
            <Link to="/">Customer</Link>
          </li>
          <li className="mx-5">
            <Link to="/">Services</Link>
          </li>
          <li className="mx-5">
            <Link to="/">Contact us</Link>
          </li>
          <li className="mx-5">
            <Link to="/">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
