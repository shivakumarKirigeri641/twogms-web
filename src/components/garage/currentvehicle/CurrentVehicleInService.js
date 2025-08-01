import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const CurrentVehicleInService = () => {
  const navigate = useNavigate();
  const garagecredentials = useSelector(
    (store) => store.garageCredentialDetails
  );
  useEffect(() => {
    try {
      if (!garagecredentials) {
        navigate("/");
      }
    } catch (err) {
      <ErrorToast message={message} />;
      navigate("/");
    }
  }, []);
  const vehicleid = useParams();
  console.log(vehicleid);
  return (
    <div>
      <p>CurrentVehicleInService</p>
    </div>
  );
};

export default CurrentVehicleInService;
