import React, { useEffect, useState } from "react";
import DropDown from "../customcomponents/DropDown";
import DataTable from "../customcomponents/DataTable";
import getGaragePoints from "../../utils/getGaragePoints";
import getCustomerPoints from "../../utils/getCustomerPoints";
import whyChooseTwoGms from "../../utils/whyChooseTwoGms";
import LoginOrRegister from "./GarageLoginOrRegister";
import Jumbotron from "./homecontents/Jumbotron";
import { useNavigate } from "react-router";
import Navbar from "./homecontents/Navbar";
import Jumbotron_garage from "./homecontents/Jumbotron_garage";
import Jumbotron_customer from "./homecontents/Jumbotron_customer";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Jumbotron_garage />
      <Jumbotron_customer />
    </div>
  );
};

export default Home;
