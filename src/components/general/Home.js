import React, { useEffect, useState } from "react";
import DropDown from "../customcomponents/DropDown";
import DataTable from "../customcomponents/DataTable";
import getGaragePoints from "../../utils/getGaragePoints";
import getCustomerPoints from "../../utils/getCustomerPoints";
import whyChooseTwoGms from "../../utils/whyChooseTwoGms";
import LoginOrRegister from "./GarageLoginOrRegister";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default Home;
