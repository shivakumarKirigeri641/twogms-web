import axios from "axios";
import { addservicingVehicles } from "../store/slices/servicingVehiclesSlice";
import { addallVehicles } from "../store/slices/allVehiclesSlice";
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
      if (!garageLoginCredentials) {
        navigate("/twogms/login");
      } else {
        const fetchServicingVehicles = async () => {
          const servicingvehicles = await axios.get(
            SERVER + "/servicing-vehicles"
          );
          dispatch(addservicingVehicles(servicingvehicles?.data?.data));
        };
        const fetchAllVehicles = async () => {
          const allvehicles = await axios.get(SERVER + "/twogms/get-vehicles");
          dispatch(addallVehicles(allvehicles?.data?.data));
        };
        fetchServicingVehicles();
        fetchAllVehicles();
      }
    } catch (err) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full lg:w-[60%] shadow-2xl mx-auto m-2 border border-slate-300 rounded-xl p-2">
      {!currservicingVehicles && (
        <div className="flex justify-between items-center font-bold text-red-400 text-xl py-5">
          <p>
            No vehicles are in service yet... Click on Add vehicle to start
            servicing
          </p>
        </div>
      )}
      {currservicingVehicles && (
        <div>
          <div className="text-gray-700 p-2 m-2 flex justify-between">
            <p>
              List of servicing vehicles{" "}
              <span>({currservicingVehicles.length})</span>
            </p>
            <button class="block lg:hidden bg-purple-600 hover:bg-purple-800 text-white rounded-full px-2 py-1 shadow-lg transition-all duration-300 cursor-pointer">
              + Add vehicle
            </button>
          </div>
          <div>
            {/**desktop */}
            <ul className="hidden lg:block">
              {currservicingVehicles?.map((x, index) => (
                <li
                  key={index}
                  className="hover:translate-x-1 duration-200 ease-in-out"
                >
                  <div className="border border-slate-200 rounded-md text-sm m-1 overflow-auto my-3">
                    {/**title */}
                    <div className="flex justify-between font-semibold text-gray-600 border-b border-slate-300 p-2 bg-gradient-to-b from-violet-100 to-violet-300">
                      <p>{x?.fkVehicleDataId?.vehicleNumber}</p>
                      <p>
                        {x?.fkVehicleDataId?.fkTwoWheelerDataId?.variantName}
                      </p>
                    </div>
                    {/**title */}
                    {/**content */}
                    <div className="flex justify-between p-2 items-center">
                      <div>
                        <p>
                          {x?.fkVehicleDataId?.fkCustomerDataId?.customerName}
                        </p>
                        <p>
                          +91
                          {
                            x?.fkVehicleDataId?.fkCustomerDataId
                              ?.customerMobileNumber
                          }
                        </p>
                        <p className="text-xs py-1.5">
                          Last service:
                          <span>{x?.kmDriven}km</span>/{" "}
                          <span>{x?.vehicleEntryDate?.slice(0, 10)}</span>
                        </p>
                      </div>
                      <div>
                        <img
                          src={x?.fkVehicleDataId?.fkTwoWheelerDataId?.logoUrl}
                        ></img>
                      </div>
                    </div>
                    {/**content */}
                    {/**footer */}
                    <div className="flex justify-between font-semibold text-gray-600 border-b border-slate-300 p-2 bg-gradient-to-b from-slate-50 to-slate-100 items-center">
                      <p>Service status:🟠</p>
                      <div className="bg-blue-500 p-2 mx-2 rounded-full text-white w-20 text-center cursor-pointer">
                        <button>Edit</button>
                      </div>
                    </div>
                    {/**footer */}
                  </div>
                </li>
              ))}
            </ul>
            {/**desktop */}
            {/**mobile */}
            <ul className="block lg:hidden">
              {currservicingVehicles?.map((x, index) => (
                <li
                  key={index}
                  className="hover:translate-x-1 duration-200 ease-in-out"
                >
                  <div className="border border-slate-200 rounded-md text-sm m-1 overflow-auto my-3 bg-slate-100">
                    {/**header */}
                    <div className="text-center p-2 bg-gradient-to-b from-violet-100 to-violet-300 text-gray-600 flex justify-between text-xs font-semibold">
                      <p className="">{x.fkVehicleDataId?.vehicleNumber}</p>
                      <p>
                        {x.fkVehicleDataId?.fkTwoWheelerDataId?.variantName}
                      </p>
                    </div>
                    {/**header */}
                    {/**img */}
                    <div className="flex justify-center items-center ">
                      <img
                        className="rounded-full"
                        src={x?.fkVehicleDataId?.fkTwoWheelerDataId?.logoUrl}
                      ></img>
                    </div>
                    {/**img */}
                    {/**ciontent */}
                    <div className="flex justify-between items-center text-xs text-gray-700">
                      <div className="px-3">
                        <p>
                          {x?.fkVehicleDataId?.fkCustomerDataId?.customerName}
                        </p>
                        <p>
                          +91
                          {
                            x?.fkVehicleDataId?.fkCustomerDataId
                              ?.customerMobileNumber
                          }
                        </p>
                      </div>
                      <div className="px-2">
                        <p>Latest service</p>
                        <p className="font-semibold">
                          {x?.kmDriven}km / {x?.vehicleEntryDate.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                    {/**ciontent */}
                    {/**status */}
                    <div className="flex justify-between font-semibold text-gray-600 border-b border-slate-300 p-2 bg-gradient-to-b from-slate-50 to-slate-100 items-center">
                      <div>Service status:🟠</div>
                      <div className="bg-blue-500 p-2 mx-2 rounded-full text-white w-20 text-center cursor-pointer">
                        <button>Edit</button>
                      </div>
                    </div>
                    {/**status */}
                  </div>
                </li>
              ))}
            </ul>
            {/**mobile */}
          </div>
        </div>
      )}
      <button class="hidden lg:block fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-800 text-white rounded-full p-4 shadow-lg transition-all duration-300 cursor-pointer">
        + Add vehicle
      </button>
    </div>
  );
};

export default Dashboard;
