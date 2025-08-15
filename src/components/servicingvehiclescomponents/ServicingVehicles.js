import React from "react";
import { useSelector } from "react-redux";

const ServicingVehicles = () => {
  const servicingvehicles = useSelector((store) => store.servicingVehicles);
  return (
    <div>
      <p>servicingtest</p>
    </div>
  );
};

export default ServicingVehicles;
