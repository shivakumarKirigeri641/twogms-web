import { useNavigate } from "react-router";
import getgaragepoints from "../../../utils/getGaragePoints";
import getCustomerPoints from "../../../utils/getCustomerPoints";
import WhatIsTwoGms from "./WhatIsTwoGms";
import GarageBenefits from "./GarageBenefits";
import CustomerBenefits from "./CustomerBenefits";
import { removegarageCredentialDetails } from "../../../store/slices/garageCredentialDetails";
import { removeservicedVehicles } from "../../../store/slices/servicedVehiclesSlice";
import { removeservicingVehicles } from "../../../store/slices/servicingVehiclesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("loading home pate");
    dispatch(removeservicedVehicles());
    dispatch(removeservicingVehicles());
    dispatch(removegarageCredentialDetails());
  }, []);
  return (
    <div>
      <WhatIsTwoGms />
      <GarageBenefits />
      <CustomerBenefits />
    </div>
  );
};

export default Home;
