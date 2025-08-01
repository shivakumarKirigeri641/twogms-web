import React from "react";

const Menu = ({ setshowMenu }) => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setshowMenu(true);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="40"
        height="40"
        viewBox="0 0 48 48"
      >
        <linearGradient
          id="ULyvxr9k_jV3hToEf4Ujga_6uJdcB0tVRwZ_gr1"
          x1="12.066"
          x2="34.891"
          y1=".066"
          y2="22.891"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".237" stop-color="#3bc9f3"></stop>
          <stop offset=".85" stop-color="#1591d8"></stop>
        </linearGradient>
        <path
          fill="url(#ULyvxr9k_jV3hToEf4Ujga_6uJdcB0tVRwZ_gr1)"
          d="M43,15H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,14.1,44.1,15,43,15z"
        ></path>
        <linearGradient
          id="ULyvxr9k_jV3hToEf4Ujgb_6uJdcB0tVRwZ_gr2"
          x1="12.066"
          x2="34.891"
          y1="12.066"
          y2="34.891"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".237" stop-color="#3bc9f3"></stop>
          <stop offset=".85" stop-color="#1591d8"></stop>
        </linearGradient>
        <path
          fill="url(#ULyvxr9k_jV3hToEf4Ujgb_6uJdcB0tVRwZ_gr2)"
          d="M43,27H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,26.1,44.1,27,43,27z"
        ></path>
        <linearGradient
          id="ULyvxr9k_jV3hToEf4Ujgc_6uJdcB0tVRwZ_gr3"
          x1="12.066"
          x2="34.891"
          y1="24.066"
          y2="46.891"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".237" stop-color="#3bc9f3"></stop>
          <stop offset=".85" stop-color="#1591d8"></stop>
        </linearGradient>
        <path
          fill="url(#ULyvxr9k_jV3hToEf4Ujgc_6uJdcB0tVRwZ_gr3)"
          d="M43,39H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,38.1,44.1,39,43,39z"
        ></path>
      </svg>
    </div>
  );
};

export default Menu;
