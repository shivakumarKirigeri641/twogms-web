import { useNavigate } from "react-router";
import getgaragepoints from "../../../utils/getGaragePoints";
import getCustomerPoints from "../../../utils/getCustomerPoints";
import WhatIsTwoGms from "./WhatIsTwoGms";
import GarageBenefits from "./GarageBenefits";
import CustomerBenefits from "./CustomerBenefits";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <WhatIsTwoGms />
      <GarageBenefits />
      <CustomerBenefits />
    </div>
  );
};

export default Home;
