import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const garageCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  return garageCredentials ? (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="w-16 rounded-full"
              src={require("../images/logo.png")}
            ></img>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Servicing vehicles
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Serviced vehicles
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Add vehicle
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              My job
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          <ul>
            <li>
              <Link to="#" className="text-gray-700 hover:text-blue-600">
                Servicing vehicles
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-700 hover:text-blue-600">
                Serviced vehicles
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-700 hover:text-blue-600">
                Add vehicle
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-700 hover:text-blue-600">
                My job
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-700 hover:text-blue-600">
                Profile
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-700 hover:text-blue-600">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  ) : (
    <></>
  );
};

export default Navbar;
