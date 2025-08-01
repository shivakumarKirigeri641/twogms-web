import axios from "axios";
import { addservicedVehicles } from "../../store/slices/servicedVehiclesSlice";
import Skeleton from "../customcomponents/Skeleton";
import { SERVER } from "../../utils/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ServicedVehicleDetails = () => {
  const navigate = useNavigate();
  const [searchText, setsearchText] = useState("");
  const dispatch = useDispatch();
  const servicedVehicles = useSelector((store) => store.servicedVehicles);
  const filteredservicedVehicles = servicedVehicles?.filter(
    (x) =>
      x?.vehicleNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      x?.vehicleInfo.variantName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      x?.customerInfo?.customerName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      x?.customerInfo?.primaryMobileNumber
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );
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
      {!filteredservicedVehicles ? (
        <Skeleton />
      ) : (
        <div className="">
          <p className="text-lg font-bold p-2">Serviced vehicle details</p>
          <div className="flex justify-between">
            <input
              className="border border-slate-300 rounded-xl w-[99%] m-1 p-2 outline-none"
              placeholder="Search vehicle/model/customer/mobile number"
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
              }}
            ></input>
            <button
              className="bg-yellow-100 text-black rounded w-10 cursor-pointer"
              onClick={() => {
                setsearchText("");
              }}
            >
              Clear
            </button>
          </div>
          {/**full scr */}
          <div className="hidden lg:block  h-60 overflow-auto">
            {0 === filteredservicedVehicles?.length ? (
              <div className="text-red-500 font-bold text-center p-3">
                No results found!
              </div>
            ) : (
              <table className="w-full table-md bg-accent-content">
                <thead></thead>
                <tbody>
                  {filteredservicedVehicles?.map((x, index) => (
                    <tr className="border-b border-slate-400" key={index}>
                      <td></td>
                      <td>{index + 1}</td>
                      <td>{x?.vehicleNumber}</td>
                      <td>{x?.vehicleInfo?.variantName}</td>
                      <td>{x?.customerInfo?.customerName}</td>
                      <td>{x?.customerInfo?.primaryMobileNumber}</td>
                      <td>
                        <div className="flex">
                          <button
                            className="bg-blue-400 text-black rounded-full px-3 cursor-pointer"
                            onClick={() => {
                              navigate(
                                "/twogms/garage/currentvehicleinservice/" +
                                  x?.vehicleInfo?._id
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button className="bg-blue-400 text-black rounded-full cursor-pointer mx-1 p-1">
                            Export
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/**full scr */}
          {/**mobile scr */}
          <div className="block lg:hidden  h-60 overflow-auto">
            {0 === filteredservicedVehicles?.length ? (
              <div className="text-red-500 font-bold text-center p-3">
                No results found!
              </div>
            ) : (
              <table className=" table-md w-full bg-accent-content">
                <thead></thead>
                <tbody>
                  {filteredservicedVehicles?.map((x, index) => (
                    <tr className="border-b border-slate-400" key={index}>
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
                        <div className="flex">
                          <button
                            className="bg-blue-400 text-black rounded-full px-3 cursor-pointer"
                            onClick={() => {
                              navigate(
                                "/twogms/garage/currentvehicleinservice/" +
                                  x?.vehicleInfo?._id
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button className="bg-blue-400 text-black rounded-full cursor-pointer mx-1 p-1">
                            Export
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/**mobile scr */}
        </div>
      )}
    </div>
  );
};

export default ServicedVehicleDetails;
