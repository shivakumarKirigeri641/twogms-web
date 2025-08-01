import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ServicedVehicleDetails from "./ServicedVehicleDetails";
import ServicingVehicleDetils from "./ServicingVehicleDetails";

const GarageDashboard = () => {
  const [error, seterror] = useState("");
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
  return (
    <div className="h-screen">
      <div>
        <p className="p-3 my-2">Welcome, {garagecredentials?.ownerName}</p>
        <p className="p-3 my-2">
          Here are your vehicles which are under service and already serviced
          vehicles...
        </p>
        <div className="lg:flex justify-between">
          <ServicingVehicleDetils />
          <ServicedVehicleDetails />
        </div>
      </div>
    </div>
  );
};

export default GarageDashboard;
