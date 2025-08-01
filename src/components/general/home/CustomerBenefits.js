import React from "react";
import getGaragePoints from "../../../utils/getGaragePoints";
import getCustomerPoints from "../../../utils/getCustomerPoints";

const CustomerBenefits = () => {
  return (
    <div className="hero bg-base-200 my-10">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={require("../../../images/customer.png")}
          className="max-w-sm rounded-full shadow-2xl"
        />
        <div>
          <h1 className="text-3xl font-bold">What bike owners benefits?</h1>
          <ul className="py-6">
            {getCustomerPoints().map((x, index) => (
              <li key={index} className="py-1">
                {x}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerBenefits;
