import axios from "axios";
import { addservicingVehicles } from "../store/slices/servicingVehiclesSlice";
import { SERVER } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const garageLoginCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  const currservicingVehicles = useSelector((store) => store.servicingVehicles);
  useEffect(() => {
    try {
      //console.log(garageLoginCredentials);
      if (!garageLoginCredentials) {
        navigate("/twogms/login");
      } else {
        const fetchServicingVehicles = async () => {
          const servicingvehicles = await axios.get(
            SERVER + "/servicing-vehicles"
          );
          console.log(currservicingVehicles);
          dispatch(addservicingVehicles(servicingvehicles?.data?.data));
        };
        fetchServicingVehicles();
      }
    } catch (err) {
      console.log("test");
      navigate("/");
    }
  }, []);
  return (
    <div className="h-screen w-full lg:w-[60%] shadow-2xl mx-auto m-2 border border-slate-300 rounded-xl p-2">
      <div className="text-gray-700 p-2 m-2">List of servicing vehicles</div>
      <div>
        <ul>
          {currservicingVehicles?.map((x, index) => (
            <li>
              <div>{x?.fkVehicleDataId?.vehicleNumber}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
