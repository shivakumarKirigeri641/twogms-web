import { useEffect, useState } from "react";
import { removegarageLoginCredentials } from "../store/slices/garageLoginCredentialsSlice";
import { removeservicingVehicles } from "../store/slices/servicingVehiclesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeservicedVehicles } from "../store/slices/servicedVehiclesSlice";
import { removeservicingVehicles } from "../store/slices/servicingVehiclesSlice";
import Welcomebar from "./Welcomebar";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const garageCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    dispatch(removeservicingVehicles());
    dispatch(removegarageLoginCredentials());
    dispatch(removeservicedVehicles());
    dispatch(removeservicingVehicles());
    navigate("/twogms/login");
  };
  return garageCredentials ? (
    <nav className="bg-blue-600 text-white sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <img
              className="w-15 rounded-full p-2"
              src={require("../images/logo.png")}
            ></img>
          </div>
          {/* Desktop Menu with owner*/}
          {true === garageCredentials?.isGarageOwner && (
            <div className="hidden md:flex space-x-6 items-center text-[85%] font-semibold">
              <Link to="/" className="hover:text-gray-200">
                Servicing vehicles
              </Link>
              <Link to="/serviced-vehicles" className="hover:text-gray-200">
                Serviced vehicles
              </Link>
              <Link to="/twogms/add-vehicle" className="hover:text-gray-200">
                Add vehicle
              </Link>
              <Link to="/" className="hover:text-gray-200">
                Service History
              </Link>
              <Link to="/" className="hover:text-gray-200">
                Statistics
              </Link>
              <Link to="/" className="hover:text-gray-200">
                Service Payments
              </Link>
              <Link to="/" className="hover:text-gray-200">
                Wallets & Recharges
              </Link>
              {/* Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <button
                  className="hover:text-gray-200 flex items-center cursor-pointer"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                >
                  Manage Services
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link
                      to="/service1"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Staff
                    </Link>
                    <Link
                      to="/service1"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Customer
                    </Link>
                    <Link
                      to="/service1"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Vehicle
                    </Link>
                  </div>
                )}
              </div>
              {/* Dropdown */}
              <Link to="/about" className="hover:text-gray-200">
                Profile
              </Link>
              <button
                className="hover:text-gray-200  cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
          {/* Desktop Menu with owner*/}
          {/* Desktop Menu with mechanic*/}
          {false === garageCredentials?.isGarageOwner && (
            <div className="hidden md:flex space-x-6 items-center text-[85%] font-semibold">
              <Link to="/" className="hover:text-gray-200">
                Servicing vehicles
              </Link>
              <Link to="/serviced-vehicles" className="hover:text-gray-200">
                Serviced vehicles
              </Link>
              <Link to="/twogms/add-vehicle" className="hover:text-gray-200">
                Add vehicle
              </Link>
              <Link to="/" className="hover:text-gray-200">
                My Service History
              </Link>

              <Link to="/about" className="hover:text-gray-200">
                Profile
              </Link>
              <button
                className="hover:text-gray-200 cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
          {/* Desktop Menu with mechanic*/}
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && true === garageCredentials?.isGarageOwner && (
        <div className="md:hidden bg-blue-700">
          <ul>
            <li className="p-2.5 hover:font-bold">
              <Link to="/" className="hover:text-gray-200">
                Servicing vehicles
              </Link>
            </li>
            <li className="p-2.5 hover:font-bold">
              <Link to="/serviced-vehicles" className="hover:text-gray-200">
                Serviced vehicles
              </Link>
            </li>
            <li className="p-2.5 hover:font-bold">
              <Link to="/twogms/add-vehicle" className="hover:text-gray-200">
                Add vehicle
              </Link>
            </li>
            <li className="p-2.5 hover:font-bold">
              <Link to="/" className="hover:text-gray-200">
                Service History
              </Link>
            </li>
            <li className="p-2.5 hover:font-bold">
              <Link to="/" className="hover:text-gray-200">
                Statistics
              </Link>
            </li>
            <li className="p-2.5 hover:font-bold">
              <Link to="/" className="hover:text-gray-200">
                Service Payments
              </Link>
            </li>
            <li className="p-2.5 hover:font-bold">
              <Link to="/" className="hover:text-gray-200">
                Wallets & Recharges
              </Link>
            </li>
          </ul>

          {/* Mobile Dropdown */}
          <div>
            <button
              className="w-full text-left px-4 py-2 hover:bg-blue-800 flex justify-between items-center  cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Services
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isDropdownOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                )}
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="bg-blue-600">
                <ul>
                  <li className="p-2.5 hover:font-bold">
                    <Link to="/service1">Staff</Link>
                  </li>
                  <li className="p-2.5 hover:font-bold">
                    <Link to="/service1">Customer</Link>
                  </li>
                  <li className="p-2.5 hover:font-bold">
                    <Link to="/service1">Vehicle</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-blue-800 p-2.5 hover:font-bold"
          >
            Profile
          </Link>
          <button
            className="hover:text-gray-200 cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
      <Welcomebar />
    </nav>
  ) : (
    <></>
  );
};

export default Navbar;
