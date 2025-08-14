import axios from "axios";
import { SERVER } from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const garageLoginCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  useEffect(() => {
    try {
      if (!garageLoginCredentials) {
        navigate("/twogms/login");
      } else {
        const fetchServicingVehicles = async () => {
          const servicingvehicles = await axios.get(
            SERVER + "/servicing-vehicles"
          );
          console.log(servicingvehicles?.data);
        };
        fetchServicingVehicles();
      }
    } catch (err) {
      console.log("test");
      navigate("/");
    }
  }, []);
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default Dashboard;
