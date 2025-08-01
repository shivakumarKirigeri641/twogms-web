import axios from "axios";
import { addservicingVehicles } from "../../store/slices/servicingVehiclesSlice";
import Skeleton from "../customcomponents/Skeleton";
import { SERVER } from "../../utils/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ServicingVehicleDetails = () => {
  const dispatch = useDispatch();
  const servicingVehicles = useSelector((store) => store.servicingVehicles);
  useEffect(() => {
    try {
      const fetchServicingVehicles = async () => {
        const result = await axios.get(
          SERVER + "/twogms/feed/servicingvehicles",
          {
            withCredentials: true,
          }
        );
        dispatch(addservicingVehicles(result?.data?.data));
        console.log(servicingVehicles);
      };
      fetchServicingVehicles();
    } catch (err) {
      <ErrorToast message={message} />;
      navigate("/");
    }
  }, []);
  return (
    <div>
      {0 === servicingVehicles?.length ? (
        <Skeleton />
      ) : (
        <div className="h-60">
          <p className="text-lg font-bold p-2">Servicing vehicle details</p>
          <div className="hidden lg:block">
            <table className="w-full table-md  bg-accent-content">
              <thead></thead>
              <tbody>
                {servicingVehicles?.map((x, index) => (
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
          <div className="block lg:hidden">
            <table className=" table-md w-full bg-accent-content">
              <thead></thead>
              <tbody>
                {servicingVehicles?.map((x, index) => (
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

export default ServicingVehicleDetails;
