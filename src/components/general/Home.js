import React, { useEffect, useState } from "react";
import DropDown from "../customcomponents/DropDown";
import DataTable from "../customcomponents/DataTable";
import getGaragePoints from "../../utils/getGaragePoints";
import getCustomerPoints from "../../utils/getCustomerPoints";
import whyChooseTwoGms from "../../utils/whyChooseTwoGms";
import LoginOrRegister from "./LoginOrRegister";

const Home = () => {
  return (
    <div className="">
      <div className="bg-gradient-to-b from-blue-100 to-blue-300">
        <img
          className="w-[40%] md:w-[15%] mx-auto rounded-full"
          src={require("../../images/logo.png")}
        ></img>
      </div>
      <div className="md:flex justify-between">
        {/**home section */}
        <div className="w-full md:w-[70%] border border-slate-200 shadow-2xl rounded-b-md p-2 bg-gradient-to-b from-green-50 to-green-100">
          <div className="text-xl md:text-3xl font-bold text-blue-800 text-center p-5">
            Welcome to TWOGMS – Your Digital Garage Partner
          </div>
          <div className="font-semibold p-3 text-left m-2">
            🛵 Simplifying Two-Wheeler Garage Operations Online
          </div>
          <div className="m-3 text-justify">
            TWOGMS (Two Wheeler Online Garage Management System) is a smart,
            all-in-one platform designed for garage owners and customers to
            streamline service bookings, manage vehicle maintenance, and track
            operations – all from one powerful dashboard.
          </div>
          {/** garage owners */}
          <div className="shadow-2xl rounded-2xl md:flex justify-between my-5 hover:translate-2 duration-200 ease-in-out">
            <div className="block md:hidden p-3 text-lg font-bold text-center">
              🔧 For Garage Owners
            </div>
            <img
              className="block md:hidden w-[30%] mx-auto my-4"
              src={require("../../images/computer.png")}
            ></img>
            <div>
              <div className="hidden md:block p-3 text-lg font-bold text-center">
                🔧 For Garage Owners
              </div>
              <ul className="p-3">
                {getGaragePoints()?.map((x, index) => (
                  <li className="p-1 text-justify">{x}</li>
                ))}
              </ul>
            </div>
            <img
              className="hidden md:block w-[15%] mx-auto my-4"
              src={require("../../images/computer.png")}
            ></img>
          </div>
          {/** garage owners */}
          {/** customer owners */}
          <div className="shadow-2xl rounded-2xl md:flex justify-between my-5 hover:translate-2 duration-200 ease-in-out">
            <div className="block md:hidden p-3 text-lg font-bold text-center">
              🔧 For customers
            </div>
            <img
              className="block md:hidden w-[30%] mx-auto my-4"
              src={require("../../images/customer.png")}
            ></img>
            <div>
              <div className="hidden md:block p-3 text-lg font-bold text-center">
                🔧 For customers
              </div>
              <ul className="p-3">
                {getCustomerPoints()?.map((x, index) => (
                  <li className="p-1 text-justify">{x}</li>
                ))}
              </ul>
            </div>
            <img
              className="hidden md:block w-[15%] mx-auto my-4"
              src={require("../../images/customer.png")}
            ></img>
          </div>
          {/** customer owners */}
          {/** why choose TWOGMS */}
          <div className="shadow-2xl rounded-2xl md:flex justify-between my-5 hover:translate-2 duration-200 ease-in-out">
            <div className="block md:hidden p-3 text-lg font-bold text-center">
              🔧 Why choose TWOGMS
            </div>
            <img
              className="block md:hidden w-[30%] mx-auto rounded-full my-4"
              src={require("../../images/garage.webp")}
            ></img>
            <div>
              <div className="hidden md:block p-3 text-lg font-bold text-center">
                🔧 Why choose TWOGMS
              </div>
              <ul className="p-3">
                {getCustomerPoints()?.map((x, index) => (
                  <li className="p-1 text-justify">{x}</li>
                ))}
              </ul>
            </div>
            <img
              className="hidden md:block w-[15%] mx-auto rounded-full my-4"
              src={require("../../images/garage.webp")}
            ></img>
          </div>
          {/** why choose TWOGMS */}
        </div>
        {/**home section */}
        {/**login/reg section */}
        <div className="w-full md:w-[30%] border border-slate-200 rounded-b-md p-2">
          <LoginOrRegister />
        </div>
        {/**login/reg section */}
      </div>
    </div>
  );
};

export default Home;
