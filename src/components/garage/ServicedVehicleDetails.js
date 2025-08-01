import axios from "axios";
import { addservicedVehicles } from "../../store/slices/servicedVehiclesSlice";
import Skeleton from "../customcomponents/Skeleton";
import { SERVER } from "../../utils/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ServicedVehicleDetails = () => {
  const dispatch = useDispatch();
  const servicedVehicles = useSelector((store) => store.servicedVehicles);
  useEffect(() => {
    try {
      const fetchservicedVehicles = async () => {
        const result = await axios.get(
          SERVER + "/twogms/feed/servicedvehicles",
          {
            withCredentials: true,
          }
        );
        dispatch(addservicedVehicles(result?.data?.data));
      };
      fetchservicedVehicles();
    } catch (err) {
      <ErrorToast message={message} />;
      navigate("/");
    }
  }, []);
  return (
    <div>
      {0 === servicedVehicles?.length ? (
        <Skeleton />
      ) : (
        <div className="">
          <p className="text-lg font-bold p-2">Serviced vehicle details</p>
          <div>
            <p>search details</p>
          </div>
          <div className="hidden lg:block  h-60 overflow-auto">
            <table className="w-full table-md bg-accent-content">
              <thead></thead>
              <tbody>
                {servicedVehicles?.map((x, index) => (
                  <tr className="border-b border-slate-400">
                    <td></td>
                    <td>{index + 1}</td>
                    <td>{x?.vehicleNumber}</td>
                    <td>{x?.vehicleInfo?.variantName}</td>
                    <td>{x?.customerInfo?.customerName}</td>
                    <td>{x?.customerInfo?.primaryMobileNumber}</td>
                    <td>
                      <button className="bg-blue-400 text-black rounded-full px-3 cursor-pointer">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="block lg:hidden  h-60 overflow-auto">
            <table className=" table-md w-full bg-accent-content">
              <thead></thead>
              <tbody>
                {servicedVehicles?.map((x, index) => (
                  <tr className="border-b border-slate-400">
                    <td></td>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <p className="font-bold">{x?.vehicleNumber}</p>
                        <p className="text-xs text-nowrap">
                          {x?.vehicleInfo?.variantName}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-bold">
                          {x?.customerInfo?.customerName}
                        </p>
                        <p className="text-sm text-nowrap">
                          {x?.customerInfo?.primaryMobileNumber}
                        </p>
                      </div>
                    </td>
                    <td>
                      <button className="bg-blue-400 text-black rounded-full px-3 cursor-pointer">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicedVehicleDetails;
